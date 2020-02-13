class CreateMatches < ActiveRecord::Migration[6.0]
  def change
    create_table :matches do |t|
      t.string :status
      t.boolean :win?
      t.string :match_type
      t.references :organization, null: false, foreign_key: true
    end
  end
end
