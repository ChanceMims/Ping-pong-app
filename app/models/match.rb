class Match < ApplicationRecord

    has_many :user_matches
    has_many :users, through: :user_matches
    belongs_to :organization

end