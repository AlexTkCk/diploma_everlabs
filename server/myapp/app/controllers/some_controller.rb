class SomeController < ApplicationController
  before_action :authenticate_request
  protect_from_forgery with: :null_session

  def some_action
    render json: { message: 'Выполнено какое-то действие' }
  end

  private

  def authenticate_request
    token = params['token']

    if token.nil?
      render json: { error: 'Требуется токен аутентификации' }, status: :unauthorized
    end

    if !valid_token?(token)
      render json: { error: 'Недействительный токен' }, status: :unauthorized
    end
  end

  def extract_token_from_header(authorization_header)
    return nil unless authorization_header.present?

    token = authorization_header.split(' ').last
  end

  def valid_token?(token)
    secret_key = Rails.application.secrets.secret_key_base

    begin
      decoded_token = JWT.decode(token, secret_key, true, algorithm: 'HS256')
      return true
    rescue JWT::DecodeError => e
      return false
    end
  end
end
