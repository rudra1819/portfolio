module Github
  # Entry point for refreshing everything the portfolio pulls from GitHub.
  #
  #   Github::Sync.call              # always syncs
  #   Github::Sync.refresh_if_stale  # syncs in the background only when needed
  class Sync
    LOCK_KEY = "github:sync:running".freeze
    LOCK_TTL = 5.minutes
    COOLDOWN_KEY = "github:sync:cooldown".freeze

    class << self
      def call(...)
        new(...).call
      end

      def stale?
        snapshot = ProfileSnapshot.current
        return true if snapshot.nil?

        snapshot.synced_at < Rails.application.config.x.sync_ttl.ago
      end

      # Kicks off a background sync when the cached data has aged out. The lock
      # keeps a burst of page loads from queueing a dozen redundant syncs, each
      # of which would spend GitHub rate limit.
      def refresh_if_stale
        return false unless stale?
        return false if cooling_down?
        return false unless acquire_lock

        SyncGithubJob.perform_later
        true
      end

      def acquire_lock
        Rails.cache.write(LOCK_KEY, true, expires_in: LOCK_TTL, unless_exist: true)
      end

      def release_lock
        Rails.cache.delete(LOCK_KEY)
      end

      # Set after GitHub refuses us, so a stale portfolio does not hammer a
      # rate-limited API on every page load.
      def cool_down!(duration = 15.minutes)
        Rails.cache.write(COOLDOWN_KEY, true, expires_in: duration)
      end

      def cooling_down?
        Rails.cache.exist?(COOLDOWN_KEY)
      end
    end

    def initialize(client: Client.new)
      @client = client
    end

    # Raises Github::Client::Error on failure. Callers that serve web requests
    # should rescue it and fall back to whatever is already in the database -
    # stale projects beat an empty portfolio.
    def call
      started_at = Time.current
      repos = SyncRepos.new(client:).call
      snapshot = SyncProfile.new(client:).call

      result = repos.merge(
        profile: snapshot.login,
        synced_at: snapshot.synced_at,
        duration_ms: ((Time.current - started_at) * 1000).round
      )

      Rails.logger.info("[github:sync] #{result.to_json}")
      warn_about_orphaned_overrides

      result
    ensure
      self.class.release_lock
    end

    private

    attr_reader :client

    # An override whose repo is gone means curated copy is silently not being
    # shown. Worth a log line rather than failing the sync.
    def warn_about_orphaned_overrides
      orphans = ProjectOverride.orphaned.pluck(:repo_name)
      return if orphans.empty?

      Rails.logger.warn(
        "[github:sync] #{orphans.size} override(s) reference repos that do not exist on GitHub: #{orphans.join(', ')}"
      )
    end
  end
end
