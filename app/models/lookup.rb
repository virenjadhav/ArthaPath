class Lookup < ApplicationRecord
    def self.get_lookup_records(params)
        begin 
            dataSourceName = params[:dataSourceName]
            filterKeyLabelName = params[:filterKeyLabelName]
            searchValue = params[:searchValue]
            case dataSourceName
            when "get_main_categories"
                if (!searchValue.blank?)
                    records = MainCategory.where("#{filterKeyLabelName} like '%#{searchValue}%'")
                else
                    records = MainCategory.all
                end
                return true, '', records
            else
                return false, "Data source Name are not match", nil
            end
            
        rescue Exception => ex
            return false, ex.to_s, nil
        end
    end

    def self.validate_lookup(params)
        begin 
            lookupType = params[:lookupType]
            labelColumnName = params[:filterKeyLabelName]
            dataColumnName = params[:filterKeyDataName]
            columnValue = params[:value]
            case lookupType
            when "get_main_categories"
                records = MainCategory.where("#{labelColumnName} = '#{columnValue}'").select("#{dataColumnName}, #{labelColumnName}")
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
  