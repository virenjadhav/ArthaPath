class RenameLineNoToSerialNoInTransaction < ActiveRecord::Migration[7.0]
  def change
    rename_column :Transactions, :line_no, :serial_no
  end
end
