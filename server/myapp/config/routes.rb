Rails.application.routes.draw do
  post '/user/signup', to: 'users#signup'
  post '/user/login', to: 'users#login'
  post '/re-entry', to: 're_entry#return_id'
  get  '/register', to: 'users#register'
  get '/auth/:provider/callback', to: 'google_auto#reg'
  post '/email_auth', to: 'email_auth#send_mail'
  get '/email_auth/:token/:id', to: 'email_auth#add_auth'
  post '/password_recovery', to: 'password_recovery#send_mail'
  post '/password_recovery/:token/:id', to: 'password_recovery#add_new_pass'
  get '/password_recovery/:token/:id', to: 'password_recovery#add_new_pass'
  post '/password/change/:token/:id', to: 'password_recovery#change_password'
  get '/test', to: 're_entry#testing'
  post '/enter_own_room', to: 'room_action#entering_own_room'
  post '/enter_room', to: 'room_action#entering_other_room'
  post '/leave_room', to: 'room_action#leave_room'
  get '/get_info_rooms', to: 'room_action#room_info'
  post '/text_race', to: 'room_action#text_for_race'
  post '/get_text', to: 'room_action#give_text'
  post '/role', to: 'room_action#role'
  post '/record_match', to: 'matches#new_recording'
  post '/edit_profile', to: 'edit_profile#edit_profile'
  post '/password_enable', to: 'room_action#pass_room'
  post '/password_disable', to: 'room_action#pass_clear_room'
  post '/enter_password', to: 'room_action#enter_pass_room'
  post '/nick_names', to: 'room_action#return_nickname_into_rooms'
  get '/leaderboard', to: 'matches#show_leaderboard'
  post '/games_user', to: 'matches#last_games'
  post '/enter_pass', to: 'room_action#entering_pass_room'
  post '/lock_unlock', to: 'room_action#lock_unlock'
  post '/kick', to: 'room_action#kick'
  post '/leave', to: 'room_action#leave_room'
  post '/user_info', to: 'room_action#user_info'
  post '/save_game', to: 'room_action#save_game'

  mount ActionCable.server => '/cable'





end
