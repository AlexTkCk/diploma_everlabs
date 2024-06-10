class PasswordRecoveryController < ApplicationController
  def send_mail
    user = User.find_by(id: params[:id])

    if user.present?
      @token = user.token_password
      @id = user.id
      login = user.login
      UserMailer.password_recovery(login, @token, @id).deliver_later
      render json: { message: 'Email sent successfully' }
    else
      render json: { error: 'User not found' }, status: :not_found
    end
  end

  def add_new_pass
    token1 = params['token']
    id = params['id']
    user = User.find_by(id: id)

    if user && user.token_password == token1
      render 'add_new_pass'
    else
      render json: { error: 'Invalid token or user' }, status: :unprocessable_entity
    end
  end

  def change_password
    password = params[:password]
    password_confirm = params[:password_confirm]
    user_id = params[:id]

    if password != password_confirm
      return render json: { error: 'Passwords do not match' }, status: :unprocessable_entity
    end

    user = User.find_by(id: user_id)

    if user
      user.update(password: password_confirm, token_password: SecureRandom.hex(16))
      render json: { message: 'Password successfully changed' }
    else
      render json: { error: 'User not found' }, status: :not_found
    end
  end




  skip_before_action :verify_authenticity_token, only: [:send_mail, :add_auth]
end