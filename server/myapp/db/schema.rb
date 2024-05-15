# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_05_15_110902) do
  create_table "rooms", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.integer "players_count", default: 0
    t.boolean "game_started", default: false
    t.string "password"
    t.boolean "password_status", default: false
    t.boolean "game_lock_status", default: false
    t.string "id_user_in_room"
  end

  create_table "users", force: :cascade do |t|
    t.text "login"
    t.text "password_digest"
    t.text "nickname"
    t.text "img_url"
    t.integer "count_race"
    t.integer "pbtime"
    t.integer "pbsymbols"
    t.datetime "created_at", precision: nil, default: -> { "CURRENT_TIMESTAMP" }
    t.datetime "updated_at", precision: nil, default: -> { "CURRENT_TIMESTAMP" }
    t.boolean "email_auto", default: false
    t.string "uid"
    t.string "token_email"
    t.string "token_password"
    t.string "jwt"
  end

end
