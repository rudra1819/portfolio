module Github
  # Records the GitHub profile plus totals rolled up from the projects table.
  #
  # Run this after SyncRepos so the aggregates reflect the current sync.
  class SyncProfile
    def initialize(client: Client.new, username: Rails.application.config.x.github_username)
      @client = client
      @username = username
    end

    def call
      payload = client.user(username)
      scope = Project.where(fork: false)

      ProfileSnapshot.create!(
        login: payload["login"],
        name: payload["name"].presence,
        bio: payload["bio"].presence,
        company: payload["company"].presence,
        location: payload["location"].presence,
        blog: payload["blog"].presence,
        avatar_url: payload["avatar_url"],
        html_url: payload["html_url"],
        public_repos: payload["public_repos"].to_i,
        followers: payload["followers"].to_i,
        following: payload["following"].to_i,
        total_stars: scope.sum(:stargazers_count),
        total_forks: scope.sum(:forks_count),
        language_bytes: aggregate_language_bytes(scope),
        last_pushed_at: scope.maximum(:pushed_at),
        account_created_at: payload["created_at"],
        synced_at: Time.current
      ).tap { ProfileSnapshot.prune }
    end

    private

    attr_reader :client, :username

    # Sums per-repo language byte counts into one account-wide breakdown.
    def aggregate_language_bytes(scope)
      scope.pluck(:languages).each_with_object(Hash.new(0)) do |languages, totals|
        languages.each { |name, bytes| totals[name] += bytes.to_i }
      end
    end
  end
end
