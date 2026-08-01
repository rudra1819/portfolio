# Allow the Vite frontend to call this API from the browser.
#
# ALLOWED_ORIGINS is a comma-separated list, e.g.
#   ALLOWED_ORIGINS="https://bharat-portfolio.vercel.app,https://bharatgoswami.dev"
#
# Local Vite dev/preview ports are added automatically in development and test.
# See config/application.rb for how the list is assembled.
#
# Read more: https://github.com/cyu/rack-cors
origins = Rails.application.config.x.allowed_origins

if origins.any?
  Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins(*origins)

      resource "/api/*",
        headers: :any,
        methods: %i[get post options head],
        expose: %w[X-Synced-At X-Stale]
    end
  end
else
  Rails.logger.warn("[cors] ALLOWED_ORIGINS is empty - browser requests will be blocked") if Rails.env.production?
end
