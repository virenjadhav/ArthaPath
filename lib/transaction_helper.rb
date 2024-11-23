# app/helpers/transaction_helper.rb
module TransactionHelper
    def self.save_transaction(proc)
      ActiveRecord::Base.transaction do
        proc.call # Execute the passed Proc
      end
      # Return success message if transaction completes
      [true, 'Transaction completed successfully']
    rescue => e
      # Rollback on any exception and return error message
      [false, e.message]
    end
  end
  