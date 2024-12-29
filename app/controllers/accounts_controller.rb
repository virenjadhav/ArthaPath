class AccountsController < ApplicationController
    before_action :set_account, only: [:show_account, :edit_account, :update_account, :destroy_account]
    def get_accounts_details
        
        # binding.pry
        
      criteria_data = params[:criteriaSearchData]
      criteria_condition = CommonModule.get_criteria_condition(criteria_data)
      @accounts = Account.where("accounts.active = 1 #{!criteria_condition.blank? ? criteria_condition : "" } ").joins(:bank).select("accounts.*, banks.icon").order(id: :desc).limit(100)
      render json: {data: @accounts, message: 'Accounts Reload successfully.'}, status: :ok
    end
  
    def show_account
    end
  
    def new
      @account = Account.new
    end
  
    def create_account
      @account = Account.new(account_params)   
      if @account.save
        render json: {data: @account, message: "Account# #{@account.name} was successfully created."}, status: :created
      else
        render json: {error: @account.errors.full_messages}, status: :unprocessable_entity
      end
    end
  
    def edit_account
    end
  
  
    def update_account
      if @account.update(account_params)
        render json: { message: "Account# '#{@account.name}' updated successfully", data: @account }, status: :ok
      else
        render json: { error: @account.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def destroy_account     
      if @account.update(active: false)
        render json: { message: "Account# '#{@account.name}' deleted successfully" }, status: :ok
      else
        render json: { errors: @account.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
      def set_account
        begin
          @account = Account.find(params[:id])
        rescue Exception => e
          render json: { errors: "Something wrong in fetching account." }, status: :unprocessable_entity 
        end
      end
  
      def account_params
        params.require(:body).permit(:active, :name, :user_id, :bank_id, :currency, :initial_balance, :description, :bank_code, :code)
      end
  end