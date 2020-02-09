class CreateMatches < ActiveRecord::Migration[6.0]
  def change
    create_table :matches do |t|
      t.integer :match_weight
      t.boolean :win?
      t.string :match_type
    end
  end
end
