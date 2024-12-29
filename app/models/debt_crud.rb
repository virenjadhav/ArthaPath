class DebtCrud < ApplicationRecord
    include General
    def self.get_debts(doc)
        begin
            criteria_data = doc[:criteriaSearchData]
            criteria_condition = CommonModule.get_criteria_condition(criteria_data)
            debts = Debt.all.where("active = 1 #{!criteria_condition.blank? ? criteria_condition : "" } ").order(id: :desc).limit(100)
            # debts = []
            # @debts.each do |debt| 
            #     debts << debt
            # end
            return true, "", debts
        rescue Exception => ex 
            return false, ex.to_s, nil
        end
    end
    def self.show_debt(doc)
        begin
            debt = Debt.find(doc[:id])
            # render json: debt.as_json(include: :debt_lines)
            return true, "", debt
        rescue Exception => ex 
            return false, ex.to_s, nil
        end
    end
    def self.delete_debt(doc)
        begin
            debt = Debt.find(doc[:id])
            # render json: debt.as_json(include: :debt_lines)
            debt.active = false 
            save_proc = Proc.new do
                debt.save!
            end
            debt.save_transaction(save_proc) if debt.errors.empty?
            raise debt.errors.full_messages.join(",") if !debt.errors.empty?
            return true, "", debt
        rescue Exception => ex 
            return false, ex.to_s, nil
        end
    end
    def self.create_or_save_debt(doc)
        begin
            # debt = Debt.find_or_initialize_by(id: )
            debt = find_or_create_debt(doc)
            save_proc = Proc.new do
                debt.save!
            end
            debt.save_transaction(save_proc) if debt.errors.empty?
            raise debt.errors.full_messages.join(",") if !debt.errors.empty?
            return true, "", debt
        rescue Exception => ex 
            return false, ex.to_s, debt      
        end
    end
    
    private
    def self.find_or_create_debt(doc)
        begin
            debt = Debt.find_or_initialize_by(id: doc[:id])
            if debt.new_record?
                code = get_debt_code(doc) 
                debt.debt_code = code
            end
            debt.assign_attributes(doc)
            
            return debt
        rescue Exception => ex
            raise ex.blank? ? "Something wrong in fetching debt." : ex.to_s
        end
      end
      def self.get_debt_code(doc)
        code = doc["debt_code"]
        if code.blank?
            code = auto_generated_debt_code
            return code
        else
            # validate code it is already present or not if it is already present then give error to user.
            data = Debt.where(:debt_code => code) 
            if data.blank?
                return code
            else
                raise "Code# #{code} already exist. Please type unique Debt Code."
            end
        end
    end
    def self.auto_generated_debt_code
        # condition = "active = 1 and TRY_CAST(debt_code AS BIGINT) IS NOT NULL"
        condition = "active = 1 AND debt_code like '#{DEBT_CODE}-%' AND TRY_CAST(SUBSTRING(debt_code, CHARINDEX('-', debt_code) + 1, LEN(debt_code)) AS BIGINT) IS NOT NULL"
        debts = Debt.where(condition).select("MAX(TRY_CAST(SUBSTRING(debt_code, CHARINDEX('-', debt_code) + 1, LEN(debt_code)) AS BIGINT)) AS max_code")
        if debts.blank? or debts.first.max_code.blank?
            code = DEBT_CODE.to_s + "-"+ DEBT_CODE_NO.to_s
        else
            max_code = debts.first.max_code + 1
            code = DEBT_CODE.to_s + "-" + max_code.to_s
        end
        return code
    end
end