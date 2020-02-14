# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_02_07_230133) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "matches", force: :cascade do |t|
    t.string "status"
    t.integer "winner_id"
    t.integer "loser_id"
    t.integer "challenger"
    t.integer "recipient"
    t.string "match_type"
    t.bigint "organization_id", null: false
    t.index ["organization_id"], name: "index_matches_on_organization_id"
  end

  create_table "organizations", force: :cascade do |t|
    t.string "name"
    t.string "icon_url"
  end

  create_table "user_matches", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "match_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["match_id"], name: "index_user_matches_on_match_id"
    t.index ["user_id"], name: "index_user_matches_on_user_id"
  end

  create_table "user_orgs", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "organization_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["organization_id"], name: "index_user_orgs_on_organization_id"
    t.index ["user_id"], name: "index_user_orgs_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password"
    t.string "profile_icon"
    t.string "email_address"
    t.string "phone_number"
  end

  add_foreign_key "matches", "organizations"
  add_foreign_key "user_matches", "matches"
  add_foreign_key "user_matches", "users"
  add_foreign_key "user_orgs", "organizations"
  add_foreign_key "user_orgs", "users"
end
