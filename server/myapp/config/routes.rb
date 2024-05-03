Rails.application.routes.draw do
  post '/user/signup', to: 'users#signup'
  post '/user/login', to: 'users#login'
  get '/user/logout', to: 'users#logout'
  post '/some_action', to: 'some#some_action'
end
