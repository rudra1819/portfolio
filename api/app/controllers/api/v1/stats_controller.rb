module Api
  module V1
    class StatsController < BaseController
      # GET /api/v1/stats
      def show
        snapshot = ProfileSnapshot.current
        return no_data_yet if snapshot.nil?

        with_freshness_headers(snapshot.synced_at)

        render json: StatsSerializer.new(snapshot).as_json
      end
    end
  end
end
