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

ActiveRecord::Schema[7.0].define(version: 2024_10_30_084000) do
  create_table "budgets", force: :cascade do |t|
    t.boolean "active", default: true
    t.decimal "amount", precision: 10, scale: 2
    t.string "main_category"
    t.string "sub_category"
    t.text "description"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_budgets_on_user_id"
  end

  create_table "common_categories", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "active", default: true
    t.string "name"
    t.string "code"
    t.string "type", limit: 25
    t.string "category_type"
    t.integer "ref_id"
    t.string "ref_code"
    t.check_constraint "[category_type]='sub' AND [ref_id] IS NOT NULL AND [ref_code] IS NOT NULL OR [category_type]<>'sub'", name: "check_ref_id_ref_code"
  end

  create_table "transactions", force: :cascade do |t|
    t.boolean "active"
    t.decimal "amount", precision: 10, scale: 2
    t.string "user_category"
    t.datetime "trans_date"
    t.text "description"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "trans_no"
    t.integer "main_category_id"
    t.string "main_category_code"
    t.index ["trans_no"], name: "index_transactions_on_trans_no", unique: true
    t.index ["user_id"], name: "index_transactions_on_user_id"
  end

  create_table "user_categories", force: :cascade do |t|
    t.datetime "created_at", default: -> { "getdate()" }, null: false
    t.datetime "updated_at", default: -> { "getdate()" }, null: false
    t.boolean "active", default: true
    t.string "name"
    t.string "code"
    t.string "type", limit: 25
    t.string "user_category_type"
    t.integer "ref_id"
    t.string "ref_code"
    t.bigint "common_category_id"
    t.string "common_category_code"
    t.index ["common_category_id"], name: "index_user_categories_on_common_category_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.varchar "name", limit: 50
  end

  add_foreign_key "budgets", "users"
  add_foreign_key "transactions", "users"
  add_foreign_key "user_categories", "common_categories", on_delete: :nullify
end
