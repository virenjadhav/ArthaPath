class CommonModule < ApplicationRecord
    def self.get_criteria_condition(criteria_data)
        criteria_condition = ""
        # Check if criteria_data is provided and not empty
        if !criteria_data.blank?
           # Ensure that criteria_data is permitted to avoid security issues
            criteria_data.permit! if criteria_data.respond_to?(:permit!)
        
            # Loop through the criteria_data and get each key-value pair
            criteria_data.each do |key, value|
                search_value = get_search_value(key, value)
                criteria_condition += search_value 
            end
        end
        return criteria_condition
    end
    def self.get_search_value(key, data)
        case data[:type]
        when "Number"
            condition = !data[:value].blank? ? "AND #{key} like '%#{data[:value]}%'" : ""
            return condition;
        when "String"
            condition = !data[:value].blank? ? "AND #{key} like '%#{data[:value]}%'" : ""
            return condition;
        when "Date"
            condition = get_condition_for_date(key, data)
            # condition = "and #{key} = '#{data[:value]}'"
            return condition;
        else
            #nothing
            return "";
        end
    end
    def self.get_condition_for_date(key, data)
        condition = ""
        if data[:value].blank?
            return condition
        end
        case data[:dateType]
        when "date"
            cond = "AND #{key} = '#{data[:value]}'"
            return cond;
        when "week"
            cond = "AND #{key} between '#{data[:value]["0"]}' AND '#{data[:value]["1"]}'"
            return cond;
        when "month"
            year, month = data[:value].split("-")
            cond = "AND DATEPART(MONTH, #{key}) = #{month} AND DATEPART(YEAR, #{key}) = #{year}"
            # SELECT * FROM transactions
            # WHERE DATEPART(MONTH, trans_date) = 10
            # AND DATEPART(YEAR, trans_date) = 2024;
            return cond
        when "quarter"
            dateHash = {"Q1" => 1, "Q2" => 2, "Q3" =>3, "Q4" => 4}
            year, quat = data[:value].split("-")
            cond = "AND DATEPART(QUARTER, #{key}) = #{dateHash[quat]} AND DATEPART(YEAR, #{key}) = #{year}"
            return cond
        when "year"
            # SELECT * FROM transactions
            # WHERE DATEPART(YEAR, trans_date) = 2024;
            cond = "AND DATEPART(YEAR, #{key}) = #{data[:value]}"
            return cond
        when "range"
            cond = "AND #{key} between '#{data[:value]["0"]}' AND '#{data[:value]["1"]}'"
            return cond;
        # when "time"
        #     SELECT * FROM transactions
        #     WHERE CAST(trans_date AS TIME) = '12:00:00';
        # SELECT * FROM transactions
        # WHERE CAST(trans_date AS DATE) = '2024-10-24'
        # AND CAST(trans_date AS TIME) BETWEEN '08:00:00' AND '17:00:00';
        #     return ""
        else
            #nothing
            return "";
        end
        return condition
    end
end