class AddOptimisticLockingToMultipleTables < ActiveRecord::Migration[7.0]
  def change
    add_column :transactions, :lock_version, :integer, default: 0, null: false
    add_column :budgets, :lock_version, :integer, default: 0, null: false
    add_column :user_categories, :lock_version, :integer, default: 0, null: false
    add_column :common_categories, :lock_version, :integer, default: 0, null: false
    add_column :debt_lines, :lock_version, :integer, default: 0, null: false
    add_column :accounts, :lock_version, :integer, default: 0, null: false
    add_column :banks, :lock_version, :integer, default: 0, null: false
  end
end
