class AddTransNoToTransactions < ActiveRecord::Migration[7.0]
  def change
    add_column :transactions, :trans_no, :integer
    # add_index :transactions, :trans_no, unique: true
  end
end
