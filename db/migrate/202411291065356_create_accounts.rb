class CreateAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :accounts do |t|
      t.references :user, null: false, foreign_key: true # Foreign key to users table, not null
      t.references :bank, null: false, foreign_key: true # Foreign key to banks table, not null
      t.string :name, null: false                        # Account name, not null
      t.string :currency, default: 'INR'                                 # Account currency
      t.decimal :initial_balance, precision: 15, scale: 2, default: 0.0 # Default 0
      t.text :description

      t.timestamps
    end
  end
end
