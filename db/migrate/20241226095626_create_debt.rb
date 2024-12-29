class CreateDebt < ActiveRecord::Migration[7.0]
  def change
    create_table :debts do |t|
      t.timestamps
      t.boolean :active, :null => false, :default => false
      t.references :user, :null => false
      t.string :debt_code, :null => false
      t.string :debt_name, :null => false
      t.string :contact_no, :limit => 50
      t.string :contact_email, :limit => 250
      t.integer :amount, :default => 0, :null => false
      t.integer :debt_amount, :default => 0, :null => false
      t.string :interest_type, :limit => 50, :null => false
      t.integer :interest_rate, :default => 0
      t.datetime :due_date
      t.string :status, :limit => 25, :null => false
      t.string :debt_type, :limit => 25, :null => false
      t.string :attachment_file_name
      t.string :payment_method, :limit => 50
      t.string :description
    end
  end
end
