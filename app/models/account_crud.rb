class AccountCrud < ApplicationRecord
    include General
    def self.get_accounts(doc)
        begin
            criteria_data = doc[:criteriaSearchData]
            criteria_condition = CommonModule.get_criteria_condition(criteria_data)
            accounts = Account.all.where("active = 1 #{!criteria_condition.blank? ? criteria_condition : "" } ").order(id: :desc).limit(100)
            # accounts = []
            # @accounts.each do |account| 
            #     accounts << account
            # end
            return true, "", accounts
        rescue Exception => ex 
            return false, ex.to_s, nil
        end
    end
    def self.show_account(doc)
        begin
            account = Account.find(doc[:id])
            # render json: account.as_json(include: :account_lines)
            return true, "", account
        rescue Exception => ex 
            return false, ex.to_s, nil
        end
    end
    def self.delete_account(doc)
        begin
            account = Account.find(doc[:id])
            # render json: account.as_json(include: :account_lines)
            account.active = false 
            save_proc = Proc.new do
                account.save!
            end
            account.save_account(save_proc) if account.errors.empty?
            raise account.errors.full_messages.join(",") if !account.errors.empty?
            return true, "", account
        rescue Exception => ex 
            return false, ex.to_s, nil
        end
    end
    def self.create_or_save_account(doc)
        begin
            account = find_or_create_account(doc)
            save_proc = Proc.new do
                account.save!
            end
            account.save_account(save_proc) if account.errors.empty?
            raise account.errors.full_messages.join(",") if !account.errors.empty?
            return true, "", account
        rescue Exception => ex 
            return false, ex.to_s, account      
        end
    end
    
    private
    def self.find_or_create_account(doc)
        begin
            account = Account.find_or_initialize_by(id: doc[:id])
            account.assign_attributes(doc)
            return account
        rescue Exception => ex
            raise ex.blank? ? "Something wrong in fetching account." : ex.to_s
        end
      end
end