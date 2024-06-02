class RaceChannel < ApplicationCable::Channel
  def subscribed
    room_id = params[:room_id]
    user_id = params[:user_id]
    room = Room.find_by(id: room_id)
    stream_from "race_channel_#{room_id}"

    user_entered(room_id, user_id)

    puts "Client subscribed to race channel for room #{room_id}"
  end
  def unsubscribed
    room_id = params[:room_id]
    user_id = params[:user_id]

    user_left(room_id, user_id)

    puts "Client unsubscribed from race channel for room #{room_id}"
  end
  def start_game(data)
    room_id = data["room_id"]
    room = Room.find_by(id: room_id)
    room.update(game_lock_status: 1)
    message = { notice: "countdown has begun" }

    ActionCable.server.broadcast("race_channel_#{room_id}", message)
  end

  def speed(data)
    user_id = data["user_id"]
    room_id = data["room_id"]
    valid = data["valid"]

    if valid == true
      speed_change = 3
    else
      speed_change = -0.6
    end

    message = {
      user_id: user_id,
      room_id: room_id,
      speed_change: speed_change
    }

    ActionCable.server.broadcast("race_channel_#{room_id}", message)
  end

  def speed_slow(data)
    user_id = data["user_id"]
    room_id = data["room_id"]

    speed_change = -0.2

    message = {
      user_id: user_id,
      room_id: room_id,
      speed_change: speed_change
    }

    ActionCable.server.broadcast("race_channel_#{room_id}", message)
  end

  private
  def user_entered(room_id, user_id)
    message = {
      user_id: user_id,
      room_id: room_id,
      status: "entered"
    }

    ActionCable.server.broadcast("race_channel_#{room_id}", message)
  end

  def user_left(room_id, user_id)
    message = {
      user_id: user_id,
      room_id: room_id,
      status: "left"
    }

    ActionCable.server.broadcast("race_channel_#{room_id}", message)
  end

end
