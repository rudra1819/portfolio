# Hand-written curation layered on top of a synced GitHub repo.
#
# GitHub descriptions and topics are usually thinner than what a portfolio
# needs, and some repos should not be shown at all. This table is never touched
# by the sync, so anything set here survives every refresh.
class ProjectOverride < ApplicationRecord
  has_one :project,
    foreign_key: :name,
    primary_key: :repo_name,
    inverse_of: :override,
    dependent: nil

  validates :repo_name, presence: true, uniqueness: true
  validates :position, numericality: { only_integer: true, allow_nil: true }

  normalizes :repo_name, with: ->(value) { value.to_s.strip }

  scope :hidden, -> { where(hidden: true) }
  scope :featured, -> { where(featured: true) }

  # Overrides pointing at repos that no longer exist on GitHub. A renamed or
  # deleted repo leaves its curation behind, and silently dropping the copy would
  # be worse than surfacing it - Github::Sync logs these and `github:preview`
  # prints them.
  scope :orphaned, -> { where.missing(:project) }
end
