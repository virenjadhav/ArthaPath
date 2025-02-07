namespace :budget_posting do
    desc "Run posting to set budgets for all users"
    task run_posting: :environment do
      include General
          log_file_path = Dir.getwd + "/public/log/budget_log/"  + Time.new.strftime('%Y%m')+ "/" + Time.new.strftime('%Y%m%d')
          FileUtils.mkdir_p(log_file_path) unless File.exist?(log_file_path)
          log_file_name = log_file_path + "/budget_log#{Time.now().strftime('%Y%m%d-%H%M%S')}.txt"
          log_file = File.open(log_file_name, "w")
          log_file.puts("Start Time - #{Time.now.strftime("%Y-%m-%d %H:%M:%S")}\n")
          begin
              # configure database connection
              ActiveRecord::Base.establish_connection
              users = User.all
              users.each do |user|
                  begin 
                      budgets = Budget.all.where(:user_id => user.id, :active => true)
                      budgets.each do |budget|
                        spent_amount = 0
                        transactions = Transaction.all.where("user_id = ? and active = ? and account_id = ? and main_category_id = ? and sub_category_id = ? and trans_date between ? and ?", user.id, true, budget.account_id, budget.main_category_id, budget.sub_category_id, budget.from_date, budget.to_date)
                        transactions.each do |transaction|
                            if transaction.source_type.upcase == "EXPENSE"
                                spent_amount += transaction.amount
                            end
                        end
                        save_proc = Proc.new do
                            budget.spent_amount = spent_amount
                            budget.save!
                        end
                        budget.save_transaction(save_proc) if budget.errors.empty?
                        raise budget.errors.full_messages.join(",") if !budget.errors.empty?
                        log_file.puts("Budget posting for user #{user.name} is completed.")
                        puts "Budget posting for user #{user.name} is completed."
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