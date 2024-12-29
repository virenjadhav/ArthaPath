class CommonCategory < ApplicationRecord
  include ModelHelper
  self.inheritance_column = :_type_disabled
    validates :name, presence: true
    validates :code, presence: true
    validates :type, presence: true
    validates :category_type, presence: true
    
    # Custom validation for ref_id and ref_code
    validates :ref_id, presence: true, if: -> { category_type == 'sub' }
    validates :ref_code, presence: true, if: -> { category_type == 'sub' }
  end
  