class Transaction < ApplicationRecord
    belongs_to :user
    before_create :set_trans_no
    include ModelHelper
    # Add any validations or associations as needed
    after_commit :after_transaction_commit
    before_save :set_previous_amount
    
    include ConcernAssociation

    attr_accessor  :link_model
    attr_accessor  :previous_amount

    belongs_to :debt_line, optional: true
    belongs_to :loan_line, optional: true
    belongs_to :investment_line, optional: true
    belongs_to :goal_line, optional: true
    # Define the generic association
    # has_generic_association :transaction
    has_generic_association :debt_line
    has_generic_association :loan_line
    has_generic_association :investment_line
    has_generic_association :goal_line

    scope :active, -> { where(active: true) }

    # private
    public
    def set_previous_amount
      binding.pry
      self.previous_amount = self.amount_was || 0
      binding.pry
    end
      def set_trans_no
        # Find the maximum `trans_no` and increment it by 1
        max_trans_no = Transaction.maximum(:trans_no) || 5000
        self.trans_no = max_trans_no + 1
      end
      def after_transaction_commit
        binding.pry
        Posting.run_posting_from_transaction(self)
        binding.pry
        set_link_model()
        binding.pry
      end

      def set_link_model
        if(!self.link_model.blank? and !self.link_model.id.blank? and self.link_model_id.blank?)
          case self.link_model.class.name
          when 'DebtLine'
            self.link_model_id = self.link_model.id
            self.link_model_code = self.link_model.debt_code
            self.link_model_name = 'DEBT'
            self.serial_no = self.link_model.serial_no
          else
            # nothing
          end
          save_proc = Proc.new do
            self.save!
          end
          self.save_transaction(save_proc)  if self.errors.empty?
          raise self.errors.full_messages.join(",") if !self.errors.empty?
        end      
      end
      def self.find_or_create_transaction(doc)
        begin
            transaction = Transaction.find_or_initialize_by(id: doc[:id])
            if transaction.new_record?
                transaction.set_trans_no
            end
            transaction.build_and_assign_attributes(doc)
            return transaction
        rescue Exception => ex
            raise ex.blank? ? "Something wrong in fetching transaction." : ex.to_s
        end
      end
    private
    def auto_generated_trans_no
        max_trans_no = Transaction.maximum(:trans_no) || 5000
        trans_no = max_trans_no + 1
        return trans_no
    end
  end
  