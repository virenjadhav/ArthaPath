class Account < ApplicationRecord
    belongs_to :user
    belongs_to :bank
    has_many :debt_lines
    
    
  end