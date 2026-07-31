module Api
  module V1
    class ProjectsController < BaseController
      # GET /api/v1/projects
      #
      #   ?featured=true  only pinned projects
      #   ?limit=6        cap the number returned
      #   ?with_code=true drop repos GitHub found no recognised language in
      def index
        snapshot = ProfileSnapshot.current
        return no_data_yet if snapshot.nil?

        with_freshness_headers(snapshot.synced_at)

        render json: {
          projects: ProjectSerializer.collection(scoped_projects),
          syncedAt: snapshot.synced_at.iso8601,
          source: "github:#{snapshot.login}"
        }
      end

      private

      def scoped_projects
        scope = Project.showcased.includes(:override)
        scope = scope.where(project_overrides: { featured: true }) if params[:featured] == "true"
        scope = scope.with_code if params[:with_code] == "true"
        scope = scope.limit(limit) if limit
        scope
      end

      def limit
        value = params[:limit].to_i
        value.positive? ? [ value, 100 ].min : nil
      end
    end
  end
end
