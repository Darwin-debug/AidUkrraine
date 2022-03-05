Recaptcha.configure do |config|
    config.site_key  = Rails.application.credentials.recaptcha.public
    config.secret_key = Rails.application.credentials.recaptcha.private
end