class CreateCommonCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :common_categories do |t|

      t.timestamps
    end
  end
end
