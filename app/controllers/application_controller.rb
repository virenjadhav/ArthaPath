class ApplicationController < ActionController::API
    # before_action :authenticate_user!, expect: [:login, :signup]
    before_action :authenticate_user!, unless: :skip_authorization?

    def skip_authorization?
        # Define actions for which you want to skip authorization
        ['login', 'signup', 'create_session', 'logged_in', 'create_user'].include?(action_name)
      end

    def authenticate_user!
        current_user.inspect
        unless @current_user
            render json: {error: 'Unauthorized'}, status: :unauthorized
        end
    end

    def current_user
        @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end
end