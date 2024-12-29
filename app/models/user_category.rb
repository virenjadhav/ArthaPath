class UserCategory < ApplicationRecord
    include ModelHelper
    self.inheritance_column = :_type_disabled
end