class CreateCurrencyRates < ActiveRecord::Migration[7.0]
  def change
    create_table :currency_rates do |t|
      t.string :from_currency, null: false
      t.string :to_currency, null: false
      t.decimal :conversion_rate, precision: 10, scale: 4, null: false
      t.date :rate_date, null: false
      t.timestamps
    end
    # Add an index to ensure unique pairs of from_currency and to_currency for a specific date
    add_index :currency_rates, [:from_currency, :to_currency, :rate_date], unique: true
  end
end
