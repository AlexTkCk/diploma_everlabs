class PasswordRecoveryController < ApplicationController
  def send_mail
    user= User.find_by(id: params[:id])
    @token = user.token_password
    @id= user.id
    login= user.login
    UserMailer.password_recovery(login, @token , @id).deliver_now
  end

  def add_new_pass
    token1 = params['token']
    id = params['id']
    user = User.find_by(id: id)
    token = user.token_password

    if token1 == token
      render 'add_new_pass'
    else
      render json: { error: 'Token is invalid' }
    end
  end

  def change_password
    password = params[:password]
    password_confirm = params[:password_confirm]
    user_id = params[:id]
    puts password_confirm
    puts user_id
    user= User.find_by(id: user_id)
    user.update(password: password_confirm, token_password: SecureRandom.hex(16))
  end




  skip_before_action :verify_authenticity_token, only: [:send_mail, :add_auth]
end