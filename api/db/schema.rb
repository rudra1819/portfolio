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

ActiveRecord::Schema[8.1].define(version: 2026_08_01_000003) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "profile_snapshots", force: :cascade do |t|
    t.datetime "account_created_at"
    t.string "avatar_url"
    t.text "bio"
    t.string "blog"
    t.string "company"
    t.datetime "created_at", null: false
    t.integer "followers", default: 0, null: false
    t.integer "following", default: 0, null: false
    t.string "html_url"
    t.jsonb "language_bytes", default: {}, null: false
    t.datetime "last_pushed_at"
    t.string "location"
    t.string "login", null: false
    t.string "name"
    t.integer "public_repos", default: 0, null: false
    t.datetime "synced_at", null: false
    t.integer "total_forks", default: 0, null: false
    t.integer "total_stars", default: 0, null: false
    t.datetime "updated_at", null: false
    t.index ["synced_at"], name: "index_profile_snapshots_on_synced_at"
  end

  create_table "project_overrides", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "demo_url"
    t.text "description"
    t.boolean "featured", default: false, null: false
    t.string "gradient"
    t.boolean "hidden", default: false, null: false
    t.string "icon_key"
    t.integer "position"
    t.string "repo_name", null: false
    t.jsonb "technologies", default: [], null: false
    t.string "title"
    t.datetime "updated_at", null: false
    t.index ["repo_name"], name: "index_project_overrides_on_repo_name", unique: true
  end

  create_table "projects", force: :cascade do |t|
    t.boolean "archived", default: false, null: false
    t.datetime "created_at", null: false
    t.text "description"
    t.boolean "fork", default: false, null: false
    t.integer "forks_count", default: 0, null: false
    t.string "full_name", null: false
    t.bigint "github_id", null: false
    t.string "homepage"
    t.string "html_url", null: false
    t.jsonb "languages", default: {}, null: false
    t.string "name", null: false
    t.integer "open_issues_count", default: 0, null: false
    t.string "primary_language"
    t.datetime "pushed_at"
    t.datetime "repo_created_at"
    t.integer "size_kb", default: 0, null: false
    t.integer "stargazers_count", default: 0, null: false
    t.datetime "synced_at", null: false
    t.jsonb "topics", default: [], null: false
    t.datetime "updated_at", null: false
    t.index ["github_id"], name: "index_projects_on_github_id", unique: true
    t.index ["name"], name: "index_projects_on_name", unique: true
    t.index ["pushed_at"], name: "index_projects_on_pushed_at"
  end
end
