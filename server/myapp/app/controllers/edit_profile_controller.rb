class EditProfileController < ApplicationController
  skip_before_action :verify_authenticity_token

  def edit_profile
    data = JSON.parse(request.body.read)
    id = data['id']
    nickname = data['nickname']
    about_me = data['about_me']
    img_url = data['img_url']

    user = User.find_by(id: id)

    if user.nil?
      render json: { error: 'User not found' }, status: :not_found
      return
    end

    if user.update(nickname: nickname, about_me: about_me, img_url: img_url)
      render json: { message: 'Profile updated successfully', user: user }
    else
      render json: { error: 'Failed to update profile', errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end


end
