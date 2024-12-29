class BankCrud < ApplicationRecord
    include General
    def self.get_banks(doc)
        begin
            criteria_data = doc[:criteriaSearchData]
            criteria_condition = CommonModule.get_criteria_condition(criteria_data)
            banks = Bank.all.where("active = 1 #{!criteria_condition.blank? ? criteria_condition : "" } ").order(id: :desc).limit(100)
            # banks = []
            # @banks.each do |bank| 
            #     banks << bank
            # end
            return true, "", banks
        rescue Exception => ex 
            return false, ex.to_s, nil
        end
    end
    def self.show_bank(doc)
        begin
            bank = Bank.find(doc[:id])
            # render json: bank.as_json(include: :bank_lines)
            return true, "", bank
        rescue Exception => ex 
            return false, ex.to_s, nil
        end
    end
    def self.delete_bank(doc)
        begin
            bank = Bank.find(doc[:id])
            # render json: bank.as_json(include: :bank_lines)
            bank.active = false 
            save_proc = Proc.new do
                bank.save!
            end
            bank.save_bank(save_proc) if bank.errors.empty?
            raise bank.errors.full_messages.join(",") if !bank.errors.empty?
            return true, "", bank
        rescue Exception => ex 
            return false, ex.to_s, nil
        end
    end
    def self.create_or_save_bank(doc)
        begin
            bank = find_or_create_bank(doc)
            save_proc = Proc.new do
                bank.save!
            end
            bank.save_bank(save_proc) if bank.errors.empty?
            raise bank.errors.full_messages.join(",") if !bank.errors.empty?
            return true, "", bank
        rescue Exception => ex 
            return false, ex.to_s, bank      
        end
    end
    
    private
    def self.find_or_create_bank(doc)
        begin
            bank = Bank.find_or_initialize_by(id: doc[:id])
            bank.assign_attributes(doc)
            return bank
        rescue Exception => ex
            raise ex.blank? ? "Something wrong in fetching bank." : ex.to_s
        end
      end
end