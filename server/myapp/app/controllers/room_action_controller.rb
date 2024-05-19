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
      render json: { message: 'Access left your room' }
    else
      existing_room = Room.find_by(user_id: id)

      if existing_room.nil?
        render json: { error: 'User not found in any room' }, status: :not_found
        return
      end

      if id == existing_room.user_id
        existing_room.update(user_id: 0)
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

  def room_info
    rooms = Room.where('players_count >= ?', 1)
                .pluck(:id, :name, :players_count, :password_status, :game_lock_status)
                .map { |room| { id: room[0], name: room[1], players_count: room[2], password_status: room[3], game_lock_status: room[4] } }
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
    paragraph = Faker::Lorem.paragraph(sentence_count: 20)
    room = Room.find_by(id: room_id)
    room.update(text: paragraph)
  end


end
