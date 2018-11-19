# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_11_19_225928) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "businesses", force: :cascade do |t|
    t.string "place_id"
    t.string "name"
    t.string "address"
    t.string "type"
    t.text "description"
    t.integer "ratings"
    t.time "openinghour"
    t.time "closinghour"
    t.text "reviews"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "latitude"
    t.float "longitude"
  end

  create_table "journey_businesses", force: :cascade do |t|
    t.bigint "journey_id"
    t.bigint "business_id"
    t.integer "order"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["business_id"], name: "index_journey_businesses_on_business_id"
    t.index ["journey_id"], name: "index_journey_businesses_on_journey_id"
  end

  create_table "journeys", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "journey_businesses", "businesses"
  add_foreign_key "journey_businesses", "journeys"
end
