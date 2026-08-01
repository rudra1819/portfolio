module Github
  # Mirrors every public repo for the configured account into the projects
  # table. Safe to run repeatedly: repos are matched on github_id so a rename
  # updates the existing row instead of creating a duplicate.
  class SyncRepos
    def initialize(client: Client.new, username: Rails.application.config.x.github_username)
      @client = client
      @username = username
    end

    # => { synced: 12, removed: 0, language_calls: 10 }
    def call
      now = Time.current
      payloads = client.repos(username)
      language_calls = 0

      seen_ids = payloads.map do |payload|
        # Languages are a separate request per repo, so only spend rate limit on
        # repos that can actually appear on the site.
        languages =
          if payload["fork"] || payload["archived"]
            {}
          else
            language_calls += 1
            client.languages(payload["full_name"])
          end

        upsert(payload, languages, now).github_id
      end

      removed = Project.where.not(github_id: seen_ids).delete_all

      { synced: seen_ids.size, removed:, language_calls: }
    end

    private

    attr_reader :client, :username

    def upsert(payload, languages, now)
      project = Project.find_or_initialize_by(github_id: payload["id"])

      project.update!(
        name: payload["name"],
        full_name: payload["full_name"],
        html_url: payload["html_url"],
        homepage: payload["homepage"].presence,
        description: payload["description"].presence,
        primary_language: payload["language"].presence,
        languages: languages.presence || {},
        topics: payload["topics"] || [],
        stargazers_count: payload["stargazers_count"].to_i,
        forks_count: payload["forks_count"].to_i,
        open_issues_count: payload["open_issues_count"].to_i,
        size_kb: payload["size"].to_i,
        fork: payload["fork"] || false,
        archived: payload["archived"] || false,
        pushed_at: payload["pushed_at"],
        repo_created_at: payload["created_at"],
        synced_at: now
      )

      project
    end
  end
end
