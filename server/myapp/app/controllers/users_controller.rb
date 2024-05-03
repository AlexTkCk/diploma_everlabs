class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:signup, :login]

  def google_test
  end
  def signup
    data = JSON.parse(request.body.read)
    login = data['login']
    password = data['password']

    if login.blank? || !valid_email?(login)
      render json: { error: 'Invalid email format' }, status: :unprocessable_entity
      return
    end

    existing_user = User.find_by(login: login)

    if existing_user
      render json: { message: 'User already exists' }, status: :unprocessable_entity
    else
      new_user = User.new(user_params(data))

      if new_user.save
        render json: { message: 'User created successfully' }
      else
        if new_user.errors[:password].include?("is invalid")
          render json: { error: 'Password does not meet requirements' }, status: :unprocessable_entity
        else
          render json: { error: 'Failed to create user' }, status: :unprocessable_entity
        end
      end
    end
  end

  def login
    data = JSON.parse(request.body.read)
    login = data['login']
    password = data['password']

    if login.blank? || password.blank?
      render json: { error: 'Login and password are required' }, status: :unprocessable_entity
      return
    end

    user = User.find_by(login: login)

    if user && user.authenticate(password)
      token = generate_token(user.id)
      render json: { message: 'Login successful', token: token }
    elsif user
      render json: { error: 'Invalid password' }, status: :unprocessable_entity
    else
      render json: { message: 'Login not found. Would you like to register?' }, status: :not_found
    end
  end

  def logout
    render json: { message: 'Login not found. Would you like to register?' }, status: :not_found
  end

  private

  def user_params(data)
    {
      login: data['login'],
      password: data['password'],
      nickname: data['nickname'],
      img_url: data['img_url'],
      count_race: data['count_race'],
      pbtime: data['pbtime'],
      pbsymbols: data['pbsymbols']
    }
  end

  def valid_email?(email)
    email =~ URI::MailTo::EMAIL_REGEXP
  end

  def generate_token(user_id)
    expiration_time = Time.now.to_i + 3600 # Например, срок действия 1 час (3600 секунд)
    payload = { user_id: user_id, exp: expiration_time }
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

end
