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
            debt.debt_lines.each do |debt_line|
                debt_line.active = false
                debt_line.debt_transaction.active = false
            end
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
    def self.delete_debt_line(doc)
        begin
            debt_line = DebtLine.find(doc[:id])
            if debt_line.serial_no == 101
                raise "Cannot Delete Initial Line# 101, If you want to delete then delete main Debt #{debt_line.debt_code}"
            end
            debt_line.active = false 
            debt_line.debt_transaction.active = false
            save_proc = Proc.new do
                debt_line.save!
            end
            debt_line.save_transaction(save_proc) if debt_line.errors.empty?
            raise debt_line.errors.full_messages.join(",") if !debt_line.errors.empty?
            return true, "", debt_line
        rescue Exception => ex 
            return false, ex.to_s, nil
        end
    end
    def self.create_or_save_debt(doc)
        begin
            # debt = Debt.find_or_initialize_by(id: )
            debt = Debt.find_or_create_debt(doc)
            build_lines_for_debt(debt, doc)
            change_initial_line = change_default_debt_line(debt)
            save_proc = Proc.new do
                if debt.new_record?
                    debt.save!
                else
                    debt.save!
                end
            end
            debt.save_transaction(save_proc) if debt.errors.empty?
            raise debt.errors.full_messages.join(",") if !debt.errors.empty?
            return true, "", debt
        rescue Exception => ex 
            return false, ex.to_s, debt      
        end
    end
    def self.change_default_debt_line(debt)
        if !debt.new_record?
            debt.debt_lines.each do |debt_line|
                if debt_line.serial_no == 101
                    debt_line.amount = debt.intial_paid_amount
                    debt_line.pay_date = debt.pay_date
                    if debt_line.debt_transaction
                        debt_line.debt_transaction.amount = debt.intial_paid_amount
                        debt_line.debt_transaction.trans_date = debt.pay_date
                    end
                    return true
                end
            end
        end
    end
    def self.create_or_save_debt_line(doc)
        begin
            debt_line = DebtLine.find_or_create_debt_line(doc)
            debt_line.build_association_for_debt_lines(doc)
            remaining_amount = calculate_remaining_amount(debt_line.debt)
            remaining_amount += debt_line.amount_was.blank? ? 0 : debt_line.amount_was.to_f
            current_amount = doc[:amount].blank? ? 0 : doc[:amount].to_f
            result = check_valid_amount(current_amount, remaining_amount)
            raise "Amount cannot be greater than remaining amount" if !result
            change_line = change_debt_for_initial_line(debt_line)
            save_proc = Proc.new do
                debt_line.save!
            end
            debt_line.save_transaction(save_proc) if debt_line.errors.empty?
            raise debt_line.errors.full_messages.join(",") if !debt_line.errors.empty?
            return true, "", debt_line
        rescue Exception => ex
            return false, ex.to_s, debt_line      
        end
    end
    def self.calculate_remaining_amount(debt)
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
        total_debt_amount = debt.amount + total_amount
        remaining_amount = total_debt_amount - paid_amount
        remaining_amount
    end
    def self.change_debt_for_initial_line(debt_line)
        if debt_line.serial_no == 101
            debt_line.debt.intial_paid_amount = debt_line.amount
            debt_line.debt.pay_date = debt_line.pay_date
            return true
        end
        return false
    end
    def self.check_valid_amount(amount, remaining_amount)
        amount > remaining_amount ? false : true
    end
    def self.get_debt_lines(doc)
        begin
            criteria_data = doc[:criteriaSearchData]
            criteria_condition = CommonModule.get_criteria_condition(criteria_data)
            raise "Please Select Debt" unless doc[:mainRecord] and doc[:mainRecord][:id]
            main_order_id = doc[:mainRecord][:id]
            debts = DebtLine.all.where("active = 1 and debt_id = #{main_order_id} #{!criteria_condition.blank? ? criteria_condition : "" } ").order(id: :desc).limit(100)
            # debts = []
            # @debts.each do |debt| 
            #     debts << debt
            # end
            return true, "", debts
        rescue Exception => ex 
            return false, ex.to_s, nil
        end
    end
    def self.show_debt_line(doc)
        # main_order_id = doc[:mainRecord][:id]
        begin
            debt = DebtLine.find(doc[:id])
            # render json: debt.as_json(include: :debt_lines)
            return true, "", debt
        rescue Exception => ex 
            return false, ex.to_s, nil
        end
    end
    
    
    
    def self.build_lines_for_debt(debt, doc)
        # if debt.new_record?
        if(debt[:debt_lines].blank?)
            doc[:debt_lines] = create_debt_line_doc(debt, doc) 
        end
        # end
        debt.build_association_for_debt(doc)
    end
   
      
    def self.create_debt_line_doc(debt, doc)
        if !debt.new_record?
            return debt.debt_lines 
        else 
            main_category = UserCategory.where(:user_category_type => 'main', :active => 1,:type => 'DEBT', :code => debt.debt_type)
            raise "Main Category# #{debt.debt_type&.upcase} not found!" if main_category.blank?
            main_category = main_category.first
            sub_category = UserCategory.where(:user_category_type => 'sub', :active => 1,:type => 'DEBT', :ref_id => main_category.id)
            raise "Sub Category not found for #{debt.debt_type&.upcase}!" if sub_category.blank?
            sub_category = sub_category.first
            line_doc = [{ 
                "user_id" => debt.user_id,
                "account_id" => doc[:account_id],  
                "account_code"=> doc[:account_code],
                "pay_date"=> doc[:pay_date],
                "payment_method" => doc[:payment_method],
                "debt_id" => debt.id,
                "debt_code" => debt.debt_code,
                "main_category_id" => main_category.id,
                "main_category_code" => main_category.code,
                "sub_category_id" => sub_category.id,
                "sub_category_code" => sub_category.code,
                "amount" => debt.intial_paid_amount,
                "debt_type" => debt.debt_type,
                "debt_payment_type" => INITIAL_DEBT_PAYMENT_TYPE,
                "lock_version" => 0,
                "active" => true
                # serial_no: 
            }]
        end
        line_doc
    end
    def self.get_transaction_doc_for_debt_lines(debt_line, doc)
        if !debt_line.new_record? 
            line_doc = [{ 
                id: debt_line.debt_transaction.id,
                # serial_no: 
                active: true,
                amount: debt_line.amount,
                trans_date: debt_line.pay_date,
                description: debt_line.description,
                user_id: debt_line.user_id,
                # trans_no: 
                main_category_id: debt_line.main_category_id,
                main_category_code: debt_line.main_category_code,
                sub_category_id: debt_line.sub_category_id,
                sub_category_code: debt_line.sub_category_code,
                source_type: 'DEBT',
                payment_method: debt_line.payment_method,
                lock_version: debt_line.debt_transaction.lock_version,
                # link_model_name: 'DEBT',
                # link_model_code: debt_line.debt_code,
                # link_model_id: debt_line.id
                account_id: debt_line.account_id,
                account_code: debt_line.account_code,
            }]
        else 
            line_doc = [{ 
                # serial_no: 
                active: true,
                amount: debt_line.amount,
                trans_date: debt_line.pay_date,
                description: debt_line.description,
                user_id: debt_line.user_id,
                # trans_no: 
                main_category_id: debt_line.main_category_id,
                main_category_code: debt_line.main_category_code,
                sub_category_id: debt_line.sub_category_id,
                sub_category_code: debt_line.sub_category_code,
                source_type: 'DEBT',
                payment_method: debt_line.payment_method,
                lock_version: 0,
                # link_model_name: 'DEBT',
                # link_model_code: debt_line.debt_code,
                # link_model_id: debt_line.id
                account_id: debt_line.account_id,
                account_code: debt_line.account_code,
                }]
        end
        return  line_doc
    end
end