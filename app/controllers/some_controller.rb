# app/controllers/some_controller.rb
class SomeController < ApiController
    def index
      render json: { message: "Welcome, #{current_user.email}" }
    end
  end
  