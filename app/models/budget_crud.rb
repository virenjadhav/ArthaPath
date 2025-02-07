class BudgetCrud < ApplicationRecord
    include General
    def self.get_budgets(doc)
        begin
            criteria_data = doc[:criteriaSearchData]
            criteria_condition = CommonModule.get_criteria_condition(criteria_data)
            budgets = Budget.all.where("active = 1 #{!criteria_condition.blank? ? criteria_condition : "" } ").order(id: :desc).limit(100)
            # budgets = []
            # @budgets.each do |budget| 
            #     budgets << budget
            # end
            return true, "", budgets
        rescue Exception => ex 
            return false, ex.to_s, nil
        end
    end
    def self.show_budget(doc)
        begin
            budget = Budget.find(doc[:id])
            # render json: budget.as_json(include: :budget_lines)
            return true, "", budget
        rescue Exception => ex 
            return false, ex.to_s, nil
        end
    end
    def self.delete_budget(doc)
        begin
            budget = Budget.find(doc[:id])
            # render json: budget.as_json(include: :budget_lines)
            budget.active = false 
            save_proc = Proc.new do
                budget.save!
            end
            budget.save_transaction(save_proc) if budget.errors.empty?
            raise budget.errors.full_messages.join(",") if !budget.errors.empty?
            return true, "", budget
        rescue Exception => ex 
            return false, ex.to_s, nil
        end
    end
    def self.create_or_save_budget(doc)
        begin
            # budget = Budget.find_or_initialize_by(id: )
            budget = find_or_create_budget(doc)
            save_proc = Proc.new do
                budget.save!
            end
            budget.save_transaction(save_proc) if budget.errors.empty?
            raise budget.errors.full_messages.join(",") if !budget.errors.empty?
            return true, "", budget
        rescue Exception => ex 
            return false, ex.to_s, budget      
        end
    end
    
    private
    def self.find_or_create_budget(doc)
        begin
            budget = Budget.find_or_initialize_by(id: doc[:id])
            budget.assign_attributes(doc)
            return budget
        rescue Exception => ex
            raise ex.blank? ? "Something wrong in fetching budget." : ex.to_s
        end
      end
end