require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
# require "active_storage/engine"
require "action_controller/railtie"
# require "action_mailer/railtie"
# require "action_mailbox/engine"
# require "action_text/engine"
require "action_view/railtie"
# require "action_cable/engine"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Api
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 8.1

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w[assets tasks])

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true

    # ---- Portfolio settings -------------------------------------------------

    # GitHub account the portfolio pulls its live project data from.
    config.x.github_username = ENV.fetch("GITHUB_USERNAME", "rudra1819")

    # Optional personal access token. Unauthenticated GitHub requests are capped
    # at 60/hour, a token raises that to 5,000/hour. Only public repo data is
    # read, so a token with no scopes selected is enough.
    config.x.github_token = ENV["GITHUB_TOKEN"].presence

    # A sync older than this is served but flagged stale, which triggers a
    # background refresh on the next request.
    config.x.sync_ttl = ENV.fetch("SYNC_TTL_MINUTES", 60).to_i.minutes

    # Shared secret required by POST /api/v1/sync, so only your cron job can
    # force a refresh. Generate with `rails secret`.
    config.x.sync_token = ENV["SYNC_TOKEN"].presence

    # Browser origins allowed to call this API.
    config.x.allowed_origins = ENV.fetch("ALLOWED_ORIGINS", "").split(",").map(&:strip).reject(&:empty?)
    if Rails.env.local?
      config.x.allowed_origins += %w[
        http://localhost:5173 http://127.0.0.1:5173
        http://localhost:4173 http://127.0.0.1:4173
      ]
    end
  end
end
