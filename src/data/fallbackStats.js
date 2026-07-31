// Snapshot of GET /api/v1/stats, used when the API is unreachable.
//
// Refresh it with:
//   curl "$VITE_API_URL/api/v1/stats" | jq
export const fallbackStats = {
  profile: {
    login: 'rudra1819',
    name: 'Bharat Goswami',
    bio: null,
    location: 'Indore',
    avatarUrl: 'https://avatars.githubusercontent.com/u/146321875?v=4',
    htmlUrl: 'https://github.com/rudra1819',
  },
  totals: {
    showcasedProjects: 5,
    publicRepos: 12,
    stars: 0,
    forks: 0,
    followers: 1,
    languages: 9,
    yearsExperience: 1,
    lastPushedAt: '2026-01-21T03:56:15Z',
  },
  languages: [
    { name: 'Ruby', bytes: 225250, percent: 40.3 },
    { name: 'HTML', bytes: 200749, percent: 35.9 },
    { name: 'JavaScript', bytes: 60456, percent: 10.8 },
    { name: 'CSS', bytes: 51869, percent: 9.3 },
    { name: 'Dockerfile', bytes: 10883, percent: 1.9 },
    { name: 'Shell', bytes: 5062, percent: 0.9 },
    { name: 'Java', bytes: 3872, percent: 0.7 },
    { name: 'SCSS', bytes: 581, percent: 0.1 },
  ],
  syncedAt: null,
  stale: false,
};
