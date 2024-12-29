class Bank < ApplicationRecord
  include ModelHelper
    belongs_to :user
    
    
  end