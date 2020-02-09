class User < ApplicationRecord

    validates :username, uniqueness: true
    validates :email_address, uniqueness: true
    validates :phone_number, uniqueness: true

    has_many :user_orgs
    has_many :user_matches
    has_many :organizations, through: :user_orgs
    has_many :matches, through: :user_matches

end