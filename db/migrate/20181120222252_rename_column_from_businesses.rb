class RenameColumnFromBusinesses < ActiveRecord::Migration[5.2]
  def change
    rename_column :businesses, :type, :category
  end
end
