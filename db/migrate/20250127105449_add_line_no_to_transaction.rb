class AddLineNoToTransaction < ActiveRecord::Migration[7.0]
  def change
    add_column :transactions, :line_no, :integer
  end
end
