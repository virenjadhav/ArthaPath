# app/helpers/transaction_helper.rb
module ModelHelper
    def save_transaction(proc)
      # ActiveRecord::Base.transaction do
      #   proc.call # Execute the passed Proc
      # end
      # Return success message if transaction completes
      # [true, 'Transaction completed successfully']
      # rescue => e
      #   # Rollback on any exception and return error message
      #   [false, e.message]
      begin
        save_active_record(proc)
      rescue ActiveRecord::StaleObjectError
        errors.add( 'Error' ," data changed for #{self.class}: Please refresh and try again.")
      rescue ActiveRecord::RecordInvalid => invalid
        if "#{invalid.record.class}" !=  "#{self.class}"
          self.errors.add('Error',"#{invalid.to_s}")
        end
      rescue Exception => exp
        self.errors.add('Error',"#{exp.to_s}")
      end
    end
    def save_active_record(proc)
      ActiveRecord::Base.transaction do
        proc.call
      end
    end
  end
  