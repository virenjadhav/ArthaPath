class AddPaidAmountToDebt < ActiveRecord::Migration[7.0]
  def change
    add_column :debts, :paid_amount, :integer, :default => 0
  end
end
