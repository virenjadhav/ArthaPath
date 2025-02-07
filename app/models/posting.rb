class Posting < ApplicationRecord
    include General
    include ModelHelper
    # def self.run_posting_for_linked_model(transaction, link_model)

    # end
    def self.run_posting_from_transaction(transaction)
        binding.pry
        log_file_path = Dir.getwd + "/public/log/transaction_log/#{transaction.user_id}/"  + Time.new.strftime('%Y%m')+ "/" + Time.new.strftime('%Y%m%d')
        FileUtils.mkdir_p(log_file_path) unless File.exist?(log_file_path)
        log_file_name = log_file_path + "/transaction_log_#{Time.now().strftime('%Y%m%d-%H%M%S')}.txt"
        log_file = File.open(log_file_name, "w")
        log_file.puts("Start Time - #{Time.now.strftime("%Y-%m-%d %H:%M:%S")}\n")   
        begin
            run_posting_for_account(transaction, log_file)
            case transaction.source_type.upcase
            when 'INCOME'
                #nothing
            when 'EXPENSE'
                #nothing
            when "DEBT"
                link_model  = transaction.link_model || DebtLine.find_by(id: transaction.link_model_id)
                raise "Cannot find Linked Model for transaction #{transaction.trans_no}" if link_model.blank?
                debt = link_model.debt
                run_posting_debt(debt)
                puts "Posting done for Debt# #{debt.debt_code} from transaction #{transaction.trans_no}"
                log_file.puts("Posting done for Debt# #{debt.debt_code} from transaction #{transaction.trans_no}")
            else
                # nothing
            end
        rescue Exception => e
            log_file.puts("Error - #{e.to_s}\n")
            puts "Error - #{e.to_s}\n"
        ensure
            log_file.puts("End Time - #{Time.now.strftime("%Y-%m-%d %H:%M:%S")}\n")
            log_file.close
        end
    end
    def self.run_posting_for_account(transaction, log_file)
        account = Account.where(:id => transaction.account_id)
            log_file.puts("cannot find Account #{transaction.account_code} for tranaction #{transaction.trans_no}") if account.blank?
            raise "cannot find Account #{transaction.account_code} for tranaction #{transaction.trans_no}" if account.blank?
            account = account.first
            binding.pry
            unposting_for_account(account, transaction)
            binding.pry
            posting_for_account(account, transaction)
            binding.pry
            save_proc = Proc.new do   
                account.save!
            end
            account.save_transaction(save_proc) if account.errors.empty?
            raise account.errors.full_messages.join(",") if !account.errors.empty?
            log_file.puts("Account #{account.code} posting with amount #{account.balance}  for user #{account.user_id} is completed from transaction #{transaction.trans_no}.")
            puts "Account #{account.code} posting with amount #{account.balance}  for user #{account.user_id} is completed from transaction #{transaction.trans_no}.."
    end
    def self.posting_for_account(account, transaction)
        current_amount = transaction.amount
        account_amount = account.balance
        binding.pry
        case transaction.source_type.upcase
        when 'INCOME'
            account_amount = account_amount + current_amount
        when 'EXPENSE'
            account_amount = account_amount - current_amount
        when "DEBT"
            debt_line = DebtLine.where(id: transaction.link_model.id)
            log_file.puts("cannot find debt line for transaction #{transaction.trans_no} from account posting.") if debt_line.blank?
            raise "connot find debt line for transaction #{transaction.trans_no} from account posting." if debt_line.blank?
            debt_line = debt_line.first
            payment_type = debt_line.debt_payment_type
            if debt_line.serial_no == 101
                debt = Debt.where(:id => debt_line.debt_id)
                raise "cannot find debt for debt line #{debt_line.id} from account posting." if debt.blank?
                debt = debt.first
                account_amount = account_amount  + debt.initial_amount + debt.extra_amount
            end
            if payment_type&.upcase == REPAYMENT_DEBT_PAYMENT_TYPE&.upcase
                account_amount = account_amount - current_amount
            elsif payment_type&.upcase == ADDITIONAL_DEBT_PAYMENT_TYPE&.upcase
                account_amount = account_amount + current_amount
            elsif payment_type&.upcase == INITIAL_DEBT_PAYMENT_TYPE&.upcase
                account_amount = account_amount - current_amount  
            end
        else
            #nothing
        end
        binding.pry
        account.balance = account_amount
    end
    def self.unposting_for_account(account, transaction)
        previous_amount = transaction.previous_amount || 0
        account_amount = account.balance
        amount = account_amount
        binding.pry
        case transaction.source_type.upcase
        when 'INCOME'
            account_amount = account_amount  - previous_amount
        when 'EXPENSE'
            account_amount = account_amount  + previous_amount
        when "DEBT"
            debt_line = DebtLine.where(id: transaction.link_model.id)
            log_file.puts("cannot find debt line for transaction #{transaction.trans_no} from account posting.") if debt_line.blank?
            raise "connot find debt line for transaction #{transaction.trans_no} from account posting." if debt_line.blank?
            debt_line = debt_line.first
            payment_type = debt_line.debt_payment_type_was || ""
            if debt_line.serial_no == 101 and payment_type&.upcase != INITIAL_DEBT_PAYMENT_TYPE&.upcase
                debt = Debt.where(:id => debt_line.debt_id)
                raise "cannot find debt for debt line #{debt_line.id} from account posting." if debt.blank?
                debt = debt.first
                account_amount = account_amount  - debt.initial_amount - debt.extra_amount
            end
            if payment_type&.upcase == REPAYMENT_DEBT_PAYMENT_TYPE&.upcase
                account_amount = account_amount  + previous_amount
            elsif payment_type&.upcase == ADDITIONAL_DEBT_PAYMENT_TYPE&.upcase
                account_amount = account_amount  - previous_amount
            elsif payment_type&.upcase == INITIAL_DEBT_PAYMENT_TYPE&.upcase
                account_amount = account_amount  + previous_amount
            end
        else
            #nothing
        end
        binding.pry
        account.balance = account_amount
    end
    def self.run_posting_debt(debt)
        binding.pry
        debt = Debt.find_by(:id => debt.id)
        return if debt.active == false;
        debt_lines = debt.debt_lines
        total_amount = 0
        paid_amount = 0
        debt_lines.each do |debt_line|
            if debt_line.active == true
                amount = debt_line.amount
                payment_type = debt_line.debt_payment_type
                if payment_type&.upcase == REPAYMENT_DEBT_PAYMENT_TYPE&.upcase
                    paid_amount += amount
                elsif payment_type&.upcase == ADDITIONAL_DEBT_PAYMENT_TYPE&.upcase
                    total_amount += amount
                elsif payment_type&.upcase == INITIAL_DEBT_PAYMENT_TYPE&.upcase
                    paid_amount += amount
                end
            end
        end
        total_debt_amount = debt.initial_amount + debt.extra_amount + total_amount
        remaining_amount = total_debt_amount - paid_amount
        debt.amount = total_debt_amount
        debt.paid_amount = paid_amount
        debt.debt_amount = remaining_amount
        if remaining_amount == 0
            debt.status = :Closed
        end
        debt.debt_lines.each do |debt_line|
            debt_line.remaining_amount = remaining_amount
        end
        binding.pry
        save_proc = Proc.new do   
            debt.save!
        end
        binding.pry
        debt.save_transaction(save_proc) if debt.errors.empty?
        raise debt.errors.full_messages.join(",") if !debt.errors.empty?
    end
end