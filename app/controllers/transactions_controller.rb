class TransactionsController < ApplicationController
    before_action :set_transaction, only: [:show, :edit, :update, :destroy]
  
    # GET /transactions
    def index
      @transactions = Transaction.all.where(:active => true)
      transactions = []
      @transactions.each do |transaction| 
        trans_date = transaction.trans_date.blank? ? nil: transaction.trans_date.strftime('%Y-%m-%d')
        transaction.trans_date =  trans_date
        transactions << transaction
      end
      render json: {transactions: transactions, message: 'Transactions Reload successfully.'}, status: :ok
    end
  
    # GET /transactions/1
    def show
    end
  
    # GET /transactions/new
    def new
      @transaction = Transaction.new
    end
  
    # POST /transactions
    def create
      @transaction = Transaction.new(transaction_params)
      if @transaction.save
        # redirect_to @transaction, notice: 'Transaction was successfully created.'
        render json: {transaction: @transaction, message: 'Transaction was successfully created.'}, status: :created
        # render 
      else
        render json: {error: @transaction.errors.full_messages}, status: :unprocessable_entity
        # render :new
      end
    end
  
    # GET /transactions/1/edit
    def edit
    end
  
    # PATCH/PUT /transactions/1
    def update
      # if @transaction.update(transaction_params)
      #   # redirect_to @transaction, notice: 'Transaction was successfully updated.'
      #   render json: {transaction: @transaction, message: 'Transaction was successfully created.'}, status: :
      # else
      #   render :edit
      # end
      if @transaction.update(transaction_params)
        render json: { message: 'Transaction updated successfully', transaction: @transaction }, status: :ok
      else
        render json: { error: @transaction.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    # DELETE /transactions/1
    def destroy
      # @transaction.destroy
      if @transaction.update(active: false)
        render json: { message: "Transaction deleted successfully" }, status: :ok
      else
        render json: { errors: @transaction.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_transaction
        begin
          @transaction = Transaction.find(params[:id])
        rescue Exception => e
          render json: { errors: "Something wrong in fetching transaction." }, status: :unprocessable_entity
        end
      end
  
      # Only allow a list of trusted parameters through.
      def transaction_params
        params.require(:transaction).permit(:active, :amount, :main_category, :user_category, :trans_date, :description, :user_id)
      end
  end


#   but what if i changed the function name like index to list_all or list_all_transaction and show to show_all or show_all_transactions so how is my redirect_to look like?
# ChatGPT said:
# ChatGPT
# If you change the action names in your TransactionsController, you'll need to update your redirect_to calls to reflect these new action names. The redirect_to method generates URLs based on the action names and the routing definitions, so you'll need to ensure that it points to the correct routes.

# Example with Renamed Actions
# Let's say you renamed your actions as follows:

# index to list_all or list_all_transactions
# show to show_all or show_all_transactions
# Here's how you would adjust the redirect_to calls in your controller:

# 1. Updated destroy Action
# Old Code:

# ruby
# Copy code
# def destroy
#   @transaction.destroy
#   redirect_to transactions_url, notice: 'Transaction was successfully destroyed.'
# end
# Updated Code (if you renamed index to list_all_transactions):

# ruby
# Copy code
# def destroy
#   @transaction.destroy
#   redirect_to list_all_transactions_url, notice: 'Transaction was successfully destroyed.'
# end
# Updated Code (if you renamed index to list_all):

# ruby
# Copy code
# def destroy
#   @transaction.destroy
#   redirect_to list_all_url, notice: 'Transaction was successfully destroyed.'
# end
# 2. Updated create and update Actions
# Old Code:

# ruby
# Copy code
# def create
#   @transaction = Transaction.new(transaction_params)
#   if @transaction.save
#     redirect_to @transaction, notice: 'Transaction was successfully created.'
#   else
#     render :new
#   end
# end

# def update
#   if @transaction.update(transaction_params)
#     redirect_to @transaction, notice: 'Transaction was successfully updated.'
#   else
#     render :edit
#   end
# end
# Updated Code (if you renamed show to show_all_transactions):

# ruby
# Copy code
# def create
#   @transaction = Transaction.new(transaction_params)
#   if @transaction.save
#     redirect_to show_all_transactions_url(@transaction), notice: 'Transaction was successfully created.'
#   else
#     render :new
#   end
# end

# def update
#   if @transaction.update(transaction_params)
#     redirect_to show_all_transactions_url(@transaction), notice: 'Transaction was successfully updated.'
#   else
#     render :edit
#   end
# end
# Updated Code (if you renamed show to show_all):

# ruby
# Copy code
# def create
#   @transaction = Transaction.new(transaction_params)
#   if @transaction.save
#     redirect_to show_all_url(@transaction), notice: 'Transaction was successfully created.'
#   else
#     render :new
#   end
# end

# def update
#   if @transaction.update(transaction_params)
#     redirect_to show_all_url(@transaction), notice: 'Transaction was successfully updated.'
#   else
#     render :edit
#   end
# end
# Updating Routes
# You'll also need to ensure your config/routes.rb file reflects the new action names. For example:

# ruby
# Copy code
# Rails.application.routes.draw do
#   resources :transactions, only: [:list_all, :show_all, :new, :create, :edit, :update, :destroy], path_names: { index: 'list_all', show: 'show_all' }
# end
# In this example, the path_names option is used to map the index action to list_all and the show action to show_all.

# Summary
# Change redirect_to Calls: Update redirect_to calls to match the new action names.
# Update Routes: Ensure your routes are updated to handle the new action names.
# Consistent Naming: Make sure that the renamed actions are reflected consistently in both your controller and routes to avoid routing errors.
# # By making these changes, you ensure that your application’s URLs and redirects align with the new action names, preserving the correct navigation flow.
  