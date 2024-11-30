class CreateBanks < ActiveRecord::Migration[7.0]
  def change
    create_table :banks do |t|
      t.string :code, null: false                       # Unique code for active banks
      t.string :name, null: false                      # Bank name, not null
      t.references :user, null: false, foreign_key: true # Foreign key to users table
      t.boolean :active, default: false              # Active status, default true
      t.string :bank_owner_name                      # Name of the bank owner
      t.string :address1                             # Address line 1
      t.string :address2                             # Address line 2
      t.string :city                                 # City
      t.string :state                                # State
      t.string :zip_code                             # ZIP code
      t.string :country                              # Country
      t.string :ifsc_code                            # IFSC code
      t.string :account_number                       # Account number
      t.string :icon

      t.timestamps                                   # Adds created_at and updated_at
    end

    # Add a unique constraint for `code` where `active` is true
    # add_index :banks, :code, unique: true, where: "active = true"
    execute <<-SQL
      CREATE UNIQUE INDEX index_banks_on_code
      ON banks (code)
      WHERE active = 1;
    SQL
  end
end
