module Api
  module V1
    class SyncsController < BaseController
      before_action :authorize_sync!

      # POST /api/v1/sync
      #
      # Forces an immediate refresh. Intended for a cron job or a deploy hook:
      #   curl -X POST -H "X-Sync-Token: $SYNC_TOKEN" https://api.example.com/api/v1/sync
      def create
        render json: { ok: true, **Github::Sync.call }
      rescue Github::Client::RateLimited => e
        Github::Sync.cool_down!
        render json: { ok: false, error: "rate_limited", message: e.message }, status: :too_many_requests
      rescue Github::Client::Error => e
        render json: { ok: false, error: "github_unavailable", message: e.message }, status: :bad_gateway
      end

      private

      # Without a configured token the endpoint stays closed rather than
      # defaulting open - an unauthenticated sync is a free way to burn the
      # GitHub rate limit.
      def authorize_sync!
        expected = Rails.application.config.x.sync_token

        if expected.blank?
          return render json: {
            error: "sync_disabled",
            message: "Set SYNC_TOKEN to enable this endpoint."
          }, status: :forbidden
        end

        provided = request.headers["X-Sync-Token"].to_s
        return if ActiveSupport::SecurityUtils.secure_compare(provided, expected)

        render json: { error: "unauthorized" }, status: :unauthorized
      end
    end
  end
end
