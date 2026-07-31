# Portfolio API

Rails 8 API that mirrors public GitHub data into PostgreSQL and serves it to the
React frontend in `../`.

The frontend never calls GitHub directly. Going through this service means the
token stays server-side, the 60-requests/hour unauthenticated limit is spent once
per sync rather than once per visitor, and the site keeps working from cached
data when GitHub is unreachable.

## How it fits together

```
GitHub REST API
      |  bin/rails github:sync   (cron, or on-demand when data goes stale)
      v
PostgreSQL - projects ----------- mirrored repo data, overwritten every sync
           - project_overrides -- your curation, never touched by the sync
           - profile_snapshots -- profile + rolled-up totals, one row per sync
      |  GET /api/v1/projects, GET /api/v1/stats
      v
React frontend (falls back to src/data/ if this API is unreachable)
```

`projects` is disposable: anything written there is replaced on the next sync.
Hand-written copy belongs in `project_overrides`.

## Endpoints

| Method | Path                 | Purpose |
| ------ | -------------------- | ------- |
| GET    | `/api/v1/projects`   | Curated, ordered project cards. `?featured=true`, `?limit=6`, `?with_code=true` |
| GET    | `/api/v1/stats`      | Profile, totals and the language breakdown |
| POST   | `/api/v1/sync`       | Force a refresh. Requires `X-Sync-Token`; returns 403 until `SYNC_TOKEN` is set |
| GET    | `/up`                | Health check for the host |

Read responses carry `X-Synced-At` and `X-Stale` headers, and are served entirely
from PostgreSQL - a request never blocks on GitHub.

## Local setup

```bash
cd api
bundle install
bin/rails db:create db:migrate db:seed   # db:seed loads the curation overrides
bin/rails github:sync                    # first pull from GitHub
bin/rails server -p 3001
```

Then point the frontend at it by setting `VITE_API_URL=http://localhost:3001` in
`../.env`.

Development uses PostgreSQL peer auth as your OS user, so no username or password
is configured. Production reads `DATABASE_URL`.

## Configuration

See `.env.example`. The one worth setting early is `GITHUB_TOKEN`: without it
GitHub allows 60 requests/hour per IP, and one sync of 12 repos already costs 12.
A fine-grained token with **no scopes selected** is enough, since only public data
is read.

## Rake tasks

```bash
bin/rails github:sync         # pull repos, languages and profile stats
bin/rails github:preview      # print exactly what the site will render
bin/rails github:rate_limit   # check remaining GitHub quota
```

`github:preview` is the quickest way to see the effect of an override, and warns
about overrides pointing at repos that no longer exist on GitHub.

## Curating what appears

Everything measurable comes from GitHub. Everything editorial comes from
`project_overrides`, which the sync never overwrites.

```ruby
bin/rails console

# Better copy than the repo description
ProjectOverride.find_or_create_by!(repo_name: "studentmart").update!(
  title: "StudentMart",
  description: "A student management platform built with Ruby on Rails.",
  technologies: ["Ruby on Rails", "PostgreSQL"],
  featured: true,
  position: 1
)

# Keep a repo off the site entirely
ProjectOverride.find_or_create_by!(repo_name: "toy-app").update!(hidden: true)
```

Ordering is: featured first, then `position` ascending, then most recently pushed.
Forks and archived repos are excluded automatically.

When `technologies` is set it replaces the auto-detected tags entirely, because
mixing them in produces near-duplicates like `HTML5` next to `HTML`. Repos with no
override fall back to GitHub topics plus detected languages.

Committing curation to `db/seeds.rb` instead of only running it in the console
means it survives a database reset - `db:seed` is idempotent.

## Keeping data fresh

Two mechanisms, and you want the cron one in production:

1. **On-demand** - a request arriving more than `SYNC_TTL_MINUTES` after the last
   sync serves cached data and enqueues a background refresh. A cache lock stops a
   burst of visitors from queueing redundant syncs, and a rate-limit response
   triggers a 15-minute backoff.
2. **Cron** - hit `POST /api/v1/sync` on a schedule. This is what keeps the site
   fresh for the first visitor of the day rather than serving them stale data.

The background refresh runs on Rails' default async queue adapter, which lives in
the web process and loses queued jobs on restart. That is acceptable here because
the cron job is the real guarantee and the worst case is serving slightly older
data. If you would rather it be durable, add Solid Queue.

### GitHub Actions cron

No `GITHUB_TOKEN` needed here - the workflow only calls your own API.

```yaml
# .github/workflows/sync-portfolio.yml
name: Sync portfolio
on:
  schedule:
    - cron: "0 */6 * * *"   # every 6 hours
  workflow_dispatch:
  push:
    branches: [main]        # refresh right after you ship something

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger sync
        run: |
          curl --fail --silent --show-error \
            -X POST \
            -H "X-Sync-Token: ${{ secrets.PORTFOLIO_SYNC_TOKEN }}" \
            "${{ secrets.PORTFOLIO_API_URL }}/api/v1/sync"
```

Add `PORTFOLIO_SYNC_TOKEN` and `PORTFOLIO_API_URL` under repository
Settings -> Secrets and variables -> Actions.

## Deploying

Any Postgres-capable host works. On Render, as a web service:

- Build: `bundle install && bin/rails db:migrate`
- Start: `bundle exec puma -C config/puma.rb`
- Health check path: `/up`
- Attach a Postgres instance so `DATABASE_URL` is injected

Environment variables to set: `RAILS_ENV=production`, `SECRET_KEY_BASE`
(`bin/rails secret`), `GITHUB_USERNAME`, `GITHUB_TOKEN`, `ALLOWED_ORIGINS`,
`SYNC_TOKEN`, `CAREER_START_DATE`.

`config/master.key` is gitignored, so set `SECRET_KEY_BASE` directly rather than
relying on encrypted credentials.

Run `bin/rails db:seed` once after the first deploy to load the curation
overrides, then `bin/rails github:sync` (or POST to `/api/v1/sync`) to populate.

Two things to get right:

- **`ALLOWED_ORIGINS` must list your real frontend origin**, comma separated, or
  the browser blocks every request. Local Vite ports are allowed automatically in
  development only.
- **Free tiers sleep.** A cold start can take ~30s, longer than the frontend's 8s
  fetch timeout, so the first visitor after an idle period sees the bundled
  fallback. The cron sync keeps the service warm as a side effect.
