class Lookup < ApplicationRecord
    include ModelHelper
    def self.get_lookup_records(doc)
        begin 
            # dataSourceName = params[:dataSourceName]
            # filterKeyLabelName = params[:filterKeyLabelName]
            # searchValue = params[:searchValue]
            dataSourceName = doc["dataSourceName"]
            filterKeyLabelName = doc["filterKeyLabelName"]
            searchValue = doc["searchValue"]
            user_id = doc["user_id"]
            case dataSourceName
            when "get_main_categories"
                if (!searchValue.blank?)
                    # records = MainCategory.where("#{filterKeyLabelName} like '%#{searchValue}%'")
                    records = UserCategory.where("#{filterKeyLabelName} like '%#{searchValue}%' and active = 1 and user_id = #{user_id} and user_category_type = 'main' and code <> 'split'")
                else
                    records = UserCategory.where("active = 1 and user_id = #{user_id} and code <> 'split' and user_category_type = 'main'")
                end
                return true, '', records
            # when "get_sub_categories"
            #     if (!searchValue.blank?)
            #         # records = MainCategory.where("#{filterKeyLabelName} like '%#{searchValue}%'")
            #         records = UserCategory.where("#{filterKeyLabelName} like '%#{searchValue}%' and active = 1 and user_category_type = 'sub'")
            #     else
            #         records = UserCategory.where(:active => true, :user_category_type => 'sub')
            #     end
            #     return true, '', records
        when "get_source_types"
            if (!searchValue.blank?)
                # records = MainCategory.where("#{filterKeyLabelName} like '%#{searchValue}%'")
                records = UserCategory.where("#{filterKeyLabelName} = '#{searchValue}' and active = 1 and user_id = #{user_id}").select("distinct type")
            else
                records = UserCategory.where(:active => true, :user_id => user_id ).select("distinct type")
            end
            return true, '', records
            when "get_banks"
                if (!searchValue.blank?)
                    # records = MainCategory.where("#{filterKeyLabelName} like '%#{searchValue}%'")
                    records = Bank.where("#{filterKeyLabelName} like '%#{searchValue}%' and active = 1 and user_id = #{user_id}")
                else
                    records = Bank.where(:active => true, :user_id => user_id)
                end
                return true, '', records
            when "get_accounts"
                if (!searchValue.blank?)
                    # records = MainCategory.where("#{filterKeyLabelName} like '%#{searchValue}%'")
                    records = Account.where("#{filterKeyLabelName} like '%#{searchValue}%' and active = 1  and user_id = #{user_id}")
                else
                    records = Account.where(:active => true, :user_id => user_id)
                end
                return true, '', records
            else
                return false, "Data source Name are not match", nil
            end
            
        rescue Exception => ex
            return false, ex.to_s, nil
        end
    end

    def self.get_dependent_lookup_records(doc)
        begin 
            dataSourceName = doc["dataSourceName"]
            filterKeyLabelName = doc["filterKeyLabelName"]
            searchValue = doc["searchValue"]
            mainLookupName = doc["mainLookupName"]
            mainLookupValue = doc["mainLookupValue"]
            user_id = doc["user_id"]
            case dataSourceName
            # when "get_main_categories"
            #     if (!searchValue.blank?)
            #         # records = MainCategory.where("#{filterKeyLabelName} like '%#{searchValue}%'")
            #         records = UserCategory.where("#{filterKeyLabelName} like '%#{searchValue}%' and active = 1 and user_category_type = 'main'")
            #     else
            #         records = UserCategory.where(:active => true, :user_category_type => 'main')
            #     end
            #     return true, '', records
            when "get_main_categories"
                if (!searchValue.blank?)
                    # records = MainCategory.where("#{filterKeyLabelName} like '%#{searchValue}%'")
                    records = UserCategory.where("#{filterKeyLabelName} like '%#{searchValue}%' and active = 1 and user_id = #{user_id} and user_category_type = 'main' and type='#{mainLookupValue}'  and code <> 'split'")
                else
                    records = UserCategory.where("active = 1 and user_id = #{user_id} and user_category_type = 'main' and type = '#{mainLookupValue}' and code <> 'split'")
                end
                return true, '', records
            when "get_sub_categories"
                if (!searchValue.blank?)
                    # records = MainCategory.where("#{filterKeyLabelName} like '%#{searchValue}%'")
                    records = UserCategory.where("#{filterKeyLabelName} like '%#{searchValue}%' and active = 1 and user_id = #{user_id} and user_category_type = 'sub' and ref_code = '#{mainLookupValue}'  and code <> 'split'")
                else
                    records = UserCategory.where("active = 1 and user_id = #{user_id} and user_category_type = 'sub' and ref_code = '#{mainLookupValue}' and code <> 'split'")
                end
                return true, '', records
            when "get_link_models"
                records = get_link_model_records(doc)
                return true, '', records
            else
                return false, "Data source Name are not match", nil
            end
            
        rescue Exception => ex
            return false, ex.to_s, nil
        end
    end
    def self.get_link_model_records(doc)
        dataSourceName = doc["dataSourceName"]
        filterKeyLabelName = doc["filterKeyLabelName"]
        searchValue = doc["searchValue"]
        mainLookupName = doc["mainLookupName"]
        mainLookupValue = doc["mainLookupValue"]
        user_id = doc["user_id"]
        case mainLookupValue
        when "DEBT"
            if (!searchValue.blank?)
                records = Debt.where("debt_code like '%#{searchValue}%' and active = 1  and user_id = #{user_id} and status <> 'C'").select("debt_code as link_model_code, debt_name as link_model_name, amount as total_amount, paid_amount, debt_amount as remaining_amount, debt_type")
            else
                records = Debt.where("active = 1  and user_id = #{user_id} and status <> 'C'").select("debt_code as link_model_code, debt_name as link_model_name, amount as total_amount, paid_amount, debt_amount as remaining_amount, debt_type")
            end
            return records
        else
            #nothing
            raise "Linked Model are not match!"
        end
    end
    def self.validate_link_models(doc)
        lookupType = doc["lookupType"]
        labelColumnName = doc["filterKeyLabelName"]
        dataColumnName = doc["filterKeyDataName"]
        columnValue = doc["value"]  
        mainLookupName = doc["mainLookupName"]
        mainLookupValue = doc["mainLookupValue"]   
        user_id = doc["user_id"]
        columnValue = doc["value"]   
        case mainLookupValue
        when "DEBT"
            records = Debt.where("active = 1 and user_id = #{user_id} and debt_code = '#{columnValue}' and status <> 'C'").select("debt_code as link_model_code, debt_name as link_model_name, amount as total_amount, paid_amount, debt_amount as remaining_amount, debt_type")
            return records
        else
            #nothing
            raise "Linked Model are not validate!"
        end
    end

    def self.validate_lookup(doc)
        begin 
            # lookupType = params[:lookupType]
            # labelColumnName = params[:filterKeyLabelName]
            # dataColumnName = params[:filterKeyDataName]
            # columnValue = params[:value]
            lookupType = doc["lookupType"]
            labelColumnName = doc["filterKeyLabelName"]
            dataColumnName = doc["filterKeyDataName"]
            columnValue = doc["value"]   
            user_id = doc["user_id"]         
            case lookupType
            when "get_main_categories"
                records = UserCategory.where("#{labelColumnName} = '#{columnValue}' and active = 1 and user_id = #{user_id} and user_category_type = 'main'").select("#{dataColumnName}, #{labelColumnName}")
                if !records.empty?
                    return true, '', records.first
                else
                    return false, 'Records not found!',nil
                end
            when "get_source_types"
                records = UserCategory.where("#{labelColumnName} = '#{columnValue}' and active = 1 and user_id = #{user_id}").select("distinct type").order(type: :asc)
                if !records.empty?
                    return true, '', records.first
                else
                    return false, 'Records not found!',nil
                end
            when "get_banks"
                records = Bank.where("#{labelColumnName} = '#{columnValue}' and active = 1 and user_id = #{user_id}").select("#{dataColumnName}, #{labelColumnName}")
                if !records.empty?
                    return true, '', records.first
                else
                    return false, 'Records not found!',nil
                end
            when "get_accounts"
                records = Account.where("#{labelColumnName} = '#{columnValue}' and active = 1  and user_id = #{user_id}").select("#{dataColumnName}, #{labelColumnName}")
                if !records.empty?
                    return true, '', records.first
                else
                    return false, 'Records not found!',nil
                end
            else
                return false, 'Lookup type are not matched.',nil
            end
        rescue Exception => ex
            return false, ex.to_s, nil
        end
    end
    def self.validate_dependent_lookup(doc)
        begin 
            lookupType = doc["lookupType"]
            labelColumnName = doc["filterKeyLabelName"]
            dataColumnName = doc["filterKeyDataName"]
            columnValue = doc["value"]  
            mainLookupName = doc["mainLookupName"]
            mainLookupValue = doc["mainLookupValue"]   
            user_id = doc["user_id"]
            case lookupType
            when "get_main_categories"
                records = UserCategory.where("#{labelColumnName} = '#{columnValue}' and active = 1 and user_id = #{user_id} and user_category_type = 'main' and type='#{mainLookupValue}'").select("#{dataColumnName}, #{labelColumnName}")
                if !records.empty?
                    return true, '', records.first
                else
                    return false, 'Records not found!',nil
                end
            when "get_sub_categories"
                records = UserCategory.where("#{labelColumnName} = '#{columnValue}' and active = 1 and user_id = #{user_id} and user_category_type = 'sub' and ref_code = '#{mainLookupValue}'").select("#{dataColumnName}, #{labelColumnName}")
                if !records.empty?
                    return true, '', records.first
                else
                    return false, 'Records not found!',nil
                end
            when "get_link_models"
                records = validate_link_models(doc)
                if !records.empty?
                    return true, '', records.first
                else
                    return false, 'Records not found!',nil
                end
            else
                return false, 'Lookup type are not matched.',nil
            end
        rescue Exception => ex
            return false, ex.to_s, nil
        end
    end
end
  