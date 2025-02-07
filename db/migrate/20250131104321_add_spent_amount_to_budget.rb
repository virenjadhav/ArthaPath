class AddSpentAmountToBudget < ActiveRecord::Migration[7.0]
  def change
    add_column :budgets, :spent_amount, :decimal, :default => 0, precision: 10, scale: 2
  end
end
