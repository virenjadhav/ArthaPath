
  class ChangeStatusToEnumInDebts < ActiveRecord::Migration[7.0]
    def up
      # Change the column type to integer
      # change_column :debts, :status, :integer, default: 0, null: false
      change_column :debts, :status, :string, null: false, default: 'A'
  
      # Optionally, map existing string values to integers (if needed)
      # Update this based on your current `status` values
      # Debt.reset_column_information
      # Debt.where(status: 'Active').update_all(status: 0)
      # Debt.where(status: 'Closed').update_all(status: 1)
      # Debt.where(status: 'Overdue').update_all(status: 2)
    end
  
    def down
      # Revert the column type back to string
      change_column :debts, :status, :string, defalult: 'A'
    end
  end

