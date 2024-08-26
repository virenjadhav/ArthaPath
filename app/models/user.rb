# app/models/user.rb
class User < ApplicationRecord
    has_secure_password  # Provides methods like authenticate for password validation
  
    # validates :email, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
    validates :name, presence: true
    validates :password, presence: true, length: { minimum: 6 }
    validates :password_confirmation, presence: true
  end
  