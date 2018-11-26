class AddPhotoToBusinesses < ActiveRecord::Migration[5.2]
  def change
    add_column :businesses, :photo, :string
  end
end
