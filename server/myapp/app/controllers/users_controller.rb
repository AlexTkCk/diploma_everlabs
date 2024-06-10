class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:signup, :login]
  require 'faker'

  def signup
    data = JSON.parse(request.body.read)
    login = data['login']
    password = data['password']

    if login.blank? || !valid_email?(login)
      render json: { error: 'Invalid email format', status: "1" }, status: :unprocessable_entity
      return
    end

    password_requirements = /^(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
    unless password.match?(password_requirements)
      render json: { error: 'Password does not meet requirements', status: "4" }, status: :unprocessable_entity
      return
    end

    if User.exists?(login: login)
      render json: { message: 'User already exists', status: "2" }, status: :unprocessable_entity
      return
    end

    new_user = User.new(user_params(data))
    new_user.token_email = SecureRandom.hex(16)
    new_user.token_password = SecureRandom.hex(16)
    new_user.nickname = Faker::Internet.unique.username

    if new_user.save
      new_room = Room.new(name: Faker::Lorem.unique.words(number: 2).join(' '), user_id: new_user.id, text: Faker::Lorem.paragraph(sentence_count: 20))

      if new_room.save
        token = generate_token(new_user.id)
        render json: { message: 'User created successfully', status: "3", id: new_user.id, token: token }
      else
        new_user.destroy
        render json: { error: 'Failed to create associated room', status: "5" }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Failed to create user', status: "5" }, status: :unprocessable_entity
    end
  end

  private

  def login
    data = JSON.parse(request.body.read)
    login = data['login']
    password = data['password']

    if login.blank? || password.blank?
      render json: { error: 'Login and password are required', status: 6 }, status: :unprocessable_entity
      return
    end

    user = User.find_by(login: login)

    if user.nil?
      render json: { message: 'Email not found. Would you like to register?', status: '9' }, status: :not_found
    elsif user.authenticate(password)
      token = generate_token(user.id)
      render json: { message: 'Login successful', status: '7', id: user.id, token: token }
    else
      render json: { error: 'Invalid password', status: '8' }, status: :unprocessable_entity
    end
  end

  private

  def user_params(data)
    {
      login: data['login'],
      password: data['password'],
      nickname: data['nickname'],
      img_url: data['img_url'],
      count_race: data['count_race']
    }
  end

  def valid_email?(email)
    email =~ URI::MailTo::EMAIL_REGEXP
  end

  def generate_token(user_id)
    expiration_time = Time.now.to_i + 18000
    payload = { user_id: user_id, exp: expiration_time }
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

end
