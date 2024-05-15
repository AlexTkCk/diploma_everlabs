Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, '846920946925-l6gpbd705htqnuiua5a07d14aitv3m7q.apps.googleusercontent.com', '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'
  OmniAuth.config.allowed_request_methods = [:post, :get]
  OmniAuth.config.silence_get_warning = true
end