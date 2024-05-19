class EditProfileController < ApplicationController
  skip_before_action :verify_authenticity_token

  def edit_profile
    data = JSON.parse(request.body.read)
    id = data['id']
    nickname = data['nickname']
    about_me = data['about_me']
    img_url = data['img_url']

    user = User.find_by(id: id)
    user.update(nickname: nickname, about_me: about_me, img_url: img_url)
  end





end
