class AddOrRemoveMainCategoryFromTransaction < ActiveRecord::Migration[7.0]
  def change
    add_column :transactions, :main_category_id, :int
    add_column :transactions, :main_category_code, :string
    remove_column :transactions, :main_category
  end
end
