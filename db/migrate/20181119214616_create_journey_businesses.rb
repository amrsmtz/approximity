class CreateJourneyBusinesses < ActiveRecord::Migration[5.2]
  def change
    create_table :journey_businesses do |t|
      t.references :journey, foreign_key: true
      t.references :business, foreign_key: true
      t.integer :order

      t.timestamps
    end
  end
end
