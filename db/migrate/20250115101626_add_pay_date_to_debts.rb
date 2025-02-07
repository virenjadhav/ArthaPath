class AddPayDateToDebts < ActiveRecord::Migration[7.0]
  def change
    add_column :debts, :pay_date, :datetime
  end
end
