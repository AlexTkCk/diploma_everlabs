class UserMailer < ApplicationMailer
  def auth_email(user,token, id)
    @user = user
    @token=token
    @id= id
    mail(to: user, subject: 'Email confirmation')
  end
  def password_recovery(user,token, id)
    @user = user
    @token=token
    @id= id
    mail(to: user, subject: 'Recover password')
  end
end