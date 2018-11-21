class ModifyFieldToBusinesses < ActiveRecord::Migration[5.2]
  def change
    remove_column :businesses, :ratings

    add_column :businesses, :ratings, :float
  end
end
