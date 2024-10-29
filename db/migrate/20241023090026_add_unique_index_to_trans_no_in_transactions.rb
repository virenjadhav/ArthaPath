class AddUniqueIndexToTransNoInTransactions < ActiveRecord::Migration[7.0]
  def change
    add_index :transactions, :trans_no, unique: true
  end
end
