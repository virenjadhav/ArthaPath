class MainCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :main_categories do |t|
      t.string :name
      t.string :code

      t.timestamps
    end
  end
end
