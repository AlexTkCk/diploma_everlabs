class MatchesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new_recording
    data = JSON.parse(request.body.read)
    accuracy = data["accuracy"]
    sps=data["sps"]
    user_id=params["user_id"]
    enemy_id=params["ememy_id"]
    match = Match.new(accuracy: accuracy, sps: sps, user_id: user_id, enemy_id: enemy_id)
    match.save

  end

  def show_leaderboard
    matches = Match.select(:created_at, :accuracy, :sps, :user_id, :nickname)
    render json: matches
  end


  def last_games
    data = JSON.parse(request.body.read)
    user_id = data["id"]
    matches = Match.where(user_id: user_id).select(:created_at, :accuracy, :sps)
    render json: matches

  end







end
