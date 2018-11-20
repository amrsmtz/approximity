class AddFieldsToBusinesses < ActiveRecord::Migration[5.2]
  def change
    remove_column :businesses, :place_id
    remove_column :businesses, :address
    remove_column :businesses, :description
    remove_column :businesses, :openinghour
    remove_column :businesses, :closinghour
    remove_column :businesses, :reviews

    add_column :businesses, :price_level, :integer
    add_column :businesses, :shortaddress, :string
    add_column :businesses, :longaddress, :string
    add_column :businesses, :phone, :string
    add_column :businesses, :hours, :string
    add_column :businesses, :website, :string
  end
end
