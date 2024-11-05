class DropMainCategory < ActiveRecord::Migration[7.0]
  def change
    drop_table :main_categories
  end
end
