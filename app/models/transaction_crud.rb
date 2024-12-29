class TransactionCrud < ApplicationRecord
    include General
    def self.get_transactions(doc)
        begin
            criteria_data = doc[:criteriaSearchData]
            criteria_condition = CommonModule.get_criteria_condition(criteria_data)
            transactions = Transaction.all.where("active = 1 #{!criteria_condition.blank? ? criteria_condition : "" } ").order(id: :desc).limit(100)
            # transactions = []
            # @transactions.each do |transaction| 
            #     transactions << transaction
            # end
            return true, "", transactions
        rescue Exception => ex 
            return false, ex.to_s, nil
        end
    end
    def self.show_transaction(doc)
        begin
            transaction = Transaction.find(doc[:id])
            # render json: transaction.as_json(include: :transaction_lines)
            return true, "", transaction
        rescue Exception => ex 
            return false, ex.to_s, nil
        end
    end
    def self.delete_transaction(doc)
        begin
            transaction = Transaction.find(doc[:id])
            # render json: transaction.as_json(include: :transaction_lines)
            transaction.active = false 
            save_proc = Proc.new do
                transaction.save!
            end
            transaction.save_transaction(save_proc) if transaction.errors.empty?
            raise transaction.errors.full_messages.join(",") if !transaction.errors.empty?
            return true, "", transaction
        rescue Exception => ex 
            return false, ex.to_s, nil
        end
    end
    def self.create_or_save_transaction(doc)
        begin
            transaction = find_or_create_transaction(doc)
            save_proc = Proc.new do
                transaction.save!
            end
            transaction.save_transaction(save_proc) if transaction.errors.empty?
            raise transaction.errors.full_messages.join(",") if !transaction.errors.empty?
            return true, "", transaction
        rescue Exception => ex 
            return false, ex.to_s, transaction      
        end
    end
    
    private
    def self.find_or_create_transaction(doc)
        begin
            transaction = Transaction.find_or_initialize_by(id: doc[:id])
            if transaction.new_record?
                transaction.set_trans_no
            end
            transaction.assign_attributes(doc)
            return transaction
        rescue Exception => ex
            raise ex.blank? ? "Something wrong in fetching transaction." : ex.to_s
        end
      end
    def self.auto_generated_trans_no
        max_trans_no = Transaction.maximum(:trans_no) || 5000
        trans_no = max_trans_no + 1
        return trans_no
    end
end