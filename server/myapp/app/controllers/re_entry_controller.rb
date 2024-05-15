class ReEntryController < JwtTokenApplicationController
  before_action :authenticate_request

  def return_id
    token= params[:token]
    decoded_token = JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
    payload = decoded_token.first
    users_id = payload['user_id']
    user = User.find_by(id: users_id)
    puts user.nickname
    render json: { message:'Login successful', id: users_id, name: user.nickname, status:'7' }
  end


  def testing
    render json: { message: 'Выполнено какое-то действие' }
  end

end
