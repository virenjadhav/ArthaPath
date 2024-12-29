class CreateDebtLines < ActiveRecord::Migration[7.0]
  def change
    create_table :debt_lines do |t|
      t.timestamps
      t.boolean :active, :null => false, :default => false      
      t.references :user, :null => false
      t.references :transaction, :null => false
      t.references :debt, :null => false
      t.string :debt_code, :null => false
      t.references :account, :null => false
      t.string :account_code, :null => false
      t.integer :main_category_id
      t.string :main_category_code
      t.integer :sub_category_id
      t.string :sub_category_code
      t.integer :amount, :null => false
      t.datetime :pay_date, :null => false
      t.string :debt_type, :limit => 25, :null => false
      t.string :payment_method, :limit => 50
      t.string :debt_payment_type, :limit => 50, :null => false
      t.integer :serial_no, :default => 101
    end
  end
end
