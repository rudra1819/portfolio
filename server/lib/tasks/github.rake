namespace :github do
  desc "Pull repos, languages and profile stats from GitHub into the local database"
  task sync: :environment do
    result = Github::Sync.call
    puts "Synced #{result[:synced]} repo(s) for #{result[:profile]} in #{result[:duration_ms]}ms " \
         "(#{result[:language_calls]} language lookups, #{result[:removed]} removed)"
  rescue Github::Client::RateLimited => e
    abort "Rate limited: #{e.message}"
  rescue Github::Client::Error => e
    abort "Sync failed: #{e.message}"
  end

  desc "Show what the portfolio would render, without starting the server"
  task preview: :environment do
    snapshot = ProfileSnapshot.current
    abort "No sync yet - run `bin/rails github:sync` first." if snapshot.nil?

    age = ActionController::Base.helpers.time_ago_in_words(snapshot.synced_at)
    puts "Profile: #{snapshot.name} (@#{snapshot.login}) - synced #{age} ago"
    puts "Repos: #{snapshot.public_repos} public, #{snapshot.total_stars} stars, #{snapshot.total_forks} forks"
    puts
    puts "Languages:"
    snapshot.language_breakdown.each { |l| puts format("  %-14s %5.1f%%", l[:name], l[:percent]) }
    puts
    puts "Showcased projects (in render order):"
    Project.showcased.includes(:override).each_with_index do |project, i|
      flag = project.featured? ? "*" : " "
      puts format("  %s%2d. %-26s %-10s %s", flag, i + 1, project.title, project.primary_language || "-", project.technologies.join(", "))
    end

    hidden = ProjectOverride.hidden.pluck(:repo_name)
    puts "\nHidden: #{hidden.join(', ')}" if hidden.any?

    orphans = ProjectOverride.orphaned.pluck(:repo_name)
    if orphans.any?
      puts "\nWARNING: #{orphans.size} override(s) point at repos that do not exist on GitHub:"
      orphans.each { |name| puts "  - #{name}" }
    end
  end

  desc "Report remaining GitHub API rate limit"
  task rate_limit: :environment do
    limit = Github::Client.new.rate_limit
    core = limit.dig("resources", "core") || {}
    puts "core: #{core['remaining']}/#{core['limit']} remaining, resets at #{Time.zone.at(core['reset'].to_i)}"
    puts "(set GITHUB_TOKEN to raise the limit from 60/hour to 5000/hour)" if Rails.application.config.x.github_token.blank?
  end
end
