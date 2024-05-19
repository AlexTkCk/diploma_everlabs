class ReEntryController < JwtTokenApplicationController
  before_action :authenticate_request

  def return_id
    token= params[:token]
    decoded_token = JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
    payload = decoded_token.first
    users_id = payload['user_id']
    user = User.find_by(id: users_id)
    puts user.nickname
    render json: { message:'Login successful', id: users_id, name: user.nickname, descriptions: user.about_me, avatar: user.img_url, count_race: user.count_race, created_at: user.created_at, status:'7' }
  end

end
