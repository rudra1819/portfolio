// Products that are live on the public internet, as opposed to the GitHub repos
// in the Projects section. These are hand-written rather than synced, because a
// shipped product is not the same thing as a repository - there may be no public
// repo at all.
//
// Add new entries to the top of this array; the section renders them in order.
export const liveProjects = [
  {
    id: 'orange-bus',
    name: 'Orange Bus',
    role: 'Founder',
    url: 'https://orangebus.org',
    displayUrl: 'orangebus.org',
    tagline: 'Online bus ticket booking in India at the lowest prices',
    description:
      'An online platform for booking intercity bus tickets across India, built around ' +
      'finding travellers the lowest available fare for their route.',
    // TODO: fill these in and they render automatically.
    //   since        - e.g. 'Founded 2026', shown next to the role
    //   technologies - e.g. ['Ruby on Rails', 'PostgreSQL', 'Redis']
    // Both are omitted from the card while empty rather than showing a blank row.
    since: '',
    technologies: [],
    accent: 'linear-gradient(135deg, #ff6a3d, #ffc357)',
    initials: 'OB',
  },
];
