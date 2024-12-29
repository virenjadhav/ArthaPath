class RenameTypeToTransactions < ActiveRecord::Migration[7.0]
  def change
    rename_column :transactions, :type, :source_type
  end
end
