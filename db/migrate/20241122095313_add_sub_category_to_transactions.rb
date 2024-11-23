class AddSubCategoryToTransactions < ActiveRecord::Migration[7.0]
  def change
    add_column :transactions, :sub_category_id, :int
    add_column :transactions, :sub_category_code, :string

    # Add a foreign key constraint for sub_category_id
    # add_foreign_key :transactions, :user_categories, column: :sub_category_id

    # (Optional) Add indexes for better performance
    # add_index :transactions, :sub_category_id
    # add_index :transactions, :sub_category_code
  end
end
