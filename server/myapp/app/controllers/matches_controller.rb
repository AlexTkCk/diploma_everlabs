class MatchesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new_recording
    data = JSON.parse(request.body.read)

    unless data.key?("accuracy") && data.key?("sps") && params.key?("user_id") && params.key?("enemy_id")
      return render json: { error: 'Missing required parameters' }, status: :unprocessable_entity
    end

    accuracy = data["accuracy"]
    sps = data["sps"]
    user_id = params["user_id"]
    enemy_id = params["enemy_id"]

    match = Match.new(accuracy: accuracy, sps: sps, user_id: user_id, enemy_id: enemy_id)

    if match.save
      render json: { message: 'Recording saved successfully' }, status: :created
    else
      render json: { error: 'Failed to save recording', errors: match.errors.full_messages }, status: :unprocessable_entity
    end

  def show_leaderboard
    matches = Match.select(:created_at, :accuracy, :sps, :user_id, :nickname)
    render json: matches
  end

    def last_games
      user = User.find_by(id: params[:id])

      if user.nil?
        render json: { error: 'User not found' }, status: :not_found
        return
      end

      matches = Match.where(user_id: user.id).select(:created_at, :accuracy, :sps)
      render json: matches
    end

end
