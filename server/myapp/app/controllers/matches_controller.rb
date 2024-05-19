class MatchesController < ApplicationController


  def new_recording
    data = JSON.parse(request.body.read)
    accuracy = data["accuracy"]
    sps=data["sps"]
    user_id=params["user_id"]
    enemy_id=params["ememy_id"]
    match = Match.new(accuracy: accuracy, sps: sps, user_id: user_id, enemy_id: enemy_id)
    match.save

  end












end
