class RoomActionController < ApplicationController
  require 'faker'

  protect_from_forgery with: :null_session

  def entering_own_room
    data = JSON.parse(request.body.read)
    id = data['id']

    existing_room = Room.find_by(id: id)

    if existing_room.nil?
      render json: { error: 'Room not found' }, status: :not_found
      return
    end

    if existing_room.host_id == id
      render json: { message: 'You are already in the room' }, status: :unprocessable_entity
    else
      if existing_room.update(host_id: id, players_count: 1)
        render json: { message: 'Access granted to enter your room', status: '5' }
      else
        render json: { error: 'Failed to update room' }, status: :unprocessable_entity
      end
    end
  end


  def leave_room
    data = JSON.parse(request.body.read)
    id = data['id']

    existing_room = Room.find_by(host_id: id) || Room.find_by(user_id: id)

    if existing_room.nil?
      render json: { error: 'User not found in any room' }, status: :not_found
      return
    end

    if id == existing_room.host_id
      existing_room.update(host_id: 0, user_id: 0, players_count: 0, game_lock_status: false)
      render json: { message: 'You have left your room' }
    elsif id == existing_room.user_id
      existing_room.update(user_id: 0, game_lock_status: false)
      existing_room.update(players_count: 1) unless existing_room.host_id == 0
      render json: { message: 'You have left the room' }
    else
      render json: { error: 'You are not a member of this room' }, status: :forbidden
    end
  end

  def pass_room
    data = JSON.parse(request.body.read)
    room_id = data['room_id']
    password = data['password']

    room = Room.find_by(id: room_id)

    if room.nil?
      render json: { error: 'Room not found' }, status: :not_found
      return
    end

    hashed_password = BCrypt::Password.create(password)

    if room.update(password: hashed_password, password_status: 1)
      render json: { message: 'Password set successfully' }
    else
      render json: { error: 'Failed to update room password' }, status: :unprocessable_entity
    end
  end

  def pass_clear_room
    data = JSON.parse(request.body.read)
    room_id = data['room_id']

    room = Room.find_by(id: room_id)

    if room.nil?
      render json: { error: 'Room not found' }, status: :not_found
      return
    end

    if room.update(password: nil, password_status: 0)
      render json: { message: 'Password cleared successfully' }
    else
      render json: { error: 'Failed to clear room password' }, status: :unprocessable_entity
    end
  end


  def enter_pass_room
    data = JSON.parse(request.body.read)
    room_id = data['room_id']
    user_id = data['id']
    password = data['password']

    room = Room.find_by(id: room_id)

    if room.nil?
      render json: { error: 'Room not found', status: '1' }, status: :not_found
      return
    end

    if room.password_status == 0
      render json: { error: 'Room does not have a password', status: '2' }, status: :unprocessable_entity
      return
    end

    if room.password == password
      if room.host_id == user_id
        render json: { message: 'You are already the host of this room', status: '4' }, status: :unprocessable_entity
        return
      elsif room.user_id == user_id
        render json: { message: 'You are already a member of this room', status: '4' }, status: :unprocessable_entity
        return
      end

      if room.user_id.nil? || room.user_id == 0
        room.update(user_id: user_id, players_count: room.players_count + 1)
        render json: { message: 'User entered successfully', status: '3' }
      else
        render json: { error: 'Room is full', status: '6' }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Incorrect password', status: '5' }, status: :unauthorized
    end
  end

  def entering_other_room
    data = JSON.parse(request.body.read)
    id = data['id']
    room_id = data['room_id']
    room = Room.find_by(id: room_id)

    if room.nil?
      render json: { error: 'Room not found', status: '1' }, status: :not_found
      return
    end

    if room.user_id != 0
      render json: { error: 'Room is already occupied', status: '4' }, status: :unprocessable_entity
      return
    end

    if id.blank?
      render json: { error: 'User ID is required', status: '6' }, status: :unprocessable_entity
      return
    end

    room.update(user_id: id, players_count: 2)

    render json: { message: 'User entered successfully', status: '3' }
  end

  def lock_unlock
    data = JSON.parse(request.body.read)
    room_id = data['room_id']
    room = Room.find_by(id: room_id)

    if room.nil?
      render json: { error: 'Room not found' }, status: :not_found
      return
    end

    new_status = !room.game_lock_status
    room.update(game_lock_status: new_status)

    render json: { message: "Game lock status updated to #{new_status}" }
  end


  def entering_pass_room
    data = JSON.parse(request.body.read)
    id = data['id']
    room_id = data['room_id']
    password = data['password']
    room = Room.find_by(id: room_id)

    if room.nil?
      render json: { error: 'Room not found' }, status: :not_found
      return
    end

    if room.password == password
      if room.user_id == 0
        room.update(user_id: id, players_count: 2)
        render json: { message: 'User entered successfully', status: '3' }
      else
        render json: { error: 'Room is already occupied', status: '5' }
      end
    else
      render json: { error: 'Wrong password', status: '24' }
    end
  end

  def room_info
    rooms = Room.where('players_count >= ?', 1)
                .pluck(:id, :name, :players_count, :password_status, :game_lock_status, :host_id, :user_id)
                .map do |room_id, name, players_count, password_status, game_lock_status, host_id, user_id|
      { id: room_id, name: name, players_count: players_count, password_status: password_status, game_lock_status: game_lock_status, host_id: host_id, user_id: user_id }
    end
    render json: rooms
  end

  def role
    room_id = params[:room_id]
    room = Room.find_by(id: room_id)
    if room
      render json: { host: room.host_id, guest: room.user_id }
    else
      render json: { error: 'Room not found' }, status: :not_found
    end
  end

  def text_for_race
    data = JSON.parse(request.body.read)
    room_id = data['room_id']
    room = Room.find_by(id: room_id)

    if room
      paragraph = Faker::Lorem.paragraph(sentence_count: 40)
      room.update(text: paragraph)
      render json: { message: 'Text for race generated successfully' }
    else
      render json: { error: 'Room not found' }, status: :not_found
    end
  end

  def kick
    data = JSON.parse(request.body.read)
    room_id = data['room_id']
    room = Room.find_by(id: room_id)

    if room
      room.update(user_id: 0, players_count: 1)
      render json: { message: 'User kicked successfully' }
    else
      render json: { error: 'Room not found' }, status: :not_found
    end
  end

  def give_text
    room_id = params[:room_id]
    room = Room.find_by(id: room_id)

    if room
      if room.text.present?
        render json: { text: room.text }
      else
        render json: { error: 'Text not found for this room' }, status: :not_found
      end
    else
      render json: { error: 'Room not found' }, status: :not_found
    end
  end

  def return_nickname_into_rooms
    room_id = params[:room_id]
    room = Room.find_by(id: room_id)

    return render json: { error: 'Room not found' }, status: :not_found if room.nil?

    host_user, user = User.where(id: [room.host_id, room.user_id]).pluck(:nickname, :img_url)

    return render json: { error: 'Host not found' }, status: :not_found if host_user.nil?

    response = { host_nickname: host_user, host_photo: user }
    response[:user_nickname] = user unless user.blank?

    render json: response
  end

  def user_info
    id = params[:id]

    user = User.find_by(id: id)

    if user.present?
      matches = Match.where(user_id: id).pluck(:created_at, :accuracy, :sps, :user_id).map do |match|
        { created_at: match[0], accuracy: match[1], sps: match[2], user_id: match[3] }
      end

      render json: {
        nickname: user.nickname,
        img_url: user.img_url,
        matches: matches
      }
    else
      render json: { error: 'User not found' }, status: :not_found
    end
  end

  def save_game
    data = JSON.parse(request.body.read)
    nickname = data['nickname']
    sps = data['sps']
    accuracy = data['accuracy']
    user_id = data['user_id']

    match = Match.new(nickname: nickname, sps: sps, accuracy: accuracy, user_id: user_id)

    if match.valid?
      match.save
      render json: { status: 'success', match: match }, status: :created
    else
      render json: { status: 'error', errors: match.errors.full_messages }, status: :unprocessable_entity
    end
  end

end



