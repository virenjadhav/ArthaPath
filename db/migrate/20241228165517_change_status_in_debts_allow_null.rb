class ChangeStatusInDebtsAllowNull < ActiveRecord::Migration[7.0]
  def change
    change_column_null :debts, :status, true  # This allows NULL values in the 'status' column
  end
end
