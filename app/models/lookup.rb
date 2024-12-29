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
            case dataSourceName
            when "get_main_categories"
                if (!searchValue.blank?)
                    # records = MainCategory.where("#{filterKeyLabelName} like '%#{searchValue}%'")
                    records = UserCategory.where("#{filterKeyLabelName} like '%#{searchValue}%' and active = 1 and user_category_type = 'main' and code <> 'split'")
                else
                    records = UserCategory.where("active = 1 and code <> 'split' and user_category_type = 'main'")
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
                records = UserCategory.where("#{filterKeyLabelName} = '#{searchValue}' and active = 1").select("distinct type")
            else
                records = UserCategory.where(:active => true, ).select("distinct type")
            end
            return true, '', records
            when "get_banks"
                if (!searchValue.blank?)
                    # records = MainCategory.where("#{filterKeyLabelName} like '%#{searchValue}%'")
                    records = Bank.where("#{filterKeyLabelName} like '%#{searchValue}%' and active = 1")
                else
                    records = Bank.where(:active => true)
                end
                return true, '', records
            when "get_accounts"
                if (!searchValue.blank?)
                    # records = MainCategory.where("#{filterKeyLabelName} like '%#{searchValue}%'")
                    records = Account.where("#{filterKeyLabelName} like '%#{searchValue}%' and active = 1 ")
                else
                    records = Account.where(:active => true)
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
                    records = UserCategory.where("#{filterKeyLabelName} like '%#{searchValue}%' and active = 1 and user_category_type = 'main' and type='#{mainLookupValue}'  and code <> 'split'")
                else
                    records = UserCategory.where("active = 1 and user_category_type = 'main' and type = '#{mainLookupValue}' and code <> 'split'")
                end
                return true, '', records
            when "get_sub_categories"
                if (!searchValue.blank?)
                    # records = MainCategory.where("#{filterKeyLabelName} like '%#{searchValue}%'")
                    records = UserCategory.where("#{filterKeyLabelName} like '%#{searchValue}%' and active = 1 and user_category_type = 'sub' and ref_code = '#{mainLookupValue}'  and code <> 'split'")
                else
                    records = UserCategory.where("active = 1 and user_category_type = 'sub' and ref_code = '#{mainLookupValue}' and code <> 'split'")
                end
                return true, '', records
            else
                return false, "Data source Name are not match", nil
            end
            
        rescue Exception => ex
            return false, ex.to_s, nil
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
            case lookupType
            when "get_main_categories"
                records = UserCategory.where("#{labelColumnName} = '#{columnValue}' and active = 1 and user_category_type = 'main'").select("#{dataColumnName}, #{labelColumnName}")
                if !records.empty?
                    return true, '', records.first
                else
                    return false, 'Records not found!',nil
                end
            when "get_source_types"
                records = UserCategory.where("#{labelColumnName} = '#{columnValue}' and active = 1").select("distinct type").order(type: :asc)
                if !records.empty?
                    return true, '', records.first
                else
                    return false, 'Records not found!',nil
                end
            when "get_banks"
                records = Bank.where("#{labelColumnName} = '#{columnValue}' and active = 1").select("#{dataColumnName}, #{labelColumnName}")
                if !records.empty?
                    return true, '', records.first
                else
                    return false, 'Records not found!',nil
                end
            when "get_accounts"
                records = Account.where("#{labelColumnName} = '#{columnValue}' and active = 1").select("#{dataColumnName}, #{labelColumnName}")
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
            case lookupType
            when "get_main_categories"
                records = UserCategory.where("#{labelColumnName} = '#{columnValue}' and active = 1 and user_category_type = 'main' and type='#{mainLookupValue}'").select("#{dataColumnName}, #{labelColumnName}")
                if !records.empty?
                    return true, '', records.first
                else
                    return false, 'Records not found!',nil
                end
            when "get_sub_categories"
                records = UserCategory.where("#{labelColumnName} = '#{columnValue}' and active = 1 and user_category_type = 'sub' and ref_code = '#{mainLookupValue}'").select("#{dataColumnName}, #{labelColumnName}")
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
  