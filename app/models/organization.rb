class Organization < ApplicationRecord

    validates :name, uniqueness: true

    has_many :user_orgs
    has_many :users, through: :user_orgs
    has_many :matches

    accepts_nested_attributes_for :users

end