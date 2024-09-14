class Transactions < ActiveRecord::Migration[7.0]
  def change
    create_table :transactions do |t|
      # Add your columns here
      t.boolean :active      
      t.decimal :amount, precision: 10, scale: 2
      t.string :main_category
      t.string :user_category
      t.datetime :trans_date
      t.text :description
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
