class BudgetsController < ApplicationController
  before_action :set_budget, only: [:show_budget, :edit_budget, :update_budget, :destroy_budget]
  # before_create :set_trans_no

  # GET /budgets
  def get_budgets
    criteria_data = params[:criteriaSearchData]
    criteria_condition = CommonModule.get_criteria_condition(criteria_data)
    @budgets = Budget.all.where("active = 1 #{!criteria_condition.blank? ? criteria_condition : "" } ").order(id: :desc).limit(100)
    budgets = []
    @budgets.each do |budget| 
      # from_date = budget.from_date.blank? ? nil: budget.from_date.strftime('%Y-%m-%d')
      # budget.from_date =  from_date
      budgets << budget
    end
    render json: {data: budgets, message: 'Budgets Reload successfully.'}, status: :ok
  end

  # GET /budgets/1
  def show_budget
  end

  # GET /budgets/new
  def new
    @budget = Budget.new
  end

  # POST /budgets
  def create_budget      
    @budget = Budget.new(budget_params)  
    @budget.to_date = Time.now.strftime('%Y-%m-%d')     
    if @budget.save
      # redirect_to @budget, notice: 'Budget was successfully created.'
      render json: {data: @budget, message: "Budget# #{@budget.id} was successfully created."}, status: :created
      # render 
    else
      render json: {error: @budget.errors.full_messages}, status: :unprocessable_entity
      # render :new
    end
  end

  # GET /budgets/1/edit
  def edit_budget
  end

  # PATCH/PUT /budgets/1
  def update_budget
    # if @budget.update(budget_params)
    #   # redirect_to @budget, notice: 'Budget was successfully updated.'
    #   render json: {budget: @budget, message: 'Budget was successfully created.'}, status: :
    # else
    #   render :edit
    # end
    if @budget.update(budget_params)
      render json: { message: "Budget# '#{@budget.id}' updated successfully", data: @budget }, status: :ok
    else
      render json: { error: @budget.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /budgets/1
  def destroy_budget
    # @budget.destroy      
    if @budget.update(active: false)
      render json: { message: "Budget# '#{@budget.id}' deleted successfully" }, status: :ok
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
      params.require(:body).permit(:active, :amount, :main_category_id, :main_category_code, :sub_category_id, :sub_category_code,  :description, :user_id,  :payment_method, :account_id, :account_code, :tag, :period, :from_date, :to_date, :alert_amount)
    end
end
