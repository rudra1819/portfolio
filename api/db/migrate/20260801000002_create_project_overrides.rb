class CreateProjectOverrides < ActiveRecord::Migration[8.1]
  def change
    create_table :project_overrides do |t|
      # Matches Project#name. Kept as a loose string key rather than a foreign
      # key so an override can be written before its repo exists (or survive a
      # repo being renamed and renamed back).
      t.string  :repo_name, null: false

      t.string  :title
      t.text    :description
      t.string  :demo_url
      t.jsonb   :technologies, null: false, default: []
      t.string  :icon_key
      t.string  :gradient
      t.boolean :hidden, null: false, default: false
      t.boolean :featured, null: false, default: false
      t.integer :position

      t.timestamps
    end

    add_index :project_overrides, :repo_name, unique: true
  end
end
