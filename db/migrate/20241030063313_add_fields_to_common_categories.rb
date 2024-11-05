class AddFieldsToCommonCategories < ActiveRecord::Migration[7.0]
  def change
    change_table :common_categories do |t|
      t.boolean :active, default: true
      t.string :name
      t.string :code
      t.string :type, limit: 25  # Set for 'income' or 'expense'
      t.string :category_type
      t.integer :ref_id
      t.string :ref_code
    end
  end
end
