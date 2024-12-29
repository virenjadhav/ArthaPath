class AddBankCodeToAccounts < ActiveRecord::Migration[7.0]
  def change
    add_column :accounts, :bank_code, :string

    #  # Add a foreign key constraint
    #  add_foreign_key :accounts, :banks, column: :bank_code, column: :code
  end
end
