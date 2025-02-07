class AddExtraAmountToDebts < ActiveRecord::Migration[7.0]
  def change
    add_column :debts, :extra_amount, :decimal, default: 0, precision: 10, scale: 2
  end
end
