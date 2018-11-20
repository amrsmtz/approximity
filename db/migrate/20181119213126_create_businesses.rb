class CreateBusinesses < ActiveRecord::Migration[5.2]
  def change
    create_table :businesses do |t|
      t.string :place_id
      t.string :name
      t.string :address
      t.string :type
      t.text :description
      t.integer :ratings
      t.time :openinghour
      t.time :closinghour
      t.text :reviews

      t.timestamps
    end
  end
end
