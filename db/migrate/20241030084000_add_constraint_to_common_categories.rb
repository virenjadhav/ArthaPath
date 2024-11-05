class AddConstraintToCommonCategories < ActiveRecord::Migration[7.0]
  def up
    execute <<-SQL
      ALTER TABLE common_categories
      ADD CONSTRAINT check_ref_id_ref_code
      CHECK (
        (category_type = 'sub' AND ref_id IS NOT NULL AND ref_code IS NOT NULL) OR
        (category_type <> 'sub')
      );
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE common_categories
      DROP CONSTRAINT check_ref_id_ref_code;
    SQL
  end
end
