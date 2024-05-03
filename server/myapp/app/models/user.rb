class User < ApplicationRecord
  has_secure_password
  validates :login, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, format: { with: /\A(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*()_+|~\-={}\[\]:;<>?,.\/])(?=.*[a-z]).{5,}\z/ }
  devise :omniauthable, omniauth_providers: [:google_oauth2]
  def self.from_google(login:, uid: )
    find_or_create_by!(login: login, uid: uid, provider: 'google_oauth2')
  end
end

