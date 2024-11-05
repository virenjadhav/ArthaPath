class CreateUserCategories < ActiveRecord::Migration[7.0]
  def change
    # create_table :user_categories do |t|

    #   t.timestamps
    # end
    create_table :user_categories do |t|
      t.datetime :created_at, null: false, default: -> { 'CURRENT_TIMESTAMP' }
      t.datetime :updated_at, null: false, default: -> { 'CURRENT_TIMESTAMP' }
      t.boolean :active, default: true
      t.string :name
      t.string :code
      t.string :type, limit: 25  # Set for 'income' or 'expense'
      t.string :user_category_type
      t.integer :ref_id
      t.string :ref_code
      t.bigint :common_category_id, index: true  # Use bigint to match the primary key in common_categories
      t.string :common_category_code
      
      t.foreign_key :common_categories, column: :common_category_id, on_delete: :nullify
    end
  end
end
