class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:signup, :login]
  def signup
    data = JSON.parse(request.body.read)
    login = data['login']
    password = data['password']

    existing_user = User.find_by(login: login)

    if existing_user
      render json: { message: 'User already exists' }, status: :unprocessable_entity
    else
      new_user = User.new(user_params(data))

      if new_user.save
        render json: { message: 'User created successfully' }
      else
        if new_user.errors[:login].include?("has already been taken")
          render json: { error: 'Login has already been taken' }, status: :unprocessable_entity
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
      render json: { message: 'Login successful' }
    elsif user
      render json: { error: 'Invalid password' }, status: :unprocessable_entity
    else
      render json: { message: 'Login not found. Would you like to register?' }, status: :not_found
    end
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
end
