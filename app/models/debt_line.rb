class DebtLine < ApplicationRecord
    include ModelHelper
    # Include the concern for serial_no, association functionality
    include ConcernAssociation

    belongs_to :debt
    belongs_to :user
    # belongs_to :debt_transaction, class_name: 'Transaction', foreign_key: 'transaction_id'      
    # has_one :transaction, inverse_of: :debt_line
    belongs_to :debt_transaction, class_name: 'Transaction', foreign_key: 'transaction_id'
    belongs_to :account
    
    # Define the generic association
    # has_generic_association :transaction
    has_generic_association :debt_transaction
    has_generic_association :debt


    PARENT_MODEL = :debt # Explicitly declare which parent model to use
    before_validation :assign_serial_no, on: :create # before use assign_serial_no on model always define parent model
    validates :serial_no, uniqueness: { scope: :debt_id, message: "must be unique for the same Debt" }
    after_commit :after_debt_line_save
    scope :active, -> { where(active: true) }
    # scope :for_debt, ->(debt_instance) {
    #     instance = new
    #     instance.parent_model_instance = debt_instance
    #     instance.debt = debt_instance
    #     instance
    #     }

    public
    def after_debt_line_save
        binding.pry
        save_trans_no_to_debt_line()
        binding.pry
    end
    def save_trans_no_to_debt_line
        binding.pry
        if self.trans_no.blank? || self.trans_no == -1
            self.trans_no = self.debt_transaction.trans_no
            save_proc = Proc.new do
                self.save!
            end

            self.save_transaction(save_proc)  if self.errors.empty?
            binding.pry
            raise self.errors.full_messages.join(",") if !self.errors.empty?
        end
    end
    def build_association_for_debt_lines(doc)
        if !doc[:transaction]
            debt_transaction_doc = DebtCrud.get_transaction_doc_for_debt_lines(self, doc)
        else 
            debt_transaction_doc = doc[:transaction]
        end
        if debt_transaction_doc
            self.build_and_modify_debt_transaction(debt_transaction_doc) do |debt_transaction|
                # Additional modifications for the debt_transaction
                # debt_transaction.amount = 5000.00
                debt_transaction.link_model = self
            end
        end   
        
        # is_detail = doc[:isDetail]
        # if is_detail
        #     debt_doc = doc[:mainRecord]    
        #     self.build_and_modify_debt(debt_doc) do |debt|
        #     end     
        # end
    end
    def self.find_or_create_debt_line(doc)
        begin
            debt_id = doc[:mainRecord][:id]
            debt= Debt.find_by(:id => debt_id)
            debt_line = DebtLine.find_or_initialize_by(id: doc[:id])
            debt_line.debt = debt
            debt_line.build_and_assign_attributes(doc) 
            debt_line.debt_code = debt.debt_code   if !debt.blank?       
            debt_line.debt_code = doc[:mainRecord][:debt_code] if doc[:mainRecord] and doc[:mainRecord][:debt_code] 
            if debt_line.debt_type.blank?
                if debt.blank?
                    debt_line.debt_type = debt.debt_type
                else
                    debt_line.debt_type = doc[:mainRecord][:debt_type] if doc[:mainRecord] and doc[:mainRecord][:debt_type]
                end
            end
            raise "Debt Code cannot be blank" if debt_line.debt_code.blank?
            return debt_line
        rescue Exception => ex
            raise ex.blank? ? "Something wrong in fetching debt line." : ex.to_s
        end
      end
      
end