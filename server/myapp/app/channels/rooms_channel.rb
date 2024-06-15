class RoomsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_info"
  end


  def unsubscribed
    stream_from "room_info"
  end

end