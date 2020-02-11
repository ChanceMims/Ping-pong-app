class User < ApplicationRecord

    validates :username, uniqueness: true


    has_many :user_orgs
    has_many :user_matches
    has_many :organizations, through: :user_orgs
    has_many :matches, through: :user_matches

end