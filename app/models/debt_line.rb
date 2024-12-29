class DebtLine < ApplicationRecord
    include ModelHelper
    belongs_to :debt
    belongs_to :user
    belongs_to :debt_transaction, class_name: 'Transaction', foreign_key: 'transaction_id'      
    belongs_to :account
end