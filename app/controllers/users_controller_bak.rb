# app/controllers/users_controller.rb
class UsersControllerBak < ApplicationController
    # POST /signup
    def signup
        #   user = User.new(user_params)
        # user_params = params.require(:user).permit(:email, :password, :password_confirmation, :name)
        user = User.new(user_params)
      if user.save
        token = encode_token({ user_id: user.id })
        render json: { token: token, user: user }, status: :created
      else
        render json: { error: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    def user_params
    #   params.permit(:email, :password, :password_confirmation, :name)
        # params.require(:user).permit(:email, :name, :password, :password_confirmation)
        # params.require(:user).permit(:email, :name, :password, :password_confirmation)
        params.require(:user).permit(:email, :password, :password_confirmation, :name)
    end
  
    # Encode the payload with the secret key to create a JWT
    def encode_token(payload)
      JWT.encode(payload, Rails.application.secret_key_base)
    end
  end
  