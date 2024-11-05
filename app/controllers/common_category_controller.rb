class CommonCategoryController < ApplicationController
  def save_common_category_to_user
    binding.pry
    render json: {message: 'save successfully.'}, status: :ok
  end
    def get_common_categories
        main_categories = CommonCategory.where(category_type: 'main', active: true)
    data = main_categories.map do |main_category|
      {
        id: main_category.id,
        key: main_category.id,
        name: main_category.name,
        code: main_category.code,
        type: main_category.type,
        category_type: main_category.category_type,
        ref_id: nil,
        children: CommonCategory.where(ref_id: main_category.id, category_type: 'sub', active: true).map do |sub_category|
          {
            id: sub_category.id,
            key: sub_category.id,
            name: sub_category.name,
            code: sub_category.code,
            type: sub_category.type,
            category_type: sub_category.category_type,
            ref_id: sub_category.ref_id
          }
        end
      }
    end
 # sub_categories: CommonCategory.where(ref_id: main_category.id, category_type: 'sub', active: true).map do |sub_category|
        #   {
        #     id: sub_category.id,
        #     name: sub_category.name,
        #     code: sub_category.code,
        #     type: sub_category.type,
        #     category_type: sub_category.category_type,
        #     ref_id: sub_category.ref_id
        #   }
        # end
    # render json: data
        render json: {data: data,message: 'Reload successfully.'}, status: :ok
    end
end