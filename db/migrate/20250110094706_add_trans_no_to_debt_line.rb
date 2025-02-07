class AddTransNoToDebtLine < ActiveRecord::Migration[7.0]
  def change
    add_column :debt_lines, :trans_no, :integer, :null => false, :default => -1
    add_column :debt_lines, :remaining_amount, :integer, :default => 0
  end
end
