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

ActiveRecord::Schema[7.0].define(version: 2024_11_29_102320) do
  create_table "accounts", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "bank_id", null: false
    t.string "name", null: false
    t.string "currency", default: "INR"
    t.decimal "initial_balance", precision: 15, scale: 2, default: 0.0
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bank_id"], name: "index_accounts_on_bank_id"
    t.index ["user_id"], name: "index_accounts_on_user_id"
  end

  create_table "banks", force: :cascade do |t|
    t.string "code", null: false
    t.string "name", null: false
    t.bigint "user_id", null: false
    t.boolean "active", default: false
    t.string "bank_owner_name"
    t.string "address1"
    t.string "address2"
    t.string "city"
    t.string "state"
    t.string "zip_code"
    t.string "country"
    t.string "ifsc_code"
    t.string "account_number"
    t.string "icon"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code"], name: "index_banks_on_code", unique: true, where: "([active]=(1))"
    t.index ["user_id"], name: "index_banks_on_user_id"
  end

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
    t.integer "sub_category_id"
    t.string "sub_category_code"
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
    t.bigint "user_id", null: false
    t.index ["common_category_id"], name: "index_user_categories_on_common_category_id"
    t.index ["user_id"], name: "index_user_categories_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.varchar "name", limit: 50
  end

  add_foreign_key "accounts", "banks"
  add_foreign_key "accounts", "users"
  add_foreign_key "banks", "users"
  add_foreign_key "budgets", "users"
  add_foreign_key "transactions", "users"
  add_foreign_key "user_categories", "common_categories", on_delete: :nullify
  add_foreign_key "user_categories", "users"
end
