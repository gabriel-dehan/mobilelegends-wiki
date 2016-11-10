class AddCodeNameToItems < ActiveRecord::Migration[5.0]
  def change
    add_column :items, :code_name, :string, default: ''
  end
end
