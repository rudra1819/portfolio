# A point-in-time copy of the GitHub profile plus totals aggregated across all
# synced repos. Written by Github::SyncProfile on every sync; the newest row is
# what the stats endpoint serves.
class ProfileSnapshot < ApplicationRecord
  validates :login, :synced_at, presence: true

  scope :recent_first, -> { order(synced_at: :desc) }

  def self.current
    recent_first.first
  end

  # Keeps a rolling window so the table cannot grow without bound when the sync
  # runs on a cron.
  def self.prune(keep: 50)
    ids_to_keep = recent_first.limit(keep).pluck(:id)
    where.not(id: ids_to_keep).delete_all
  end

  # Percentage of code written in each language across every public repo,
  # largest first. This is the honest version of a "skills" chart - it is
  # measured rather than claimed.
  def language_breakdown(limit: 8)
    total = language_bytes.values.sum(&:to_i)
    return [] if total.zero?

    language_bytes
      .sort_by { |_name, bytes| -bytes.to_i }
      .first(limit)
      .map do |name, bytes|
        { name: name, bytes: bytes.to_i, percent: (bytes.to_i * 100.0 / total).round(1) }
      end
  end
end
