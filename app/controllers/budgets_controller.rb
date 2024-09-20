class BudgetsController < ApplicationController
    before_action :set_budget, only: [:show, :edit, :update, :destroy]
  
    # GET /budgets
    def index
      @budgets = Budget.all.where(:active => true)
      # budgets = []
      # @budgets.each do |budget| 
        # trans_date = budget.trans_date.blank? ? nil: budget.trans_date.strftime('%Y-%m-%d')
        # budget.trans_date =  trans_date
        # budgets << budget
      # end
      render json: {budgets: @budgets, message: 'Budgets Reload successfully.'}, status: :ok
    end
  
    # GET /budgets/1
    def show
    end
  
    # GET /budgets/new
    def new
      @budget = Budget.new
    end
  
    # POST /budgets
    def create
      @budget = Budget.new(budget_params)
      if @budget.save
        # redirect_to @budget, notice: 'Budget was successfully created.'
        render json: {budget: @budget, message: 'Budget was successfully created.'}, status: :created
        # render 
      else
        render json: {error: @budget.errors.full_messages}, status: :unprocessable_entity
        # render :new
      end
    end
  
    # GET /budgets/1/edit
    def edit
    end
  
    # PATCH/PUT /budgets/1
    def update
      # if @budget.update(budget_params)
      #   # redirect_to @budget, notice: 'Budget was successfully updated.'
      #   render json: {budget: @budget, message: 'Budget was successfully created.'}, status: :
      # else
      #   render :edit
      # end
      if @budget.update(budget_params)
        render json: { message: 'Budget updated successfully', budget: @budget }, status: :ok
      else
        render json: { error: @budget.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    # DELETE /budgets/1
    def destroy
      # @budget.destroy
      if @budget.update(active: false)
        render json: { message: "Budget deleted successfully" }, status: :ok
      else
        render json: { errors: @budget.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_budget
        begin
          @budget = Budget.find(params[:id])
        rescue Exception => e
          render json: { errors: "Something wrong in fetching budget." }, status: :unprocessable_entity
        end
      end
  
      # Only allow a list of trusted parameters through.
      def budget_params
        params.require(:budget).permit(:active, :amount, :main_category, :sub_category, :description, :user_id)
      end
  end


#   but what if i changed the function name like index to list_all or list_all_budget and show to show_all or show_all_budgets so how is my redirect_to look like?
# ChatGPT said:
# ChatGPT
# If you change the action names in your BudgetsController, you'll need to update your redirect_to calls to reflect these new action names. The redirect_to method generates URLs based on the action names and the routing definitions, so you'll need to ensure that it points to the correct routes.

# Example with Renamed Actions
# Let's say you renamed your actions as follows:

# index to list_all or list_all_budgets
# show to show_all or show_all_budgets
# Here's how you would adjust the redirect_to calls in your controller:

# 1. Updated destroy Action
# Old Code:

# ruby
# Copy code
# def destroy
#   @budget.destroy
#   redirect_to budgets_url, notice: 'Budget was successfully destroyed.'
# end
# Updated Code (if you renamed index to list_all_budgets):

# ruby
# Copy code
# def destroy
#   @budget.destroy
#   redirect_to list_all_budgets_url, notice: 'Budget was successfully destroyed.'
# end
# Updated Code (if you renamed index to list_all):

# ruby
# Copy code
# def destroy
#   @budget.destroy
#   redirect_to list_all_url, notice: 'Budget was successfully destroyed.'
# end
# 2. Updated create and update Actions
# Old Code:

# ruby
# Copy code
# def create
#   @budget = Budget.new(budget_params)
#   if @budget.save
#     redirect_to @budget, notice: 'Budget was successfully created.'
#   else
#     render :new
#   end
# end

# def update
#   if @budget.update(budget_params)
#     redirect_to @budget, notice: 'Budget was successfully updated.'
#   else
#     render :edit
#   end
# end
# Updated Code (if you renamed show to show_all_budgets):

# ruby
# Copy code
# def create
#   @budget = Budget.new(budget_params)
#   if @budget.save
#     redirect_to show_all_budgets_url(@budget), notice: 'Budget was successfully created.'
#   else
#     render :new
#   end
# end

# def update
#   if @budget.update(budget_params)
#     redirect_to show_all_budgets_url(@budget), notice: 'Budget was successfully updated.'
#   else
#     render :edit
#   end
# end
# Updated Code (if you renamed show to show_all):

# ruby
# Copy code
# def create
#   @budget = Budget.new(budget_params)
#   if @budget.save
#     redirect_to show_all_url(@budget), notice: 'Budget was successfully created.'
#   else
#     render :new
#   end
# end

# def update
#   if @budget.update(budget_params)
#     redirect_to show_all_url(@budget), notice: 'Budget was successfully updated.'
#   else
#     render :edit
#   end
# end
# Updating Routes
# You'll also need to ensure your config/routes.rb file reflects the new action names. For example:

# ruby
# Copy code
# Rails.application.routes.draw do
#   resources :budgets, only: [:list_all, :show_all, :new, :create, :edit, :update, :destroy], path_names: { index: 'list_all', show: 'show_all' }
# end
# In this example, the path_names option is used to map the index action to list_all and the show action to show_all.

# Summary
# Change redirect_to Calls: Update redirect_to calls to match the new action names.
# Update Routes: Ensure your routes are updated to handle the new action names.
# Consistent Naming: Make sure that the renamed actions are reflected consistently in both your controller and routes to avoid routing errors.
# # By making these changes, you ensure that your application’s URLs and redirects align with the new action names, preserving the correct navigation flow.
  