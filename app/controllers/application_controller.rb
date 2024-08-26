class ApplicationController < ActionController::API
    # before_action :authorize_request
    before_action :authorize_request, unless: :skip_authorization?
  
    def current_user
      @current_user
    end
  
    private

    def skip_authorization?
      # Define actions for which you want to skip authorization
      ['authenticate', 'signup'].include?(action_name)
    end
  
    def authorize_request
      header = request.headers['Authorization']
      token = header.split(' ').last if header
      decoded_token = decode_token(token)
      if decoded_token
        @current_user = User.find_by(id: decoded_token[:user_id])
        unless @current_user
          render json: { error: 'Not Authorized' }, status: :unauthorized
        end
      else
        render json: { error: 'Not Authorized' }, status: :unauthorized
      end
    end
  
    def decode_token(token)
      return if token.nil?
      begin
        JWT.decode(token, Rails.application.secret_key_base)[0]
      rescue JWT::DecodeError
        nil
      end
    end
end
