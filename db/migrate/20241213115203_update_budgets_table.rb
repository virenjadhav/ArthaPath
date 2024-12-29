class UpdateBudgetsTable < ActiveRecord::Migration[7.0]
  def change
    # Remove columns
    remove_column :budgets, :main_category, :string
    remove_column :budgets, :sub_category, :string

    # Backfill data to avoid NULL values (if necessary)
    Budget.where(account_id: nil).update_all(account_id: 1) # Replace with valid ID
    Budget.where(main_category_id: nil).update_all(main_category_id: 1)
    Budget.where(sub_category_id: nil).update_all(sub_category_id: 1)
    Budget.where(to_date: nil).update_all(to_date: Date.today)

    # Add NOT NULL constraints using raw SQL
    change_column_null :budgets, :account_id, false
    change_column_null :budgets, :main_category_id, false
    change_column_null :budgets, :sub_category_id, false
    execute <<-SQL
      ALTER TABLE budgets
      ALTER COLUMN to_date datetime NOT NULL;
    SQL
  end
end
