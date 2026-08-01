# A GitHub repository, cached locally by Github::SyncRepos.
#
# Everything in this table is owned by the sync and will be overwritten on the
# next run - hand-written copy belongs in ProjectOverride instead.
class Project < ApplicationRecord
  # Not a foreign key: overrides are keyed by repo name so they can be written
  # before the repo has ever been synced.
  has_one :override,
    class_name: "ProjectOverride",
    foreign_key: :repo_name,
    primary_key: :name,
    inverse_of: :project,
    dependent: nil

  validates :github_id, presence: true, uniqueness: true
  validates :name, presence: true, uniqueness: true
  validates :full_name, :html_url, :synced_at, presence: true

  # Forks and archived repos are noise on a portfolio, and an override can hide
  # anything else that is not worth showing.
  scope :showcased, -> {
    where(fork: false, archived: false)
      .left_joins(:override)
      .where(project_overrides: { hidden: [ false, nil ] })
      .order(Arel.sql(<<~SQL.squish))
        project_overrides.featured DESC NULLS LAST,
        project_overrides.position ASC NULLS LAST,
        projects.pushed_at DESC NULLS LAST
      SQL
  }

  # Repos GitHub reports as having no code of a recognised language, which are
  # usually notes or exercise dumps.
  scope :with_code, -> { where.not(primary_language: nil) }

  def title
    override&.title.presence || name.tr("_-", "  ").squish.titleize
  end

  def summary
    override&.description.presence ||
      description.presence ||
      "#{primary_language || 'Source'} project - see the repository for details."
  end

  def demo_url
    override&.demo_url.presence || homepage.presence
  end

  # Curated tags win outright when present: they are the whole point of the
  # override, and mixing in GitHub's detected languages produces near-duplicates
  # like "HTML5" next to "HTML". Only uncurated repos fall back to topics and
  # detected languages.
  def technologies(limit: 6)
    curated = Array(override&.technologies).reject(&:blank?)
    candidates =
      if curated.any?
        curated
      else
        Array(topics).map { |t| t.tr("-", " ").titleize } + top_languages(limit: 3)
      end

    candidates.each_with_object([]) do |tech, kept|
      next if tech.blank?

      key = tech.downcase.delete("^a-z0-9")
      next if kept.any? { |k| k.downcase.delete("^a-z0-9") == key }

      kept << tech
    end.first(limit)
  end

  # Language names ordered by how many bytes of each GitHub found.
  def top_languages(limit: 3)
    languages.sort_by { |_name, bytes| -bytes.to_i }.first(limit).map(&:first)
  end

  def language_share
    total = languages.values.sum(&:to_i)
    return {} if total.zero?

    languages.transform_values { |bytes| (bytes.to_i * 100.0 / total).round(1) }
  end

  def featured?
    override&.featured || false
  end
end
