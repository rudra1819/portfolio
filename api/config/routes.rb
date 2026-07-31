Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :projects, only: :index
      resource :stats, only: :show
      post "sync", to: "syncs#create"
    end
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Used by Render / Fly.io health checks and uptime monitors.
  get "up" => "rails/health#show", as: :rails_health_check

  root to: redirect("/api/v1/projects")
end
