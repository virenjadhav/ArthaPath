class AddDescriptionToDebtLines < ActiveRecord::Migration[7.0]
  def change
    add_column :debt_lines, :description, :string
  end
end
