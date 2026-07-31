module Github
  # Thin wrapper over the GitHub REST API.
  #
  # Only public read endpoints are used. A token is optional but strongly
  # recommended: unauthenticated requests are limited to 60/hour per IP, which a
  # single deploy plus a few page loads can exhaust.
  class Client
    API_ROOT = "https://api.github.com".freeze
    USER_AGENT = "portfolio-api (+https://github.com/rudra1819/portfolio)".freeze

    Error = Class.new(StandardError)
    NotFound = Class.new(Error)
    RateLimited = Class.new(Error)

    def initialize(token: Rails.application.config.x.github_token, timeout: 10)
      @token = token
      @timeout = timeout
    end

    def user(username)
      get("/users/#{username}")
    end

    # GitHub caps per_page at 100 and paginates beyond that.
    def repos(username, per_page: 100, max_pages: 5)
      paginate("/users/#{username}/repos", per_page:, max_pages:, params: { sort: "pushed" })
    end

    # => { "Ruby" => 48213, "HTML" => 9120 }
    def languages(full_name)
      get("/repos/#{full_name}/languages")
    rescue NotFound
      {}
    end

    def rate_limit
      get("/rate_limit")
    end

    private

    attr_reader :token, :timeout

    def paginate(path, per_page:, max_pages:, params: {})
      results = []

      (1..max_pages).each do |page|
        batch = get(path, params.merge(per_page:, page:))
        break if batch.blank?

        results.concat(batch)
        break if batch.size < per_page
      end

      results
    end

    def get(path, params = {})
      response = connection.get(path, params)

      case response.status
      when 200 then response.body
      when 404 then raise NotFound, "GitHub returned 404 for #{path}"
      when 403, 429
        raise RateLimited, rate_limit_message(response)
      else
        raise Error, "GitHub returned #{response.status} for #{path}: #{response.body.to_s.truncate(200)}"
      end
    rescue Faraday::TimeoutError, Faraday::ConnectionFailed => e
      raise Error, "Could not reach GitHub (#{e.class}): #{e.message}"
    end

    def rate_limit_message(response)
      remaining = response.headers["x-ratelimit-remaining"]
      resets_at = response.headers["x-ratelimit-reset"].presence&.then { |ts| Time.zone.at(ts.to_i) }

      if remaining == "0"
        "GitHub rate limit exhausted, resets at #{resets_at&.iso8601 || 'unknown'}." \
          "#{' Set GITHUB_TOKEN to raise the limit to 5000/hour.' if token.blank?}"
      else
        "GitHub refused the request (#{response.status}): #{response.body.to_s.truncate(200)}"
      end
    end

    def connection
      @connection ||= Faraday.new(url: API_ROOT, headers: default_headers) do |f|
        f.request :json
        f.request :retry,
          max: 2,
          interval: 0.5,
          backoff_factor: 2,
          retry_statuses: [ 500, 502, 503, 504 ],
          exceptions: [ Faraday::TimeoutError, Faraday::ConnectionFailed ]
        f.response :json, content_type: /\bjson$/
        f.options.timeout = timeout
        f.options.open_timeout = 5
      end
    end

    def default_headers
      headers = {
        "Accept" => "application/vnd.github+json",
        "X-GitHub-Api-Version" => "2022-11-28",
        "User-Agent" => USER_AGENT
      }
      headers["Authorization"] = "Bearer #{token}" if token.present?
      headers
    end
  end
end
