class CreateItem < ActiveRecord::Migration[5.0]
  def change
    create_table :items do |t|
      t.string :name, null: false
      t.integer :tier, null: false
      t.integer :price, null: false
      t.string :category, null: false
      t.text :components, array: true, default: []
      t.json :properties, default: []
      t.json :effects, default: []
    end
  end
end
