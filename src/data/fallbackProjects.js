// Snapshot of GET /api/v1/projects, used when the API is unreachable.
//
// Keep the shape identical to ProjectSerializer so the same renderer handles
// both paths. Refresh it with:
//   curl "$VITE_API_URL/api/v1/projects" | jq '.projects'
//
// Only repos that actually exist on GitHub belong here - a fallback card with a
// dead link is worse than no card.
export const fallbackProjects = [
  {
    id: 'studentmart',
    title: 'StudentMart',
    description:
      'A comprehensive student management platform built with Ruby on Rails, covering enrolment, catalogue and order flows.',
    technologies: ['Ruby on Rails', 'PostgreSQL', 'HTML5', 'CSS3'],
    github: 'https://github.com/rudra1819/studentmart',
    demo: null,
    language: 'HTML',
    stars: 0,
    forks: 0,
    featured: true,
    iconKey: 'graduation-cap',
    gradient: 'linear-gradient(135deg, #a01a5c, #e01e41)',
    pushedAt: '2025-11-20T22:20:19Z',
  },
  {
    id: 'HR-mitra',
    title: 'HR Mitra',
    description:
      'Human Resources management system for efficient HR operations, with background processing for payroll and reporting jobs.',
    technologies: ['Ruby on Rails', 'PostgreSQL', 'Sidekiq'],
    github: 'https://github.com/rudra1819/HR-mitra',
    demo: 'https://hr-mitra.vercel.app',
    language: 'HTML',
    stars: 0,
    forks: 0,
    featured: true,
    iconKey: 'users',
    gradient: 'linear-gradient(135deg, #e01e41, #ff6a3d)',
    pushedAt: '2025-11-29T15:16:14Z',
  },
  {
    id: 'ror-technical-challenge',
    title: 'ROR Technical Challenge',
    description:
      'Ruby on Rails technical challenge showcasing service objects, RESTful design and test coverage.',
    technologies: ['Ruby on Rails', 'PostgreSQL', 'RESTful APIs'],
    github: 'https://github.com/rudra1819/ror-technical-challenge',
    demo: null,
    language: 'Ruby',
    stars: 0,
    forks: 0,
    featured: true,
    iconKey: 'rails',
    gradient: 'linear-gradient(135deg, #8f1128, #d1342f)',
    pushedAt: '2025-11-07T18:49:55Z',
  },
  {
    id: 'portfolio',
    title: 'Developer Portfolio',
    description:
      'This site: a React frontend backed by a Rails API that pulls project and language data straight from the GitHub API.',
    technologies: ['React', 'Vite', 'Ruby on Rails', 'PostgreSQL'],
    github: 'https://github.com/rudra1819/portfolio',
    demo: null,
    language: 'JavaScript',
    stars: 0,
    forks: 0,
    featured: false,
    iconKey: 'code',
    gradient: 'linear-gradient(135deg, #ff6a3d, #ffc357)',
    pushedAt: '2026-01-21T03:56:15Z',
  },
  {
    id: 'student-record-manager',
    title: 'Student Record Manager',
    description:
      'A Java application to manage student records, built to practise core OOP design and file-backed persistence.',
    technologies: ['Java', 'OOP', 'File I/O'],
    github: 'https://github.com/rudra1819/student-record-manager',
    demo: null,
    language: 'Java',
    stars: 0,
    forks: 0,
    featured: false,
    iconKey: 'book',
    gradient: 'linear-gradient(135deg, #b5551f, #ff9a4d)',
    pushedAt: '2024-10-06T13:17:37Z',
  },
];
