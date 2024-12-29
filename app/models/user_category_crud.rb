# require_dependency 'transaction_helper'
class UserCategoryCrud < ApplicationRecord
    # require 'transaction_helper'
    include ModelHelper
    def self.get_user_categories(user_id, criteria_condition)
        begin 
            if !criteria_condition.blank?
                main_category_id = criteria_condition["main_category_id"]
                main_category_code = criteria_condition["main_category_code"]
                sub_category_id = criteria_condition["sub_category_id"]
                sub_category_code = criteria_condition["sub_category_code"]
            end
            main_criteria_condition = "user_id = #{user_id} and active = 1 and user_category_type = 'main' #{main_category_id.blank? ? "" : "and id = #{main_category_id.to_i}"} #{main_category_code.blank? ? "" : " and code = '#{main_category_code}'"}"
            main_categories = UserCategory.where(main_criteria_condition)
            data = main_categories.map do |main_category|
                {
                id: main_category.id,
                key: main_category.id,
                name: main_category.name,
                code: main_category.code,
                type: main_category.type,
                user_category_type: main_category.user_category_type,
                active: main_category.active,
                ref_id: nil,
                ref_code: nil,
                #   children: CommonCategory.select('common_categories.*, ' \
                #                                   "CASE WHEN COALESCE(user_categories.active, 0) = 1 THEN 'true' ELSE 'false' END AS active_category")
                #                            .joins("LEFT OUTER JOIN user_categories ON user_categories.common_category_id = common_categories.id AND user_categories.active = 1 and user_categories.user_id = #{user_id.blank? ? 0 : user_id}")
                #                            .where(ref_id: main_category.id, category_type: 'sub', active: true).map do |sub_category|
                children: UserCategory.where("user_id = #{user_id} and active = 1 and user_category_type = 'sub' and ref_id = #{main_category.id} #{sub_category_id.blank? ? "" : "and id = #{sub_category_id.to_i}"} #{sub_category_code.blank? ? "" : " and code = '#{sub_category_code}'"}").map do |sub_category|
                    {
                    id: sub_category.id,
                    key: sub_category.id,
                    name: sub_category.name,
                    code: sub_category.code,
                    type: sub_category.type,
                    user_category_type: sub_category.user_category_type,
                    active: sub_category.active,
                    ref_id: sub_category.ref_id,
                    ref_code: sub_category.ref_code
                    }
                end
                }
            end
            return true, 'reload successfully', data
        rescue Exception => ex 
            return false, ex.to_s, nil
        end
    end

    def self.create_common_category_for_user(doc)
        # ActiveRecord::Base.transaction do
        operations = Proc.new do
          doc.each do |value|
            # Use Proc to handle main category updates
            process_category = Proc.new do |category, active|
              category.update(active: active)
            end
            
            # Fetch or create main category
            main_category = UserCategory.find_or_initialize_by(
              common_category_code: value["code"],
              user_category_type: value["category_type"],
              user_id: value["user_id"]
            )
    
            # Check if main category is active/inactive, and if the active status needs to change
            if main_category.persisted?
              # Update existing main category
              if main_category.active != value["active"]
                process_category.call(main_category, value["active"])
              end
            else
              # New main category creation
              main_category = create_user_category(value)
              process_category.call(main_category, value["active"])
            end
    
            # Handle subcategories only if main category exists and is updated
            if value["children"].present?
              value["children"].each do |child|
                sub_category = UserCategory.find_or_initialize_by(
                    common_category_code: child["code"],
                    user_category_type: child["category_type"],
                    ref_id: main_category.id,
                    user_id: child["user_id"]
                )
    
                # Update subcategory active status based on main category
                if sub_category.persisted?
                  if sub_category.active != child["active"]
                    process_category.call(sub_category, child["active"])
                  end
                else
                  # New subcategory creation with the main category as reference
                  sub_category = create_user_category(child, main_category.id, main_category.code)
                  process_category.call(sub_category, child["active"])
                end
              end
            end
          end
        end
        result, message = ModelHelper.save_transaction(operations)
        raise message unless result == true
        return true, 'Common Category in User Category is Updated.'
      rescue => e
        return false, e.message
      end
    
      def self.create_user_category(data, main_category_id = nil, main_category_code = nil)
        common_category = CommonCategory.find_by(code: data["code"], id: data["id"])
        raise "Common Category #{data['code']} not found!" unless common_category
    
        category = UserCategory.new(
          active: true,
          name: common_category.name,
          code: common_category.code,
          user_category_type: common_category.category_type,
          common_category_id: common_category.id,
          common_category_code: common_category.code,
          ref_id: main_category_id,
          ref_code: main_category_code,
          user_id: data["user_id"],
          type: common_category.type
        )
        category.save!
        category
      end
end