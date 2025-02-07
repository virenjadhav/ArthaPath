class DebtsController < ApplicationController
    # before_action :set_debt, only: [:show_debt, :edit_debt, :update_debt, :destroy_debt]
    def get_debts
    #   render json: {data: debts, message: 'Debts Reload successfully.'}, status: :ok 
    result, message, @debts  = DebtCrud.get_debts(@doc)
        if result
            object = {data: @debts.as_json(include: :debt_lines), message: "Debts Reload successfully.", status: "success"}
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
        @debt_data = @debt.as_json(include: :debt_lines)
        
        if result
            object = {data: @debt_data, message: "Debt# '#{@debt.debt_code}' get successfully", status: "success"}
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
    def get_debt_lines
        result, message, @debt_lines  = DebtCrud.get_debt_lines(@doc)
        # debt = Debt.find_by(:id => @debt_lines.first.debt.id)
        # @debt = debt.as_json(include: :debt_lines)
        @debt = nil
        if @debt_lines.present?
            debt = Debt.find_by(id: @debt_lines.first.debt_id)
             # Include only active debt lines in the JSON response
            @debt = debt.as_json(methods: :active_debt_lines)
        end
        if result
            object = {data: @debt_lines, mainRecord: @debt, message: "Debt Lines Reload successfully.", status: "success"}
            respond_to_action(object)
        else 
            msg = message.blank? ? "Something went wrong getting debt lines." : message
            respond_to_error(msg)
        end
    end
      
    def show_debt_line
        result, message, @debt_line = DebtCrud.show_debt_line(@doc)
        if result
            object = {data: @debt_line, message: "Debt# '#{@debt_line.debt_code}' Line #{@debt_line.serial_no}  get successfully", status: "success"}
            respond_to_action(object)
        else 
            msg = message.blank? ? @debt_line.errors : message
            respond_to_error(msg)
        end
    end    
    def create_or_save_debt_line    
        create_record = @doc[:id].blank? ? true : false
        result, message, @debt_line = DebtCrud.create_or_save_debt_line(@doc)
        # debt = Debt.find_by(:id => @debt_line.first.debt.id)
        # @debt = debt.as_json(include: :debt_lines)
        @debt = nil
        if @debt_line.present?
            debt = Debt.find_by(id: @debt_line.debt_id)
             # Include only active debt lines in the JSON response
            @debt = debt.as_json(methods: :active_debt_lines)
        end
        if result
            # respond_to_action("show_debt") 
            object = {data: @debt_line, mainRecord: @debt, message: "Debt# '#{@debt_line.debt_code}' Line #{@debt_line.serial_no} was successfully #{create_record ? "created" : "updated"}.", status: "success"}
            respond_to_action(object)
        else 
            # @debt.errors.add(message)
            msg = message.blank? ? @debt_line.errors : message
            respond_to_error(msg)
        end
    end
    def destroy_debt_line
        result, message, @debt_line = DebtCrud.delete_debt_line(@doc)
        # debt = Debt.find_by(:id => @debt_lines.first.debt.id)
        # @debt = debt.as_json(include: :debt_lines)
        @debt = nil
        if @debt_line.present?
            debt = Debt.find_by(id: @debt_line.debt_id)
             # Include only active debt lines in the JSON response
            @debt = debt.as_json(methods: :active_debt_lines)
        end
        if result
            object = {data: @debt_line, mainRecord: @debt, message: "Debt# '#{@debt_line.debt_code}' Line #{@debt_line.serial_no} deleted successfully", status: "success"}
            respond_to_action(object)
        else 
            msg = message.blank? ? @debt_line.errors : message
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
        # params.require(:body).permit(:id, :active,:user_id, :debt_code, :debt_name, :contact_no, :contact_email, :amount, :debt_amount, :interest_type, :interest_rate, :due_date, :status, :debt_type, :attachment_file_name, :payment_method, :description, :pay_date, :account_id, :account_code, :intial_paid_amount, :initial_amount, :total_amount_without_interest, :interest_amount)
        allowed_attributes = Debt.column_names.map(&:to_sym) # from debt table
        # if you don't want to add all colunms  in allowed attributes then you can write like this : 
        # allowed_attributes = [:id, :active, :amount] like this all you want to indivisual column
        extra_attributes = [:account_id, :account_code, :payment_method]
        allowed_attributes = allowed_attributes + extra_attributes
        @doc&.transform_keys(&:to_sym)&.slice(*allowed_attributes)
      end
    #   def debt_line_params
    #     params.require(:body).permit(:id, :active,:user_id, :transaction_id, :debt_id, :debt_code, :account_id, :account_code, :main_category_id, :main_category_code, :sub_category_id, :sub_category_code, :amount, :pay_date, :debt_date, :payment_method, :serial_no, :lock_version, :parent_id, :parent_code)
    #   end
  end