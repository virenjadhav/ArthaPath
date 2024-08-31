class UsersController < ApplicationController
    def create_user 
        user = User.new(user_params)
        if user.save
            # render json: {message: 'User created successfully', }, status: :created
            render json: {status: "success", message: "User Created successfully", user: { email: user.email, name: user.name }}, status: :created
        else    
            render json: {error: user.errors.full_messages}, status: :unprocessable_entity
        end
    end
    private 

    def user_params
        params.require(:user).permit(:email, :password, :password_confirmation, :name)
    end
end