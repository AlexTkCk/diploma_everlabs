class GoogleAutoController < ApplicationController
  require 'faker'
  def reg
    auth = request.env['omniauth.auth']
    email = auth.info.email
    uid = auth.uid

    user = User.find_by(login: email)

    if user
      token=generate_token(user.id)
      # redirect_to "https://diploma-7f61b.web.app/login/#{user.id}/#{token}", allow_other_host: true
      redirect_to "http://localhost:3000/login/#{user.id}/#{token}", allow_other_host: true
    else
      user = User.new(login: email, password: "pDrmCWs8fHG4J2WDwsf8!", email_auto: 1, uid: uid)
      user.nickname= Faker::Internet.unique.username



      if user.save
        new_room=Room.create(name: Faker::Lorem.unique.words(number: 2).join(' '), id: user.id, text: Faker::Lorem.paragraph(sentence_count: 20) )
        new_room.save

        token=generate_token(user.id)
        # redirect_to "https://diploma-7f61b.web.app/login/#{user.id}/#{token}", allow_other_host: true
        redirect_to "http://localhost:3000/login/#{user.id}/#{token}", allow_other_host: true
      else
        render json: { error: 'An error occurred while creating the user' }, status: :unprocessable_entity
      end
    end
  end

  private

  def generate_token(user_id)
    expiration_time = Time.now.to_i + 18000
    payload = { user_id: user_id, exp: expiration_time }
    JWT.encode(payload, Rails.application.secrets.secret_key_base)

  end

end
