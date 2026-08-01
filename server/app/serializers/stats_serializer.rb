# Shapes the numbers rendered by src/components/Stats.jsx.
#
# Every figure here is measured from GitHub rather than hand-written, so the
# stats section cannot drift out of date.
class StatsSerializer
  # career_start is when the first professional role began, which GitHub cannot
  # know. Override with CAREER_START_DATE (YYYY-MM-DD).
  DEFAULT_CAREER_START = "2024-12-01".freeze

  def initialize(snapshot, projects_scope: Project.showcased)
    @snapshot = snapshot
    @projects_scope = projects_scope
  end

  def as_json(*)
    {
      profile: profile,
      totals: totals,
      languages: snapshot.language_breakdown,
      syncedAt: snapshot.synced_at.iso8601,
      stale: Github::Sync.stale?
    }
  end

  private

  attr_reader :snapshot, :projects_scope

  def profile
    {
      login: snapshot.login,
      name: snapshot.name,
      bio: snapshot.bio,
      location: snapshot.location,
      avatarUrl: snapshot.avatar_url,
      htmlUrl: snapshot.html_url
    }
  end

  def totals
    {
      showcasedProjects: projects_scope.count,
      publicRepos: snapshot.public_repos,
      stars: snapshot.total_stars,
      forks: snapshot.total_forks,
      followers: snapshot.followers,
      languages: snapshot.language_bytes.size,
      yearsExperience: years_experience,
      lastPushedAt: snapshot.last_pushed_at&.iso8601
    }
  end

  def years_experience
    start = Date.parse(ENV.fetch("CAREER_START_DATE", DEFAULT_CAREER_START))
    [ ((Date.current - start) / 365.25).floor, 0 ].max
  rescue Date::Error
    0
  end
end
