Rails.application.routes.draw do
  post '/user/signup', to: 'users#signup'
  post '/user/login', to: 'users#login'
end
