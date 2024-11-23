class CommonModule < ApplicationRecord
    def self.get_criteria_condition(criteria_data, byObject = nil)
        criteria_condition = ""
        criteria_condition_array = {}
        # Check if criteria_data is provided and not empty
        if !criteria_data.blank?
           # Ensure that criteria_data is permitted to avoid security issues
            criteria_data.permit! if criteria_data.respond_to?(:permit!)
        
            # Loop through the criteria_data and get each key-value pair
            criteria_data.each do |key, value|
                if byObject
                    search_value = get_search_value(key, value,byObject)
                    # criteria_condition_array << search_value 
                    criteria_condition_array = criteria_condition_array.merge(search_value)
                else
                    search_value = get_search_value(key, value,byObject)
                    criteria_condition += search_value 
                end
            end
        end
        return byObject ? criteria_condition_array : criteria_condition
    end
    def self.get_search_value(key, data, byObject = nil)
        case data[:type]
        when "Number"
            if(byObject)
                condition = {key => data[:value]}
            else
                condition = !data[:value].blank? ? "AND #{key} like '%#{data[:value]}%'" : ""
            end
            return condition;
        when "String"
            if(byObject)
                condition = {key => data[:value]}
            else
                condition = !data[:value].blank? ? "AND #{key} like '%#{data[:value]}%'" : ""
            end
            return condition;
        when "Lookup"
            condition = get_criteria_lookup_value(key, data, byObject)
            return condition;
        when "Date"
            condition = get_condition_for_date(key, data, byObject)
            # condition = "and #{key} = '#{data[:value]}'"
            return condition;
        else
            #nothing
            return "";
        end
    end
    def self.get_search_value_for_lookup(key, value, byObject, searchType)
        case searchType
        when "Number"
            if(byObject)
                condition = {key => value}
            else
                condition = !value.blank? ? "AND #{key} =  #{value}" : ""
            end
            return condition;
        when "String"
            if(byObject)
                condition = {key => value}
            else
                condition = !value.blank? ? "AND #{key} like '%#{value}%'" : ""
            end
            return condition;
        # when "Date"
        #     condition = get_condition_for_date(key, data, byObject)
        #     # condition = "and #{key} = '#{data[:value]}'"
        #     return condition;
        else
            #nothing
            return "";
        end
    end
    def self.get_criteria_lookup_value(key, data, byObject)
        search_value = data[:searchBy]
        searchType = data[:searchType]
        searchTypeLabel = data[:searchTypeLabel]
        case search_value
        when "dataTag"
            tag = data[:dataTag]
            value = data[:value]
            # if(byObject)
            #     condition = {[tag] => value}
            # else
            #     condition = !value.blank? ? "AND #{tag} like '%#{value}%'" : ""
            # end
            condition = get_search_value_for_lookup(tag, value, byObject, searchType)
            return condition;
        when "labelTag"
            tag = data[:labelTag]
            value = data[:labelValue]
            # if(byObject)
            #     condition = {[tag] => value}
            # else
            #     condition = !value.blank? ? "AND #{tag} like '%#{value}%'" : ""
            # end
            condition = get_search_value_for_lookup(tag, value, byObject, searchTypeLabel)
            return condition;
        when "both"
            data_tag = data[:dataTag]
            data_value = data[:value]
            label_tag = data[:labelTag]
            label_value = data[:labelValue]
            # if(byObject)
            #     condition = {[data_tag] => data_value, [label_tag] => label_value}
            # else
            #     condition = !value.blank? ? "AND #{data_tag} like '%#{data_value}%' AND #{label_tag} like '%#{label_value}%'" : ""
            # end
            data_cond  = get_search_value_for_lookup(data_tag, data_value, byObject, searchType)
            label_cond  = get_search_value_for_lookup(label_tag, label_value, byObject, searchTypeLabel)
            if byObject
                condition = {}
                condition = data_cond
                # condition << label_cond
                condition = condition.merge(label_cond)
            else    
                condition = ""
                condition = data_cond
                condition += " " + label_cond
            end
            return condition;
        else
            #nothing
            # if(byObject)
            #     condition = {key => data[:value]}
            # else
            #     condition = !data[:value].blank? ? "AND #{key} like '%#{data[:value]}%'" : ""
            # end
            condition = get_search_value_for_lookup(key, data[:value], byObject, searchType)
            return condition;
        end
        # return condition;
    end
    def self.get_condition_for_date(key, data, byObject)
        condition = {}
        if data[:value].blank?
            return condition
        end
        case data[:dateType]
        when "date"
            if byObject
                cond = {key => data[:value]}
                return cond;
            else
                cond = "AND #{key} = '#{data[:value]}'"
                return cond;
            end
        when "week"
            if byObject
                cond = {key => data[:value]}
                return cond;
            else
                cond = "AND #{key} between '#{data[:value]["0"]}' AND '#{data[:value]["1"]}'"
                return cond;
            end
        when "month"
            if byObject
                cond = {key => data[:value]}
                return cond;
            else
                year, month = data[:value].split("-")
                cond = "AND DATEPART(MONTH, #{key}) = #{month} AND DATEPART(YEAR, #{key}) = #{year}"
                return cond;
            end
            # SELECT * FROM transactions
            # WHERE DATEPART(MONTH, trans_date) = 10
            # AND DATEPART(YEAR, trans_date) = 2024;
            # return cond
        when "quarter"
            if byObject
                cond = {key => data[:value]}
                return cond;
            else
                dateHash = {"Q1" => 1, "Q2" => 2, "Q3" =>3, "Q4" => 4}
                year, quat = data[:value].split("-")
                cond = "AND DATEPART(QUARTER, #{key}) = #{dateHash[quat]} AND DATEPART(YEAR, #{key}) = #{year}"
                return cond
            end
        when "year"
            if byObject
                cond = {key => data[:value]}
                return cond;
            else
                cond = "AND DATEPART(YEAR, #{key}) = #{data[:value]}"
                return cond
            end
            # SELECT * FROM transactions
            # WHERE DATEPART(YEAR, trans_date) = 2024;
        when "range"
            if byObject
                cond = {key => data[:value]}
                return cond;
            else
                cond = "AND #{key} between '#{data[:value]["0"]}' AND '#{data[:value]["1"]}'"
                return cond;
            end
        # when "time"
        #     SELECT * FROM transactions
        #     WHERE CAST(trans_date AS TIME) = '12:00:00';
        # SELECT * FROM transactions
        # WHERE CAST(trans_date AS DATE) = '2024-10-24'
        # AND CAST(trans_date AS TIME) BETWEEN '08:00:00' AND '17:00:00';
        #     return ""
        else
            #nothing
            return {};
        end
        return condition
    end
end