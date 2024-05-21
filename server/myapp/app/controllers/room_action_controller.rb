class RoomActionController < ApplicationController
  require 'faker'

  protect_from_forgery with: :null_session

  def entering_own_room
    data = JSON.parse(request.body.read)
    id = data['id']
    existing_room = Room.find_by(id: id)
    if existing_room.host_id ==id
      render json: { message: 'You already in room'}, status: :unprocessable_entity
    else
      render json: { message: 'Access enter in your room', status: '1488' }
      existing_room.update(host_id: id, players_count: 1)
    end
  end

  def leave_room
    data = JSON.parse(request.body.read)
    id = data['id']

    existing_room = Room.find_by(host_id: id)

    if existing_room.nil?
      existing_room = Room.find_by(user_id: id)
    end

    if id == existing_room.host_id
      existing_room.update(host_id: 0)
      existing_room.update(user_id: 0)
      existing_room.update(players_count: 0)
      existing_room.update(game_lock_status: false)
      render json: { message: 'Access left your room' }
    else
      existing_room = Room.find_by(user_id: id)
      existing_room.update(players_count: 1)

      if existing_room.nil?
        render json: { error: 'User not found in any room' }, status: :not_found
        return
      end

      if id == existing_room.user_id
        existing_room.update(user_id: 0)
        existing_room.update(game_lock_status: false)
        render json: { message: 'Access left the room' }
      else
        render json: { error: 'You are not the host or a member of this room' }, status: :forbidden
      end
    end
  end

  def pass_room
    data = JSON.parse(request.body.read)
    room_id=data['room_id']
    password = data['password']
    room = Room.find_by(id: room_id)
    room.update(password: password, password_status: 1 )
  end

  def pass_clear_room
    data = JSON.parse(request.body.read)
    room_id=data['room_id']
    room = Room.find_by(id: room_id)
    room.update(password: "none", password_status: 0 )
  end

  def enter_pass_room
    data = JSON.parse(request.body.read)
    room_id=data['room_id']
    id = data['id']
    password = data['password']
    room = Room.find_by(id: room_id)
    if room.password==password
      render json: {message: 'User enter successfully', status: '3' }
    else
      render json: {error: 'Failed to enter user', status: '5' }
    end

  end



  def entering_other_room
    data = JSON.parse(request.body.read)
    id = data['id']
    room_id=data['room_id']
    room = Room.find_by(id: room_id)
    if room.user_id == "0"
      render json: {message: 'User enter successfully', status: '3' }
      room.update(user_id: id, players_count: 2)
    else
      render json: {error: 'Failed to enter user', status: '5' }
    end

  end

  def lock_unlock
    data = JSON.parse(request.body.read)
    room_id = data['room_id']
    room = Room.find_by(id: room_id)
    if room.game_lock_status == false
      room.update(game_lock_status: true)
    else
      room.update(game_lock_status: false)
    end
  end

  def entering_pass_room
    data = JSON.parse(request.body.read)
    id = data['id']
    room_id=data['room_id']
    password = data['password']
    room = Room.find_by(id: room_id)
    if room.password==password
      if room.user_id == "0"
        render json: {message: 'User enter successfully', status: '3' }
        room.update(user_id: id, players_count: 2)
      else
        render json: {error: 'Failed to enter user', status: '5' }
      end
    else
      render json: {error: 'Password wrong', status: '24' }
    end
  end

  def room_info
    rooms = Room.where('players_count >= ?', 1)
                .pluck(:id, :name, :players_count, :password_status, :game_lock_status, :host_id, :user_id)
                .map { |room| { id: room[0], name: room[1], players_count: room[2], password_status: room[3], game_lock_status: room[4], host_id: room[5], user_id: room[6] } }
    render json: rooms
  end



  def role
    data = JSON.parse(request.body.read)
    room_id = data['room_id']
    room = Room.find_by(id: room_id)
    render json: {host: room.host_id , guest: room.user_id}
  end

  def text_for_race
    data = JSON.parse(request.body.read)
    room_id = data['room_id']
    room = Room.find_by(id: room_id)
    paragraph = Faker::Lorem.paragraph(sentence_count: 40)
    room.update(text: paragraph)
  end

  def kick
    data = JSON.parse(request.body.read)
    room_id = data['room_id']
    room = Room.find_by(id: room_id)
    room.update(user_id: 0, players_count: 1 )
  end

  def give_text
    data = JSON.parse(request.body.read)
    room_id = data['room_id']
    room = Room.find_by(id: room_id)
    render json: {text: room.text}

  end

  def return_nickname_into_rooms
    data = JSON.parse(request.body.read)
    room_id = data['room_id']
    room = Room.find_by(id: room_id)

    if room.nil?
      return render json: { error: 'Room not found' }, status: :not_found
    end

    host = User.find_by(id: room.host_id)
    user = User.find_by(id: room.user_id)

    if host.nil?
      return render json: { error: 'Host not found' }, status: :not_found
    end

    if user.nil?
      render json: { host_nickname: host.nickname }
    else
      render json: { host_nickname: host.nickname, user_nickname: user.nickname }
    end
  end

  def user_info
    data = JSON.parse(request.body.read)
    id = data['id']

    user = User.find_by(id: id)

    if user
      matches = Match.where(user_id: id).select(:created_at, :accuracy, :sps, :user_id)

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

    if match.save
      render json: { status: 'success', match: match }, status: :created
    else
      render json: { status: 'error', errors: match.errors.full_messages }, status: :unprocessable_entity
    end


  end

  end



