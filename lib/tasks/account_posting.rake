namespace :account_posting do
  desc "Run posting for all accounts for all users in the system"
  task run_posting: :environment do
    include General
        log_file_path = Dir.getwd + "/public/log/account_log/"  + Time.new.strftime('%Y%m')+ "/" + Time.new.strftime('%Y%m%d')
        FileUtils.mkdir_p(log_file_path) unless File.exist?(log_file_path)
        log_file_name = log_file_path + "/account_log#{Time.now().strftime('%Y%m%d-%H%M%S')}.txt"
        log_file = File.open(log_file_name, "w")
        log_file.puts("Start Time - #{Time.now.strftime("%Y-%m-%d %H:%M:%S")}\n")
        begin
            # configure database connection
            ActiveRecord::Base.establish_connection
            users = User.all
            users.each do |user|
                begin 
                    accounts = Account.all.where(:user_id => user.id, :active => true)
                    accounts.each do |account|
                        account_code = account.code
                        account_id = account.id
                        account_amount = account.initial_balance
                        # debt posting for account
                        debts = Debt.all.joins(:debt_lines).where("debts.user_id = ? and  debts.active = ? and debt_lines.account_id = ? and debt_lines.serial_no = 101", user.id, true, account_id).select("distinct debts.*")
                        binding.pry
                        debts.each do |debt|
                            debt_amount = debt.amount
                            case debt.debt_type.upcase
                            when 'BORROW'
                                account_amount += debt_amount
                            when 'LEND'
                                account_amount -= debt_amount
                            else
                                # nothing
                            end
                        end
                        # transaction posting for account
                        transactions = Transaction.all.where(:user_id => user.id, :active => true, :account_id => account_id)
                        transactions.each do |transaction|
                            tranaction_amount = transaction.amount
                            case transaction.source_type.upcase
                            when 'INCOME'
                                account_amount += tranaction_amount
                            when 'EXPENSE'
                                account_amount -= tranaction_amount
                            when "DEBT"
                                
                                debt_line = DebtLine.where(id: transaction.link_model_id)
                                raise "connot find debt line for transaction #{transaction.trans_no} from account posting." if debt_line.blank?
                                debt_line = debt_line.first
                                payment_type = debt_line.debt_payment_type
                                if payment_type&.upcase == REPAYMENT_DEBT_PAYMENT_TYPE&.upcase
                                    account_amount -= tranaction_amount
                                elsif payment_type&.upcase == ADDITIONAL_DEBT_PAYMENT_TYPE&.upcase
                                    account_amount += tranaction_amount
                                elsif payment_type&.upcase == INITIAL_DEBT_PAYMENT_TYPE&.upcase
                                    account_amount -= tranaction_amount
                                end
                            else
                                # nothing
                            end
                        end
                        account.balance = account_amount
                        save_proc = Proc.new do
                            account.save!
                        end
                        account.save_transaction(save_proc) if account.errors.empty?
                        raise account.errors.full_messages.join(",") if !account.errors.empty?
                        log_file.puts("Account #{account_code} posting with amount #{account_amount}  for user #{user.name} is completed.")
                        puts "Account #{account_code} posting with amount #{account_amount}  for user #{user.name} is completed."
                    end
                rescue Exception => ex
                    log_file.puts("Error - #{ex.to_s}\n")
                    puts "Error - #{ex.to_s}\n"
                end
            end
            
        rescue Exception => ex
            log_file.puts("Error - #{ex.to_s}\n")
        ensure
            log_file.puts("End Time - #{Time.now.strftime("%Y-%m-%d %H:%M:%S")}\n")
            log_file.close
        end
    end
  end       