class DebtsController < ApplicationController
    # before_action :set_debt, only: [:show_debt, :edit_debt, :update_debt, :destroy_debt]
    def get_debts
    #   render json: {data: debts, message: 'Debts Reload successfully.'}, status: :ok
        result, message, @debts = @debts = DebtCrud.get_debts(@doc)
        if result
            object = {data: @debts, message: "Debts Reload successfully.", status: "success"}
            respond_to_action(object)
        else 
            msg = message.blank? ? "Something went wrong getting debts." : message
            respond_to_error(msg)
        end
    end
  
    def show_debt
    # render json: debt.as_json(include: :debt_lines)
    #   if @debt
    #     render json: { message: "Debt# '#{@debt.debt_code}' get successfully", data: @debt, status: "success" }, status: :ok
    #   else
    #     render json: { error: @debt.errors }, status: :unprocessable_entity
    #   end
        result, message, @debt = DebtCrud.show_debt(@doc)
        if result
            object = {data: @debt, message: "Debt# '#{@debt.debt_code}' get successfully", status: "success"}
            respond_to_action(object)
        else 
            msg = message.blank? ? @debt.errors : message
            respond_to_error(msg)
        end
    end
  
    # def new
    #   @debt = Debt.new
    # end
  
    def create_or_save_debt      
    #   @debt = Debt.new(debt_params) 
    #         if @debt.save
    #             render json: {data: @debt, message: "Debt# #{@debt.debt_code} was successfully created.", status: "success"}, status: :created
    #           else
    #             render json: {error: "something went wrong from server", status: "error"}, status: :unprocessable_entity
    #           end
        create_record = @doc[:id].blank? ? true : false
        result, message, @debt = DebtCrud.create_or_save_debt(debt_params)
        if result
            # respond_to_action("show_debt") 
            object = {data: @debt, message: "Debt# #{@debt.debt_code} was successfully #{create_record ? "created" : "updated"}.", status: "success"}
            respond_to_action(object)
        else 
            # @debt.errors.add(message)
            msg = message.blank? ? @debt.errors : message
            respond_to_error(msg)
        end
    end
  
    # def edit_debt
    # end
  
    # def update_debt   
    #     if @debt.update(debt_params)
    #         render json: { message: "Debt# '#{@debt.debt_code}' updated successfully", data: @debt }, status: :ok
    #     else
    #         render json: { error: @debt.errors.full_messages}, status: :unprocessable_entity
    #     end
    # end
  
    def destroy_debt     
    #   if @debt.update(active: false)
    #     render json: { message: "Debt# '#{@debt.debt_code}' deleted successfully" }, status: :ok
    #   else
    #     render json: { errors: @debt.errors.full_messages }, status: :unprocessable_entity
    #   end
        result, message, @debt = DebtCrud.delete_debt(@doc)
        if result
            object = {data: @debt, message: "Debt# '#{@debt.debt_code}' deleted successfully", status: "success"}
            respond_to_action(object)
        else 
            msg = message.blank? ? @debt.errors : message
            respond_to_error(msg)
        end
    end
  
    private
    #   def set_debt
    #     begin
    #       @debt = Debt.find(params[:id])
    #     rescue Exception => e
    #       render json: { errors: "Something wrong in fetching debt." }, status: :unprocessable_entity
    #     end
    #   end
  
      def debt_params
        params.require(:body).permit(:id, :active,:user_id, :debt_code, :debt_name, :contact_no, :contact_email, :amount, :debt_amount, :interest_type, :interest_rate, :due_date, :status, :debt_type, :attachment_file_name, :payment_method, :description)
      end
  end