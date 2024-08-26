# app/controllers/authentication_controller.rb
class AuthenticationController < ApplicationController
    def authenticate
      user = User.find_by(email: params[:email])
      if user&.authenticate(params[:password])
        token = encode_token({ user_id: user.id })
        render json: { token: token }, status: :ok
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    end
  
    private
  
    # Encode the payload with the secret key to create a JWT
    def encode_token(payload)
      JWT.encode(payload, Rails.application.secret_key_base)
    end
  end
  