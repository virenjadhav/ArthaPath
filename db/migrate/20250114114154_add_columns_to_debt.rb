class AddColumnsToDebt < ActiveRecord::Migration[7.0]
  def change
    add_column :debts, :initial_amount, :decimal, default: 0, precision: 10, scale: 2
    add_column :debts, :intial_paid_amount, :decimal, default: 0, precision: 10, scale: 2
    add_column :debts, :total_amount_without_interest, :decimal, default: 0, precision: 10, scale: 2
    add_column :debts, :interest_amount, :decimal, default: 0, precision: 10, scale: 2
  end
end
