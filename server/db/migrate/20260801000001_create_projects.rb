class CreateProjects < ActiveRecord::Migration[8.1]
  def change
    create_table :projects do |t|
      t.bigint  :github_id, null: false
      t.string  :name, null: false
      t.string  :full_name, null: false
      t.string  :html_url, null: false
      t.string  :homepage
      t.text    :description
      t.string  :primary_language
      t.jsonb   :languages, null: false, default: {}
      t.jsonb   :topics, null: false, default: []
      t.integer :stargazers_count, null: false, default: 0
      t.integer :forks_count, null: false, default: 0
      t.integer :open_issues_count, null: false, default: 0
      t.integer :size_kb, null: false, default: 0
      t.boolean :fork, null: false, default: false
      t.boolean :archived, null: false, default: false
      t.datetime :pushed_at
      t.datetime :repo_created_at
      t.datetime :synced_at, null: false

      t.timestamps
    end

    add_index :projects, :github_id, unique: true
    add_index :projects, :name, unique: true
    add_index :projects, :pushed_at
  end
end
