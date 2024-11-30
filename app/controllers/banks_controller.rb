class BanksController < ApplicationController
    before_action :set_bank, only: [:show_bank, :edit_bank, :update_bank, :destroy_bank]
    def get_banks_details
        
        # binding.pry
        
      criteria_data = params[:criteriaSearchData]
      criteria_condition = CommonModule.get_criteria_condition(criteria_data)
      @banks = Bank.all.where("active = 1 #{!criteria_condition.blank? ? criteria_condition : "" } ").order(id: :desc).limit(100)
      render json: {data: @banks, message: 'Banks Reload successfully.'}, status: :ok
    end
  
    def show_bank
    end
  
    def new
      @bank = Bank.new
    end
  
    def create_bank
      @bank = Bank.new(bank_params)   
      if @bank.save
        render json: {data: @bank, message: "Bank# #{@bank.code} was successfully created."}, status: :created
      else
        render json: {error: @bank.errors.full_messages}, status: :unprocessable_entity
      end
    end
  
    def edit_bank
    end
  
  
    def update_bank
      if @bank.update(bank_params)
        render json: { message: "Bank# '#{@bank.code}' updated successfully", data: @bank }, status: :ok
      else
        render json: { error: @bank.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def destroy_bank     
      if @bank.update(active: false)
        render json: { message: "Bank# '#{@bank.code}' deleted successfully" }, status: :ok
      else
        render json: { errors: @bank.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
      def set_bank
        begin
          @bank = Bank.find(params[:id])
        rescue Exception => e
          render json: { errors: "Something wrong in fetching bank." }, status: :unprocessable_entity 
        end
      end
  
      def bank_params
        params.require(:body).permit(:active, :code, :name, :user_id, :bank_owner_name, :address1, :address2, :city, :state, :zip_code ,:country, :ifsc_code, :account_number, :icon)
      end
  end