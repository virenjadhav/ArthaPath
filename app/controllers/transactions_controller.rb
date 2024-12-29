class TransactionsController < ApplicationController
  def get_transactions
    #   render json: {data: transactions, message: 'Transactions Reload successfully.'}, status: :ok
        result, message, @transactions = @transactions = TransactionCrud.get_transactions(@doc)
        if result
            object = {data: @transactions, message: "Transactions Reload successfully.", status: "success"}
            respond_to_action(object)
        else 
            msg = message.blank? ? "Something went wrong getting transactions." : message
            respond_to_error(msg)
        end
    end
  
    def show_transaction
    # render json: transaction.as_json(include: :transaction_lines)
    #   if @transaction
    #     render json: { message: "Transaction# '#{@transaction.transaction_code}' get successfully", data: @transaction, status: "success" }, status: :ok
    #   else
    #     render json: { error: @transaction.errors }, status: :unprocessable_entity
    #   end
        result, message, @transaction = TransactionCrud.show_transaction(@doc)
        if result
            object = {data: @transaction, message: "Transaction# '#{@transaction.transaction_code}' get successfully", status: "success"}
            respond_to_action(object)
        else 
            msg = message.blank? ? @transaction.errors : message
            respond_to_error(msg)
        end
    end
  
    # def new
    #   @transaction = Transaction.new
    # end
  
    def create_or_save_transaction      
    #   @transaction = Transaction.new(transaction_params) 
    #         if @transaction.save
    #             render json: {data: @transaction, message: "Transaction# #{@transaction.transaction_code} was successfully created.", status: "success"}, status: :created
    #           else
    #             render json: {error: "something went wrong from server", status: "error"}, status: :unprocessable_entity
    #           end
        create_record = @doc[:id].blank? ? true : false
        result, message, @transaction = TransactionCrud.create_or_save_transaction(transaction_params)
        if result
            # respond_to_action("show_transaction") 
            object = {data: @transaction, message: "Transaction# #{@transaction.transaction_code} was successfully #{create_record ? "created" : "updated"}.", status: "success"}
            respond_to_action(object)
        else 
            # @transaction.errors.add(message)
            msg = message.blank? ? @transaction.errors : message
            respond_to_error(msg)
        end
    end
  
    # def edit_transaction
    # end
  
    # def update_transaction   
    #     if @transaction.update(transaction_params)
    #         render json: { message: "Transaction# '#{@transaction.transaction_code}' updated successfully", data: @transaction }, status: :ok
    #     else
    #         render json: { error: @transaction.errors.full_messages}, status: :unprocessable_entity
    #     end
    # end
  
    def destroy_transaction     
    #   if @transaction.update(active: false)
    #     render json: { message: "Transaction# '#{@transaction.transaction_code}' deleted successfully" }, status: :ok
    #   else
    #     render json: { errors: @transaction.errors.full_messages }, status: :unprocessable_entity
    #   end
        result, message, @transaction = TransactionCrud.delete_transaction(@doc)
        if result
            object = {data: @transaction, message: "Transaction# '#{@transaction.transaction_code}' deleted successfully", status: "success"}
            respond_to_action(object)
        else 
            msg = message.blank? ? @transaction.errors : message
            respond_to_error(msg)
        end
    end
  
    private
    #   def set_transaction
    #     begin
    #       @transaction = Transaction.find(params[:id])
    #     rescue Exception => e
    #       render json: { errors: "Something wrong in fetching transaction." }, status: :unprocessable_entity
    #     end
    #   end
  
      def transaction_params
        params.require(:body).permit(:id, :active,:user_id, :transaction_code, :transaction_name, :contact_no, :contact_email, :amount, :transaction_amount, :interest_type, :interest_rate, :due_date, :status, :transaction_type, :attachment_file_name, :payment_method, :description)
      end  
  
  
  # before_action :set_transaction, only: [:show_transaction, :edit_transaction, :update_transaction, :destroy_transaction]
    # # before_create :set_trans_no
  
    # # GET /transactions
    # def get_transactions
    #   criteria_data = params[:criteriaSearchData]
    #   criteria_condition = CommonModule.get_criteria_condition(criteria_data)
    #   @transactions = Transaction.all.where("active = 1 #{!criteria_condition.blank? ? criteria_condition : "" } ").order(id: :desc).limit(100)
    #   transactions = []
    #   @transactions.each do |transaction| 
    #     # trans_date = transaction.trans_date.blank? ? nil: transaction.trans_date.strftime('%Y-%m-%d')
    #     # transaction.trans_date =  trans_date
    #     transactions << transaction
    #   end
    #   render json: {data: transactions, message: 'Transactions Reload successfully.'}, status: :ok
    # end
  
    # # GET /transactions/1
    # def show_transaction
    #   if @transaction
    #     render json: { message: "Transaction# '#{@transaction.trans_no}' get successfully", data: @transaction }, status: :ok
    #   else
    #     render json: { error: @transaction.errors }, status: :unprocessable_entity
    #   end
    # end
  
    # # GET /transactions/new
    # def new
    #   @transaction = Transaction.new
    # end
  
    # # POST /transactions
    # def create_transaction      
    #   @transaction = Transaction.new(transaction_params)         
    #   if @transaction.save
    #     # redirect_to @transaction, notice: 'Transaction was successfully created.'
    #     render json: {data: @transaction, message: "Transaction# #{@transaction.trans_no} was successfully created."}, status: :created
    #     # render 
    #   else
    #     render json: {error: @transaction.errors.full_messages}, status: :unprocessable_entity
    #     # render :new
    #   end
    # end
  
    # # GET /transactions/1/edit
    # def edit_transaction
    # end
  
    # # PATCH/PUT /transactions/1
    # def update_transaction
    #   # if @transaction.update(transaction_params)
    #   #   # redirect_to @transaction, notice: 'Transaction was successfully updated.'
    #   #   render json: {transaction: @transaction, message: 'Transaction was successfully created.'}, status: :
    #   # else
    #   #   render :edit
    #   # end
    #   if @transaction.update(transaction_params)
    #     render json: { message: "Transaction# '#{@transaction.trans_no}' updated successfully", data: @transaction }, status: :ok
    #   else
    #     render json: { error: @transaction.errors.full_messages }, status: :unprocessable_entity
    #   end
    # end
  
    # # DELETE /transactions/1
    # def destroy_transaction
    #   # @transaction.destroy      
    #   if @transaction.update(active: false)
    #     render json: { message: "Transaction# '#{@transaction.trans_no}' deleted successfully" }, status: :ok
    #   else
    #     render json: { errors: @transaction.errors.full_messages }, status: :unprocessable_entity
    #   end
    # end
  
    # private
    #   # Use callbacks to share common setup or constraints between actions.
    #   def set_transaction
    #     begin
    #       @transaction = Transaction.find(params[:id])
    #     rescue Exception => e
    #       render json: { errors: "Something wrong in fetching transaction." }, status: :unprocessable_entity
    #     end
    #   end
  
    #   # Only allow a list of trusted parameters through.
    #   def transaction_params
    #     params.require(:body).permit(:active, :amount, :main_category_id, :main_category_code, :sub_category_id, :sub_category_code, :user_category, :trans_date, :description, :user_id, :source_type, :payment_method)
    #   end

    #   # def set_trans_no
    #   #   # Find the maximum `trans_no` and increment it by 1
    #   #   max_trans_no = Transaction.maximum(:trans_no) || 5000
    #   #   self.trans_no = max_trans_no + 1
    #   # end
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
  