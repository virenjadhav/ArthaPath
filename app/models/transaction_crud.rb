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
            # transaction = Transaction.find(doc[:id])
            transaction = Transaction.find_by_sql("select  t.*, dl.* 
                                from transactions t 
                                left join debt_lines dl on dl.transaction_id = t.id and dl.active = 1 and t.source_type = 'DEBT' and t.link_model_name = 'DEBT'
                                where t.active = 1 and t.id = #{doc[:id]}")
            transaction = transaction.first
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
            case transaction.source_type.upcase
            when "INCOME"
                #nothing
            when "EXPENSE"
                #nothing
            when "DEBT"
                debt_line = DebtLine.where(:transaction_id => transaction.id)
                raise "Cannot Find Debt Line for Transaction #{transaction.trans_no}" if debt_line.blank?
                debt_line = debt_line.first
                if debt_line.serial_no == 101
                    raise "Cannot Delete Initial Line# 101, If you want to delete then delete main Debt #{debt_line.debt_code}"
                end
                transaction.link_model = debt_line
            else
                #nothing
            end
            transaction.active = false 
            if transaction.link_model.present?
                transaction.link_model.active = false
            end
            save_proc = Proc.new do
                transaction.save!
                if transaction.link_model.present?
                    transaction.link_model.save!
                end
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
            transaction = Transaction.find_or_create_transaction(doc)
            build_association_for_transaction(transaction, doc)
            # raise "ese hi rok diya
            
            binding.pry
            
            save_proc = Proc.new do
                if transaction.link_model.present?
                    transaction.link_model.save!
                else
                    transaction.save!
                end
                # transaction.save!
            end
            transaction.save_transaction(save_proc) if transaction.errors.empty?
            raise transaction.errors.full_messages.join(",") if !transaction.errors.empty?
            return true, "", transaction
        rescue Exception => ex 
            return false, ex.to_s, transaction      
        end
    end
    private 
    def self.build_association_for_transaction(transaction, doc)
        source_type = doc["source_type"]
        if(source_type.present?)
          case source_type.upcase
          when "INCOME"
            #nothing
          when "EXPENSE"
            #nothing
          when "DEBT"
            link_model_type = doc["link_model_type"]
            if transaction.new_record?
                # association for link models 
                debt_doc = Marshal.load(Marshal.dump(doc))
                debt_doc[:intial_paid_amount] = doc[:amount]
                debt_doc[:amount] = nil
                debt_doc[:pay_date] = doc[:trans_date]
                if link_model_type == "new"
                    debt_doc[:id] = nil
                else
                    link_model_id = Debt.where(:debt_code => doc[:link_model_code])
                    raise "Link Model #{doc[:Link_model_code]} not found!" if link_model_id.blank?
                    debt_doc[:id] = link_model_id.first.id
                end
                
                debt = Debt.find_or_create_debt(debt_doc)
                debt_line_doc = Marshal.load(Marshal.dump(doc))
                debt_line_doc[:mainRecord] = debt.as_json()
                debt_line_doc[:pay_date] = doc[:trans_date]
                debt_line_doc[:id] = nil
                debt_line_doc[:amount] = debt.intial_paid_amount
                if link_model_type == "new"
                    debt_line_doc[:debt_payment_type] = INITIAL_DEBT_PAYMENT_TYPE
                end
                # debt_line_doc[:debt_payment_type] = INITIAL_DEBT_PAYMENT_TYPE
                # attach debt to doc for create debt line
                debt_line = DebtLine.find_or_create_debt_line(debt_line_doc)
                # remaining_amount = calculate_remaining_amount(debt_line.debt)
                # remaining_amount += debt_line.amount_was.blank? ? 0 : debt_line.amount_was.to_f
                # current_amount = doc[:amount].blank? ? 0 : doc[:amount].to_f
                # result = check_valid_amount(current_amount, remaining_amount)
                # raise "Amount cannot be greater than remaining amount" if !result
                # change_line = change_debt_for_initial_line(debt_line)
                debt_line.debt = debt
                debt.debt_lines << debt_line
                transaction.link_model = debt_line
                debt_line.debt_transaction = transaction
                debt_line.debt_transaction.link_model = debt_line
                #   transaction.link_model = debt.debt_lines.first
                    
            #     transaction.build_and_modify_debt_line(transaction) do |debt_line|
                    #   end
            else
              # fetch existing link model
              link_model_code = doc["link_model_code"]
              debt = Debt.find_by(:debt_code => link_model_code)
              raise "Link Model not found!" if debt.blank?
              debt_line_doc = Marshal.load(Marshal.dump(doc))
              debt_line_doc[:mainRecord] = debt.as_json()
              debt_line_doc[:pay_date] = doc[:trans_date]
              debt_line_doc[:id] = DebtLine.find_by(:transaction_id => transaction.id, :debt_id => debt.id).id
              debt_line = DebtLine.find_or_create_debt_line(debt_line_doc)
              debt_line.build_association_for_debt_lines(debt_line_doc)
              transaction.link_model = debt_line
            end
            remaining_amount = DebtCrud.calculate_remaining_amount(debt_line.debt)
            remaining_amount += debt_line.amount_was.blank? ? 0 : debt_line.amount_was.to_f
            current_amount = doc[:amount].blank? ? 0 : doc[:amount].to_f
            result = DebtCrud.check_valid_amount(current_amount, remaining_amount)
            raise "Amount cannot be greater than remaining amount" if !result
            change_line = DebtCrud.change_debt_for_initial_line(debt_line)
          else
            #nothing
          end
        end
        # self.build_and_modify_debt_transaction(debt_transaction_doc) do |debt_transaction|
        # end
      end
      def self.get_debt_lines_doc_for_transaction(debt, transaction, doc)
            if !transaction.new_record? 
                line_doc = [{ 
                    id: transaction.link_model.id,
                    # serial_no: 
                    active: true,
                    amount: transaction.amount,
                    pay_date: transaction.trans_date,
                    description: transaction.description,
                    user_id: transaction.user_id,
                    # trans_no: 
                    main_category_id: transaction.main_category_id,
                    main_category_code: transaction.main_category_code,
                    sub_category_id: transaction.sub_category_id,
                    sub_category_code: transaction.sub_category_code,
                    source_type: 'DEBT',
                    payment_method: transaction.payment_method,
                    lock_version: transaction.debt_transaction.lock_version,
                    account_code: transaction.account_code,
                    account_id: transaction.account_id,

                    # link_model_name: 'DEBT',
                    # link_model_code: debt_line.debt_code,
                    # link_model_id: debt_line.id
                }]
            else 
                line_doc = [{ 
                    # serial_no: 
                    active: true,
                    amount: transaction.amount,
                    trans_date: transaction.pay_date,
                    description: transaction.description,
                    user_id: transaction.user_id,
                    # trans_no: 
                    main_category_id: transaction.main_category_id,
                    main_category_code: transaction.main_category_code,
                    sub_category_id: transaction.sub_category_id,
                    sub_category_code: transaction.sub_category_code,
                    source_type: 'DEBT',
                    payment_method: transaction.payment_method,
                    lock_version: 0,
                    # link_model_name: 'DEBT',
                    # link_model_code: debt_line.debt_code,
                    # link_model_id: debt_line.id
                    account_code: transaction.account_code,
                    account_id: transaction.account_id,
                    }]
            end
            return  line_doc
      end
end