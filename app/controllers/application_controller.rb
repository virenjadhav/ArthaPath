class ApplicationController < ActionController::API
# class ApplicationController < ActionController::Base
    # before_action :authenticate_user!, expect: [:login, :signup]
    # protect_from_forgery with: :null_session
    # protect_from_forgery with: :exception, unless: -> { request.format.json? }
    before_action :authenticate_user!, unless: :skip_authorization?
    before_action :convert_params_to_doc

    # Global error handling
  around_action :handle_exceptions

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
    # def respond_to_action(object, type = "json") 
    #   respond_to do |format|
    #     case type
    #     when 'json'
    #       format.json { render json: object }
    #       break;
    #     when 'xml'
    #       format.xml { render xml: object }
    #       break;
    #     when 'html'
    #       format.html { render :object } # pass object as html file 
    #       break;
    #     when 'partial'
    #       format.html { render partial: "#{object}" } # pass object as path like shared/header where Renders _header.html.erb from the shared folder.
    #       break;
    #     when 'plain'
    #       format.html { render plain: "#{object}" } # pass object as string. 
    #       break;
    #     when 'inline'
    #       format.html { render inline: "#{object}" } # pass object as html code. 
    #       break;
    #     when 'file'
    #       format.html { render file: "#{object}" } # pass object as file path
    #       break;
    #     else 
    #       # respond_to_err
    #       format.html { render :object } #pass object as view file in same directory 
    #     end
    #   end
    # end
    # def respond_to_error(object, type = "json") 
    #   respond_to do |format|
    #     case type
    #     when 'json'
    #       format.json { render json: object.errors.to_json() }
    #       break;
    #     when 'xml'
    #       format.xml { render xml: object_errors.to_xml() }
    #       break;
    #     when 'html'
    #       format.html { render :object.errors.to_string() }
    #       break;
    #     else 
    #       # respond_to_err
    #     end
    #   end
    # end
    def respond_to_action(object,message = "", type = "json")
      # respond_to do |format|
      #   case type
      #   when 'json'   then format.json { render json: object }
      #   when 'xml'    then format.xml { render xml: object }
      #   when 'html'   then format.html { render object }
      #   when 'partial' then format.html { render partial: object }
      #   when 'plain'  then format.html { render plain: object }
      #   when 'inline' then format.html { render inline: object }
      #   when 'file'   then format.html { render file: object }
      #   else
      #     format.html { render object }
      #   end
      # end
      case type
      when 'json'   then render json: object, status: :ok
      when 'xml'    then render xml: object, status: :ok
      when 'html'   then  render object, status: :ok
      when 'partial' then  render partial: object, status: :ok
      when 'plain'  then render plain: object, status: :ok
      when 'inline' then render inline: object, status: :ok
      when 'file'   then render file: object, status: :ok
      else
        render object, status: :ok

      end
    end
  
    def respond_to_error(message="", type = "json")
      # respond_to do |format|
      #   case type
      #   when 'json' then format.json { render json: object.errors.to_json, status: :unprocessable_entity }
      #   when 'xml'  then format.xml { render xml: object.errors.to_xml, status: :unprocessable_entity }
      #   when 'html' then format.html { render plain: object.errors.full_messages.join(", "), status: :unprocessable_entity }
      #   else
      #     format.html { render plain: "An error occurred", status: :unprocessable_entity }
      #   end
      # end
        case type
        # when 'json' then render json: { error: object.errors.to_json }, status: :unprocessable_entity 
        # when 'xml'  then  render xml: { error: object.errors.to_xml }, status: :unprocessable_entity 
      # when 'html' then  render plain: { error: object.errors.full_messages.join(", ")}, status: :unprocessable_entity 
        # when 'json' then render json: { error: message.to_json }, status: :unprocessable_entity 
        # when 'xml'  then  render xml: { error: message.to_xml }, status: :unprocessable_entity 
      when 'json' then render json: { error: message }, status: :unprocessable_entity 
      when 'xml'  then  render xml: { error: message }, status: :unprocessable_entity 
        when 'html' then  render plain: { error: message}, status: :unprocessable_entity 
        else
          render plain: "An error occurred", status: :unprocessable_entity 
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
    # Global exception handler for all actions
  def handle_exceptions
    yield
    rescue ActiveRecord::RecordNotFound => e
      render json: { error: "Record not found: #{e.message}" }, status: :not_found
    rescue ActionController::ParameterMissing => e
      render json: { error: "Missing parameter: #{e.message}" }, status: :bad_request
    rescue StandardError => e
      render json: { error: "Internal Server Error: #{e.message}" }, status: :internal_server_error
    rescue Exception => e 
      render json: { error: "Something went wrong: #{e.message}"}, status: :internal_server_error
  end
end