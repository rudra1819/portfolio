class CreateProfileSnapshots < ActiveRecord::Migration[8.1]
  def change
    # One row per sync, so the newest row is the current profile and older rows
    # give the stats section something to trend against later.
    create_table :profile_snapshots do |t|
      t.string  :login, null: false
      t.string  :name
      t.text    :bio
      t.string  :company
      t.string  :location
      t.string  :blog
      t.string  :avatar_url
      t.string  :html_url
      t.integer :public_repos, null: false, default: 0
      t.integer :followers, null: false, default: 0
      t.integer :following, null: false, default: 0
      t.integer :total_stars, null: false, default: 0
      t.integer :total_forks, null: false, default: 0
      t.jsonb   :language_bytes, null: false, default: {}
      t.datetime :last_pushed_at
      t.datetime :account_created_at
      t.datetime :synced_at, null: false

      t.timestamps
    end

    add_index :profile_snapshots, :synced_at
  end
end
