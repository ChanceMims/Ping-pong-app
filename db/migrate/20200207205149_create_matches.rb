class CreateMatches < ActiveRecord::Migration[6.0]
  def change
    create_table :matches do |t|
      t.string :status
      t.integer :winner_id
      t.integer :loser_id
      t.integer :challenger
      t.integer :recipient
      t.string :match_type
      t.references :organization, null: false, foreign_key: true
    end
  end
end
