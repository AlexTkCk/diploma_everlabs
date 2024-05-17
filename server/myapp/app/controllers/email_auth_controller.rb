class EmailAuthController < ApplicationController

  def send_mail
    user= User.find_by(id: params[:id])
    @token = user.token_email
    @id= user.id
    login= user.login
    UserMailer.auth_email(login, @token , @id).deliver_now
  end

  def add_auth
    token1=params['token']
    id=params['id']
    user= User.find_by(id:id)
    token= user.token_email
    if token1==token
      user.update(email_auto: true)
      user.update(token_email: 'none')
      render json: { error: 'Link is valid' }
    else
      render json: { error: 'Token is invalid' }
    end

  end
  skip_before_action :verify_authenticity_token, only: [:send_mail, :add_auth]
end