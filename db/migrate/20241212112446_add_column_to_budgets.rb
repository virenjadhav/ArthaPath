class AddColumnToBudgets < ActiveRecord::Migration[7.0]
  def change
    add_reference :budgets, :account, null: false, foreign_key: true
    add_column :budgets, :account_code, :string
    add_column :budgets, :main_category_id, :integer
    add_column :budgets, :main_category_code, :string
    add_column :budgets, :sub_category_id, :integer
    add_column :budgets, :sub_category_code, :string
    add_column :budgets, :payment_method, :string
    add_column :budgets, :tag, :string
    add_column :budgets, :period, :string
    add_column :budgets, :from_date, :datetime
    add_column :budgets, :to_date, :datetime
    add_column :budgets, :alert_amount, :decimal
  end
end
