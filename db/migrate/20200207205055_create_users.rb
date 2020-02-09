class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password
      t.string :profile_icon
      t.string :email_address
      t.string :phone_number
    end
  end
end
