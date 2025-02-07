class ChangeAmountColumnsToDecimalInDebts < ActiveRecord::Migration[7.0]
  def up
    change_column :debts, :amount, :decimal, precision: 10, scale: 2
    change_column :debts, :paid_amount, :decimal, precision: 10, scale: 2
    change_column :debts, :debt_amount, :decimal, precision: 10, scale: 2
  end

  def down
    change_column :debts, :amount, :integer
    change_column :debts, :paid_amount, :integer
    change_column :debts, :debt_amount, :integer
  end
end
