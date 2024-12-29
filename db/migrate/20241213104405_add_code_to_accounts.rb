class AddCodeToAccounts < ActiveRecord::Migration[7.0]
  def change
    add_column :accounts, :code, :string
  end
end
