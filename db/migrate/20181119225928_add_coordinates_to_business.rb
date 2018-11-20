class AddCoordinatesToBusiness < ActiveRecord::Migration[5.2]
  def change
    add_column :businesses, :latitude, :float
    add_column :businesses, :longitude, :float
  end
end
