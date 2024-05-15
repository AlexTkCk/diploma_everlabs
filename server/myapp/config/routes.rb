Rails.application.routes.draw do
  post '/user/signup', to: 'users#signup'
  get 'testing_pines', to: 'users#test_pines'
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





end
