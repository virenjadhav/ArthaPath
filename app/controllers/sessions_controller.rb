class SessionsController < ApplicationController
    def create_session
        # user = User.find_by(email: params[:email])
        # if user&.authenticate(params[:password])
        puts(params)
        user = User.find_by(email: params[:session][:email].downcase)
        if user && user.authenticate(params[:session][:password])
            session[:user_id] = user.id
            render json: {status: "success", message: "Logged in successfully", user: { email: current_user.email, name: current_user.name, user_id: user.id  }}
        else 
            render json: {status: "error", error: "Invalid Credentials"}, status: :unauthorized
        end
    end

    def logged_in
        if current_user
            # render json: { user: current_user }, status: :ok
            render json: {status: "success", user: { email: current_user.email, name: current_user.name, user_id: current_user.id  } }, status: :ok
        else
            render json: {status: "error", error: 'Not logged in' }, status: :unauthorized
        end
    end
    

    def destroy 
        session[:user_id] = nil
        render json: {message: "Logged out successfully"}
    end
end