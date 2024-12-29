class Debt < ApplicationRecord
    include ModelHelper
    has_many :debt_lines, dependent: :destroy
end