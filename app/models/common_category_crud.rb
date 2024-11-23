class CommonCategoryCrud < ApplicationRecord
    def self.get_all_active_common_categories
      main_categories = CommonCategory.where(category_type: 'main', active: true)
      data = main_categories.map do |main_category|
        {
          id: main_category.id,
          active: main_category.active,
          key: main_category.id,
          name: main_category.name,
          code: main_category.code,
          type: main_category.type,
          category_type: main_category.category_type,
          ref_id: nil,
          ref_code: nil,
          children: CommonCategory.where(ref_id: main_category.id, category_type: 'sub', active: true).map do |sub_category|
            {
              id: sub_category.id,
              active: sub_category.active,
              key: sub_category.id,
              name: sub_category.name,
              code: sub_category.code,
              type: sub_category.type,
              category_type: sub_category.category_type,
              ref_id: sub_category.ref_id,
              ref_code: sub_category.ref_code
            }
          end
        }
      end
      data
    end
  
    def self.get_all_active_common_categories_for_user(user_id)
      main_categories = CommonCategory.select('common_categories.*, ' \
                                              "CASE WHEN COALESCE(user_categories.active, 0) = 1 THEN 'true' ELSE 'false' END AS active_category")
                                      .joins("LEFT OUTER JOIN user_categories ON user_categories.common_category_id = common_categories.id AND user_categories.active = 1 and user_categories.user_id = #{user_id.blank? ? 0 : user_id}")
                                      .where(category_type: 'main', active: true)
      
      data = main_categories.map do |main_category|
        {
          id: main_category.id,
          key: main_category.id,
          name: main_category.name,
          code: main_category.code,
          type: main_category.type,
          category_type: main_category.category_type,
          active: main_category.active_category == 'true' ? true : false,
          ref_id: nil,
          ref_code: nil,
          children: CommonCategory.select('common_categories.*, ' \
                                          "CASE WHEN COALESCE(user_categories.active, 0) = 1 THEN 'true' ELSE 'false' END AS active_category")
                                   .joins("LEFT OUTER JOIN user_categories ON user_categories.common_category_id = common_categories.id AND user_categories.active = 1 and user_categories.user_id = #{user_id.blank? ? 0 : user_id}")
                                   .where(ref_id: main_category.id, category_type: 'sub', active: true).map do |sub_category|
            {
              id: sub_category.id,
              key: sub_category.id,
              name: sub_category.name,
              code: sub_category.code,
              type: sub_category.type,
              category_type: sub_category.category_type,
              active: sub_category.active_category == 'true' ? true : false,
              ref_id: sub_category.ref_id,
              ref_code: sub_category.ref_code
            }
          end
        }
      end
      data
    end
  end
  