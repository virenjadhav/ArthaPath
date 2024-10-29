class Transaction < ApplicationRecord
    belongs_to :user
    before_create :set_trans_no
    # Add any validations or associations as needed
    private
      def set_trans_no
        # Find the maximum `trans_no` and increment it by 1
        max_trans_no = Transaction.maximum(:trans_no) || 0
        self.trans_no = max_trans_no + 1
      end
  end
  