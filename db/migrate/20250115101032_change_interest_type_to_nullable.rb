class ChangeInterestTypeToNullable < ActiveRecord::Migration[7.0]
  def change
    change_column :debts, :interest_type, :string, limit: 25, null: true
  end
end
