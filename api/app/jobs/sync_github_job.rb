class SyncGithubJob < ApplicationJob
  queue_as :default

  # Retrying into a rate limit just burns the remaining quota. Back off instead
  # and let the next cron run pick it up - the site keeps serving cached data.
  discard_on Github::Client::RateLimited do |_job, error|
    Github::Sync.cool_down!
    Rails.logger.warn("[github:sync] backing off for 15 minutes: #{error.message}")
  end

  retry_on Github::Client::Error, wait: 30.seconds, attempts: 2

  def perform
    Github::Sync.call
  end
end
