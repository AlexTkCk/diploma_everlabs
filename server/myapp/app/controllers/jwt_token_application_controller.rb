class JwtTokenApplicationController < ActionController::Base
  before_action :authenticate_request
  protect_from_forgery with: :null_session

  private

  def authenticate_request
    token = params['token']

    if token.nil?
      render json: { error: 'Authentication token required', status: '10' }, status: :unauthorized
      return
    end

    unless valid_token?(token)
      render json: { error: 'Invalid token', status:'11' }, status: :unauthorized
    end
  end

  def extract_token_from_header(authorization_header)
    return nil unless authorization_header.present?

    authorization_header.split(' ').last
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
