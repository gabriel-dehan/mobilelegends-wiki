class AddCraftPriceToItems < ActiveRecord::Migration[5.0]
  def change
    add_column :items, :craft_price, :integer, null: false
  end
end
