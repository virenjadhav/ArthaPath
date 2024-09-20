class CreateBudgets < ActiveRecord::Migration[7.0]
  def change
    create_table :budgets do |t|
      t.boolean :active, default: true
      t.decimal :amount, precision: 10, scale: 2
      t.string :main_category
      t.string :sub_category
      t.text :description
      t.bigint :user_id, index: true

      t.timestamps
    end

    add_foreign_key :budgets, :users # Assuming a user model exists and you're associating budgets with users
  end
end
