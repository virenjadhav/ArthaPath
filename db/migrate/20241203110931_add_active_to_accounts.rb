class AddActiveToAccounts < ActiveRecord::Migration[7.0]
  def change
    add_column :accounts, :active, :boolean, default: false
  end
end
