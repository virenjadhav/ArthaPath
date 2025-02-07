class AddActiveColumnToDebtLines < ActiveRecord::Migration[7.0]
  def change
    add_column :debt_lines, :active, :boolean, :null => false, default: false
    #Ex:- :null => false
    #Ex:- :default =>''
    #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
