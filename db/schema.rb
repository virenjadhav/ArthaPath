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

ActiveRecord::Schema[7.0].define(version: 202412103111423) do
  create_table "accounts", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "bank_id", null: false
    t.string "name", null: false
    t.string "currency", default: "INR"
    t.decimal "initial_balance", precision: 15, scale: 2, default: 0.0
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "active", default: false
    t.string "bank_code"
    t.decimal "balance", precision: 18
    t.string "code"
    t.integer "lock_version", default: 0, null: false
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
    t.integer "lock_version", default: 0, null: false
    t.index ["user_id"], name: "index_banks_on_user_id"
  end

  create_table "budgets", force: :cascade do |t|
    t.boolean "active", default: true
    t.decimal "amount", precision: 10, scale: 2
    t.text "description"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "account_id", null: false
    t.string "account_code"
    t.integer "main_category_id", null: false
    t.string "main_category_code"
    t.integer "sub_category_id", null: false
    t.string "sub_category_code"
    t.string "payment_method"
    t.string "tag"
    t.string "period"
    t.datetime "from_date"
    t.datetime "to_date", precision: nil, null: false
    t.decimal "alert_amount", precision: 18
    t.integer "lock_version", default: 0, null: false
    t.index ["account_id"], name: "index_budgets_on_account_id"
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
    t.integer "lock_version", default: 0, null: false
    t.check_constraint "[category_type]='sub' AND [ref_id] IS NOT NULL AND [ref_code] IS NOT NULL OR [category_type]<>'sub'", name: "check_ref_id_ref_code"
  end

  create_table "currencies", force: :cascade do |t|
    t.boolean "active", null: false
    t.string "code", null: false
    t.boolean "is_default", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "currency_rates", force: :cascade do |t|
    t.string "from_currency", null: false
    t.string "to_currency", null: false
    t.decimal "conversion_rate", precision: 10, scale: 4, null: false
    t.date "rate_date", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["from_currency", "to_currency", "rate_date"], name: "index_currency_rates_on_from_currency_and_to_currency_and_rate_date", unique: true
  end

  create_table "debt_lines", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.bigint "transaction_id", null: false
    t.bigint "debt_id", null: false
    t.string "debt_code", null: false
    t.bigint "account_id", null: false
    t.string "account_code", null: false
    t.integer "main_category_id"
    t.string "main_category_code"
    t.integer "sub_category_id"
    t.string "sub_category_code"
    t.integer "amount", null: false
    t.datetime "pay_date", null: false
    t.string "debt_type", limit: 25, null: false
    t.string "payment_method", limit: 50
    t.string "debt_payment_type", limit: 50, null: false
    t.integer "serial_no", default: 101
    t.integer "lock_version", default: 0, null: false
    t.index ["account_id"], name: "index_debt_lines_on_account_id"
    t.index ["debt_id"], name: "index_debt_lines_on_debt_id"
    t.index ["transaction_id"], name: "index_debt_lines_on_transaction_id"
    t.index ["user_id"], name: "index_debt_lines_on_user_id"
  end

  create_table "debts", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "active", default: false, null: false
    t.bigint "user_id", null: false
    t.string "debt_code", null: false
    t.string "debt_name", null: false
    t.string "contact_no", limit: 50
    t.string "contact_email", limit: 250
    t.integer "amount", default: 0, null: false
    t.integer "debt_amount", default: 0, null: false
    t.string "interest_type", limit: 50, null: false
    t.integer "interest_rate", default: 0
    t.datetime "due_date"
    t.string "status", limit: 25
    t.string "debt_type", limit: 25, null: false
    t.string "attachment_file_name"
    t.string "payment_method", limit: 50
    t.string "description"
    t.integer "lock_version", default: 0, null: false
    t.index ["user_id"], name: "index_debts_on_user_id"
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
    t.string "source_type"
    t.string "payment_method"
    t.integer "lock_version", default: 0, null: false
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
    t.integer "lock_version", default: 0, null: false
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
  add_foreign_key "budgets", "accounts"
  add_foreign_key "budgets", "users"
  add_foreign_key "transactions", "users"
  add_foreign_key "user_categories", "common_categories", on_delete: :nullify
  add_foreign_key "user_categories", "users"
end
