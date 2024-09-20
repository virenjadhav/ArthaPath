class UsersController < ApplicationController
    before_action :authenticate_user!, only: [:change_password] # Ensure user is logged in for password change
    def create_user 
        user = User.new(user_params)
        if user.save
            # render json: {message: 'User created successfully', }, status: :created
            render json: {status: "success", message: "User Created successfully", user: { email: user.email, name: user.name, user_id: user.id }}, status: :created
        else    
            render json: {error: user.errors.full_messages}, status: :unprocessable_entity
        end
    end
    def change_password
        user = current_user
         # Ensure the old password matches the current password         
         if user && user.authenticate(params[:old_password])
            # check if new password and confirm password are not match
            if params[:new_password] == params[:confirm_password]
                if params[:new_password] != params[:old_password]
                    #update the password
                    if user.update(password: params[:new_password], password_confirmation: params[:confirm_password])
                        render json: {status: "success", message: "Password changed successfully!"}, status: :ok
                    else
                        render json: {error: "Unable to update password, #{user.errors.full_messages}" }, status: :unprocessable_entity
                    end 
                else
                    render json: {error: "Old password and new password cannot be same!"}, status: :unprocessable_entity
                end
                
            else
                render json: {error: "New password and confirm password are not match!"}, status: :unprocessable_entity
            end
        else
            render json: {error: "Old password is incorrect!"}, status: :unprocessable_entity
        end
    end
    private 

    def user_params
        params.require(:user).permit(:email, :password, :password_confirmation, :name)
    end
end