class AddDefaultToStatusInDebts < ActiveRecord::Migration[7.0]
  def change
    change_column_default :debts, :status, from: nil, to: 'A'
  end
end
