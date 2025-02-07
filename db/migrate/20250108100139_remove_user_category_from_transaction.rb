class RemoveUserCategoryFromTransaction < ActiveRecord::Migration[7.0]
  def change
    remove_column :transactions, :user_category, :string
  end
end
