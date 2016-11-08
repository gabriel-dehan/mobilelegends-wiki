# Other wise handled by Heroku 
#
#   heroku bulidpacks:add 'https://github.com/heroku/heroku-buildpack-nodejs.git'
#   heroku bulidpacks:add 'https://github.com/heroku/heroku-buildpack-ruby.git'
#
if Rails.env.development? || Rails.env.test?
  system 'npm install'
end
