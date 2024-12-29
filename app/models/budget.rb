class Budget < ApplicationRecord
  include ModelHelper
    belongs_to :user
  
    validates :amount, presence: true
    # validates :main_category, presence: true
  end
  