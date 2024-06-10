class ReEntryController < JwtTokenApplicationController
  before_action :authenticate_request

  def return_id
    token = params[:token]

    begin
      decoded_token = JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
      payload = decoded_token.first
      user_id = payload['user_id']
      user = User.find_by(id: user_id)

      if user
        render json: {
          message: 'Login successful',
          id: user_id,
          name: user.nickname,
          descriptions: user.about_me,
          avatar: user.img_url,
          count_race: user.count_race,
          created_at: user.created_at,
          status: '7'
        }
      else
        render json: { error: 'User not found' }, status: :not_found
      end
    rescue JWT::DecodeError
      render json: { error: 'Invalid token' }, status: :unprocessable_entity
    end
  end


end
