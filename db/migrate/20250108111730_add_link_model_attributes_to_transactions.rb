class AddLinkModelAttributesToTransactions < ActiveRecord::Migration[7.0]
  def change
    add_column :transactions, :link_model_name, :string
    add_column :transactions, :link_model_code, :string
    add_column :transactions, :link_model_id, :integer
  end
end
