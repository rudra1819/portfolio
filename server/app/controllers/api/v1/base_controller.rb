module Api
  module V1
    class BaseController < ApplicationController
      private

      # Reads are served entirely from the database, so GitHub being down or
      # rate limited never breaks a page load. Refreshing happens in the
      # background once the cached sync has aged past SYNC_TTL_MINUTES.
      def with_freshness_headers(synced_at)
        Github::Sync.refresh_if_stale

        response.set_header("X-Synced-At", synced_at.iso8601)
        response.set_header("X-Stale", Github::Sync.stale?.to_s)
        # Allow brief reuse by a CDN or the browser while still permitting
        # revalidation, so a fresh sync shows up quickly.
        expires_in 5.minutes, public: true, stale_while_revalidate: 1.hour
      end

      def no_data_yet
        render json: {
          error: "no_data",
          message: "GitHub has not been synced yet. Run `bin/rails github:sync` in the API app."
        }, status: :service_unavailable
      end
    end
  end
end
