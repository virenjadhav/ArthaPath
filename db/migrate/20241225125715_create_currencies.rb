class CreateCurrencies < ActiveRecord::Migration[7.0]
  def change
    create_table :currencies do |t|
      t.boolean :active, null: false
      t.string :code, null: false
      t.boolean :is_default, default: false
      t.timestamps
    end
  end
end
