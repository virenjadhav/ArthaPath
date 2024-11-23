class ApplicationController < ActionController::API
    # before_action :authenticate_user!, expect: [:login, :signup]
    before_action :authenticate_user!, unless: :skip_authorization?
    before_action :convert_params_to_doc

    def skip_authorization?
        # Define actions for which you want to skip authorization
        ['login', 'signup', 'create_session', 'logged_in', 'create_user'].include?(action_name)
    end

    def convert_params_to_doc 
      body = params["body"]
      body = body.is_a?(ActionController::Parameters) ? body.to_unsafe_h : body
      if !body.nil? && body.is_a?(Hash)
        # Now `body` is a regular hash, so you can check its contents
        # @doc = body.first.last
        @doc = body
        
      elsif !body.nil? && body.is_a?(Hash)
        @doc = []
        body.each do |key, value|
          # Only process numeric keys
          next unless key.match?(/^\d+$/)
          
          @doc << value
        end
      else
        @doc = body  # If it's not a hash or array, just assign it directly
      end
      if @doc and !@doc.blank? and @doc["user_id"]
        @user_id = @doc["user_id"]
      else 
        @user_id = nil 
      end
    end
    

    def module_action_handler
        module_name = params[:module_name]
        action_name = params[:action]
    
        # Dynamically create the controller name based on the module_name
        controller_class_name = "#{module_name.camelize}Controller"
    
        begin
          # Dynamically instantiate the controller
          controller_class = controller_class_name.constantize.new
    
          # Check if the controller responds to the action
          if controller_class.respond_to?(action_name)
            # Call the action dynamically
            controller_class.send(action_name)
          else
            render json: { error: "Action #{action_name} not found in #{controller_class_name}" }, status: :not_found
          end
        rescue NameError
          render json: { error: "Controller #{controller_class_name} not found" }, status: :not_found
        end
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