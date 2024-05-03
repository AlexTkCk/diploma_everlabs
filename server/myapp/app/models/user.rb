class User < ApplicationRecord
  has_secure_password
  validates :login, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, format: { with: /\A(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*()_+|~\-={}\[\]:;<>?,.\/])(?=.*[a-z]).{5,}\z/ }
end
