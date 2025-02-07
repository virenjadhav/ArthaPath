class AddAccountInTransaction < ActiveRecord::Migration[7.0]
  def change
    # Step 1: Add the columns without NOT NULL constraint
    add_column :transactions, :account_id, :integer, references: :accounts
    add_column :transactions, :account_code, :string

    # Step 2: Update existing records with default values
    reversible do |dir|
      dir.up do
        # Update all existing transactions with default values for account_id and account_code
        execute <<-SQL.squish
          UPDATE transactions
          SET account_id = 1, 
              account_code = 'SBI'
        SQL
      end
    end

    # Step 3: Apply NOT NULL constraint
    change_column_null :transactions, :account_id, false
    change_column_null :transactions, :account_code, false
  end
end
