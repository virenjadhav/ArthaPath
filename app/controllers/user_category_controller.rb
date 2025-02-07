class UserCategoryController < ApplicationController
  def get_user_categories
    result, message, @categories  = UserCategoryCrud.get_user_categories(@doc)
    if result
        object = {data: @categories, message: "User Categories Reload successfully.", status: "success"}
        respond_to_action(object)
    else 
        msg = message.blank? ? "Something went wrong getting categories." : message
        respond_to_error(msg)
    end
end

def show_user_category
    result, message, @category = UserCategoryCrud.show_user_category(@doc)
    if result
        object = {data: @category, message: "Category# '#{@category.code}' get successfully", status: "success"}
        respond_to_action(object)
    else 
        msg = message.blank? ? @category.errors : message
        respond_to_error(msg)
    end
end
def create_or_save_category      
    create_record = @doc[:id].blank? ? true : false
    result, message, @category = UserCategoryCrud.create_or_save_category(user_category_params)
    if result
        object = {data: @category, message: "Category# #{@category.code} was successfully #{create_record ? "created" : "updated"}.", status: "success"}
        respond_to_action(object)
    else 
        msg = message.blank? ? @category.errors : message
        respond_to_error(msg)
    end
end
def destroy_user_category     
    result, message, @category = UserCategoryCrud.delete_user_category(@doc)
    if result
        object = {data: @category, message: "Category# '#{@category.code}' deleted successfully", status: "success"}
        respond_to_action(object)
    else 
        msg = message.blank? ? @category.errors : message
        respond_to_error(msg)
    end
end

private  
     def user_category_params
        params.require(:body).permit(:active, :name, :code, :type, :user_category_type, :ref_id, :description, :ref_code, :common_category_id, :common_category_code, :user_id)
      end
  # before_action :set_user_category, only: [:show_user_category, :edit_user_category, :update_user_category, :destroy_user_category]
    # def get_user_categories
    #     doc = @doc 
    #     user_id = @user_id
    #     # criteria_data = params[:criteriaSearchData]
    #     criteria_data = @doc["criteriaSearchData"]
    #     criteria_condition = CommonModule.get_criteria_condition(criteria_data, true)
    #     result, message, user_categories = UserCategoryCrud.get_user_categories(user_id, criteria_condition)
    #     if result 
    #         render json: {result: 'success', data: user_categories,message: message}, status: :ok
    #     else
    #         puts "error: #{message}"
    #         render json: {result: 'error', message: message, data: nil}, status: :unprocessable_entity
    #     end
    # end
  
    # def show_user_category
    # end
  
    # def new_user_category
    #   @user_category = UserCategory.new
    # end
  
    # def create_user_category
    #   @user_category = UserCategory.new(user_category_params)
    #   if @user_category.save
    #     render json: {data: @user_category, message: "Caterory# #{@user_category.code} was successfully created."}, status: :created
    #   else
    #     render json: {error: @user_category.errors.full_messages}, status: :unprocessable_entity
    #   end
    # end
  
    # def edit_user_category
    # end
  

    # def update_user_category
    #   if @user_category.update(user_category_params)
    #     render json: { message: "Category# '#{@user_category.code}' was successfully updated successfully", data: @user_category }, status: :ok
    #   else
    #     render json: { error: @user_category.errors.full_messages }, status: :unprocessable_entity
    #   end
    # end
  
    # def destroy_user_category
    #   if @user_category.update(active: false)
    #     render json: { message: "Category# '#{@user_category.code}' deleted successfully" }, status: :ok
    #   else
    #     render json: { errors: @user_category.errors.full_messages }, status: :unprocessable_entity
    #   end
    # end
  
    # private
    #   def set_user_category
    #     begin
    #       @user_category = UserCategory.find(params[:id])
    #     rescue Exception => e
    #       render json: { errors: "Something wrong in fetching user category." }, status: :unprocessable_entity
    #     end
    #   end
  
    #   def user_category_params
    #     params.require(:body).permit(:active, :name, :code, :type, :user_category_type, :ref_id, :description, :ref_code, :common_category_id, :common_category_code, :user_id)
    #   end
end