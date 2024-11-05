class InsertCommonCategories < ActiveRecord::Migration[7.0]
  def up
    # Insert main categories first
    execute <<-SQL
      INSERT INTO common_categories (created_at, updated_at, active, name, code, type, category_type, ref_id, ref_code)
      VALUES
      (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 'Salary', 'SALARY', 'income', 'main', NULL, NULL),
      (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 'Gift', 'GIFT', 'income', 'main', NULL, NULL),
      (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 'Housing', 'HOUSING', 'expense', 'main', NULL, NULL),
      (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 'Food', 'FOOD', 'expense', 'main', NULL, NULL),
      (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 'Transportation', 'TRANSPORTATION', 'expense', 'main', NULL, NULL);
    SQL

    # Fetch the IDs and codes of the main categories to use as references
    housing_id = select_value("SELECT id FROM common_categories WHERE code = 'HOUSING'")
    housing_code = 'HOUSING'
    
    food_id = select_value("SELECT id FROM common_categories WHERE code = 'FOOD'")
    food_code = 'FOOD'
    
    transportation_id = select_value("SELECT id FROM common_categories WHERE code = 'TRANSPORTATION'")
    transportation_code = 'TRANSPORTATION'

    # Insert sub-categories using the fetched references
    execute <<-SQL
      INSERT INTO common_categories (created_at, updated_at, active, name, code, type, category_type, ref_id, ref_code)
      VALUES
      (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 'Rent', 'RENT', 'expense', 'sub', #{housing_id}, '#{housing_code}'),
      (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 'Utilities', 'UTILITIES', 'expense', 'sub', #{housing_id}, '#{housing_code}'),
      (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 'Groceries', 'GROCERIES', 'expense', 'sub', #{food_id}, '#{food_code}'),
      (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 'Fuel', 'FUEL', 'expense', 'sub', #{transportation_id}, '#{transportation_code}'),
      (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 'Public Transport', 'PUBLIC_TRANSPORTATION', 'expense', 'sub', #{transportation_id}, '#{transportation_code}');
    SQL
  end

  def down
    # Remove inserted categories if rollback is needed
    execute <<-SQL
      DELETE FROM common_categories
      WHERE code IN ('SALARY', 'GIFT', 'HOUSING', 'FOOD', 'TRANSPORTATION', 'RENT', 'UTILITIES', 'GROCERIES', 'FUEL', 'PUBLIC_TRANSPORTATION');
    SQL
  end
end
