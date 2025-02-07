class CommonCategoryController < ApplicationController
  # after_action :get_common_categories, :only => [:save_common_category_to_user]
  def save_common_category_to_user
    doc = @doc["updatedItem"]
    result, message = UserCategoryCrud.create_common_category_for_user(doc)
    if result
      get_common_categories
     else 
      msg = message.blank? ? "Something went wrong getting categories." : message
      respond_to_error(msg)
    end

  end
    def get_common_categories
      doc = @doc
      user_id = doc["user_id"] ? doc["user_id"] : nil
      # common_categories = CommonCategoryCrud.get_all_active_common_categories_for_user(user_id)
      # render json: {data: common_categories,message: 'Reload successfully.'}, status: :ok
      result, message, @common_categories = CommonCategoryCrud.get_all_active_common_categories_for_user(user_id)
      if result
        object = {data: @common_categories, message: "Reload successfully.", status: "success"}
        respond_to_action(object)
      else 
          msg = message.blank? ? "Something went wrong getting categories." : message
          respond_to_error(msg)
      end
    end
end