class ChangeColumnsToDecimalInDebtLines < ActiveRecord::Migration[7.0]
  def up
    change_column :debt_lines, :amount, :decimal, precision: 10, scale: 2
    change_column :debt_lines, :remaining_amount, :decimal, precision: 10, scale: 2
  end

  def down
    change_column :debt_lines, :amount, :integer
    change_column :debt_lines, :remaining_amount, :integer
  end
end
