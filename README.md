# Portfolio Website

A responsive portfolio built with React and Vite, backed by a Rails API that
pulls project and language data live from the GitHub API.

The Projects and Stats sections are **dynamic**: repositories, languages, stars,
forks and last-commit times come from GitHub rather than being hand-maintained in
component files. Push a repo and it shows up. The rest of the site (experience,
education, certifications, contact) stays static, because none of it is anything
GitHub knows about.

## Architecture

```
GitHub REST API
      |
      v
server/  Rails 8 + PostgreSQL     <-- caches GitHub, applies your curation
      |  GET /api/v1/projects
      |  GET /api/v1/stats
      v
src/  React + Vite             <-- renders live data, falls back to src/data/
```

Two properties worth knowing:

- **The site never breaks when the API is down.** Every live section falls back to
  a bundled snapshot in `src/data/`. With `VITE_API_URL` unset it renders that
  snapshot immediately and skips the loading state entirely.
- **GitHub data is curated, not raw.** Repo descriptions are thin and some repos
  should not be on a portfolio at all, so the API layers your own titles,
  descriptions, tags, ordering and hidden flags on top. See
  [server/README.md](server/README.md#curating-what-appears).

## Features

- 🔄 Projects and stats pulled live from the GitHub API
- 📊 Language breakdown measured from actual bytes of code
- 🛟 Graceful fallback to a bundled snapshot when the API is unreachable
- 🧊 Pointer-tracked 3D tilt on cards, with a moving specular highlight
- 🪐 Layered 3D hero scene with depth parallax on the tech stack
- 🎨 Ruby-on-warm-dark palette driven entirely by CSS custom properties
- 🎬 Scroll-reveal sections, count-up stats and bars that fill on entry
- ♿ Every animation respects `prefers-reduced-motion`
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast performance with Vite
- 📧 Contact form
- 💼 Certifications, resume and experience sections

## Sections

1. **Hero** - Introduction with call-to-action buttons
2. **Stats** - Live GitHub totals and language breakdown
3. **About** - Personal information
4. **Skills** - Technical skills with progress indicators
5. **Experience** / **Education** / **Certifications** - Static content
6. **Projects** - Live from GitHub, curated via the API
7. **Contact** - Contact form and information
8. **Footer** - Social links and copyright

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Ruby 3.2+ and PostgreSQL, only if you want to run the API locally

### Frontend only

The site runs standalone against the bundled snapshot:

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. The Projects and Stats sections will show
"Showing a saved snapshot" until an API is configured.

### With live GitHub data

Start the API (see [server/README.md](server/README.md) for the full setup):

```bash
cd server
bundle install
bin/rails db:create db:migrate db:seed
bin/rails github:sync
bin/rails server -p 3001
```

Then point the frontend at it:

```bash
cp .env.example .env     # VITE_API_URL=http://localhost:3001
npm run dev
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory. `VITE_API_URL` is baked in at
build time, so set it in your Vercel project's environment variables and redeploy
after changing it.

## Customization

### Personal Information

1. **Hero Section** (`src/components/Hero.jsx`):
   - Update name, title, and description
   - Change social media links (GitHub, LinkedIn, Email)
   - Update avatar placeholder initials

2. **About Section** (`src/components/About.jsx`):
   - Modify the about text
   - Update statistics (projects, experience, clients)

3. **Skills Section** (`src/components/Skills.jsx`):
   - Add/remove skills
   - Adjust skill levels (percentage)
   - Change skill icons from react-icons

4. **Projects Section** - no longer edited here. Projects come from the GitHub
   API; to change a title, description, tags, order, or to hide a repo, edit the
   override in `server/db/seeds.rb` and run `bin/rails db:seed`. See
   [server/README.md](server/README.md#curating-what-appears).

5. **Contact Section** (`src/components/Contact.jsx`):
   - Update email, phone, and location
   - Connect the form to a backend service or email service

6. **Footer** (`src/components/Footer.jsx`):
   - Update copyright name
   - Update social media links

### Styling

The palette is **ruby on warm dark**, defined once as custom properties in
[src/index.css](src/index.css). Change a token there and the whole site follows —
no component CSS file hardcodes a brand colour any more.

| Token | Value | Use |
| ----- | ----- | --- |
| `--primary-color` / `--primary-rgb` | `#e01e41` | Lead ruby accent |
| `--ruby-bright` / `--ruby-deep` | `#ff2e55` / `#8f1128` | Highlights and shadowed ends of gradients |
| `--secondary-color` | `#ff8a3d` | Amber, the warm counterpart |
| `--accent-color` | `#ffc357` | Gold, for gradient tails |
| `--accent-plum` | `#a01a5c` | Cool counterweight, gradients only |
| `--bg-primary` / `--bg-secondary` / `--bg-elevated` | `#130f0e` / `#1e1614` / `#291d1a` | Warm dark surfaces |
| `--gradient-warm` / `--gradient-deep` | ruby→amber→gold / plum→ruby→amber | Headings, bars, banners |
| `--depth-sm` / `--depth-md` / `--depth-lg` / `--depth-glow` | warm-tinted shadows | Raised surfaces |

Translucent layers use the `*-rgb` tokens, e.g.
`background: rgba(var(--primary-rgb), 0.12)`.

Shadows are warm-tinted rather than neutral black, so raised surfaces sit in the
same light as the palette instead of looking grey.

### 3D and motion

Three reusable pieces drive the whole effect:

| Piece | What it does |
| ----- | ------------ |
| [Tilt3D.jsx](src/components/Tilt3D.jsx) + [useTilt.js](src/hooks/useTilt.js) | Pointer-tracked card tilt with a moving specular highlight |
| [usePointerParallax.js](src/hooks/usePointerParallax.js) | Drives the hero's floating stack scene at multiple depths |
| [Reveal.jsx](src/components/Reveal.jsx) + [useScrollReveal.js](src/hooks/useScrollReveal.js) | Reveals sections on scroll, once each |

`useTilt` writes CSS variables (`--tilt-x`, `--tilt-y`, `--glare-x`,
`--tilt-active`) onto the element rather than setting `transform` directly, so
stylesheets stay in control of how the numbers are used. Children opt into depth
with the `.depth-1` / `.depth-2` / `.depth-3` helpers in
[Tilt3D.css](src/components/Tilt3D.css).

**One gotcha when styling a tilted card:** `Tilt3D`'s `className` lands on the
same element as `.tilt3d-surface`, which owns `transform` and `transition`.
Declaring either in your own rule silently overrides the tilt — keep those rules
to paint properties (background, border, box-shadow) and drive hover states off
`var(--tilt-active)` instead of `:hover` where you want them in step with the lift.

Every animation is gated behind `prefers-reduced-motion: reduce`. When it is set,
tilt and parallax are skipped entirely, the specular highlight is hidden, and
progress bars and counters render at their final values immediately — content is
never hidden behind an animation that will not run.

### A note on global CSS

Vite bundles every imported stylesheet into one global sheet, so class names are
shared across routes whether or not the components are. The resume page's classes
are therefore prefixed `resume-*` to keep them from colliding with the home page's
(`.projects-grid`, `.project-card`, `.section-title` and friends previously
collided, and the resume rules were winning). Prefix or scope any new page-specific
class you add.

### Project card visuals

Project cards use a gradient banner rather than a screenshot, since the GitHub API
returns no image for a repository. Set a per-project `gradient` and `icon_key` in
the API override to control it; repos with no override get a colour and icon
derived from their primary language (`src/lib/projectVisuals.jsx`).

### Refreshing the offline snapshot

`src/data/fallbackProjects.js` and `src/data/fallbackStats.js` are what visitors
see if the API is unreachable. Update them occasionally so the fallback does not
drift:

```bash
curl "$VITE_API_URL/api/v1/projects" | jq '.projects'
curl "$VITE_API_URL/api/v1/stats" | jq
```

## Project Structure

```
portfolio/
├── server/                     Rails 8 API (see server/README.md)
│   ├── app/services/github/    GitHub client and sync services
│   ├── app/models/             Project, ProjectOverride, ProfileSnapshot
│   ├── app/serializers/        JSON shapes consumed by the frontend
│   └── db/seeds.rb             Project curation lives here
├── public/
├── src/
│   ├── components/             Navbar, Hero, Stats, Projects, Contact, ...
│   ├── data/                   Offline fallback snapshots
│   ├── hooks/
│   │   └── useLiveData.js      Fetch + fallback for any live section
│   ├── lib/
│   │   ├── api.js              API client (timeouts, error handling)
│   │   ├── format.js           Relative dates, compact numbers
│   │   └── projectVisuals.jsx  icon_key / language -> icon + gradient
│   ├── pages/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── index.html
├── package.json
└── vite.config.js
```

## Technologies Used

**Frontend:** React 19, Vite, React Icons, CSS3

**Backend:** Ruby on Rails 8 (API mode), PostgreSQL, Faraday, rack-cors

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to fork this project and customize it for your own portfolio!

## Support

If you have any questions or need help customizing your portfolio, feel free to open an issue or reach out!
# portfolio
