import { FaCode, FaGithub, FaLayerGroup, FaProjectDiagram, FaRegClock } from 'react-icons/fa';
import { useLiveData } from '../hooks/useLiveData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';
import { fallbackStats } from '../data/fallbackStats';
import { timeAgo } from '../lib/format';
import Tilt3D from './Tilt3D';
import './Stats.css';

// Categorical palette for the language bar, held inside the site's ruby-to-gold
// range with plum at the cool end. Neighbouring entries are kept far enough apart
// in lightness to stay separable where two languages sit side by side in the bar.
const LANGUAGE_COLORS = {
  Ruby: '#e01e41',
  HTML: '#ff6a3d',
  JavaScript: '#ffc357',
  CSS: '#a01a5c',
  SCSS: '#d1568f',
  Java: '#ff9a4d',
  Dockerfile: '#c9782e',
  Shell: '#8f7a2e',
  TypeScript: '#9c2f5e',
  Python: '#b8863a',
};

const ACCENTS = ['#e01e41', '#ff8a3d', '#ffc357', '#a01a5c'];

const languageColor = (name, index) => LANGUAGE_COLORS[name] ?? ACCENTS[index % ACCENTS.length];

const buildCards = (totals, lastPush) => [
  {
    icon: <FaCode />,
    value: totals.showcasedProjects ?? 0,
    label: 'Projects Showcased',
    description: `${totals.publicRepos ?? 0} public repositories in total`,
  },
  {
    icon: <FaProjectDiagram />,
    value: totals.yearsExperience ?? 0,
    suffix: '+',
    label: 'Years Experience',
    description: 'Backend & DevOps development',
  },
  {
    icon: <FaLayerGroup />,
    value: totals.languages ?? 0,
    label: 'Languages Used',
    description: 'Measured across every public repo',
  },
  {
    // Relative dates cannot count up, so this card shows text instead.
    icon: <FaRegClock />,
    text: lastPush ?? '--',
    label: 'Last Commit',
    description: 'Straight from the GitHub API',
  },
];

const StatCard = ({ card, animate, isLoading }) => {
  // Hooks cannot be called conditionally, so every card runs the counter and the
  // text-only card simply ignores it.
  const counted = useCountUp(card.value ?? 0, { active: animate });

  return (
    <Tilt3D className="stat-card" max={7}>
      <div className="stat-icon-wrapper depth-2">{card.icon}</div>
      <div className="stat-content depth-1">
        <h3 className={`stat-number${card.text ? ' stat-number--compact' : ''}`}>
          {isLoading ? (
            <span className="skeleton-line skeleton-line--number" />
          ) : (
            card.text ?? `${counted}${card.suffix ?? ''}`
          )}
        </h3>
        <h4 className="stat-label">{card.label}</h4>
        <p className="stat-description">{card.description}</p>
      </div>
    </Tilt3D>
  );
};

const Stats = () => {
  const { data: stats, status, syncedAt } = useLiveData('/api/v1/stats', {
    fallback: fallbackStats,
  });
  const [gridRef, gridRevealed] = useScrollReveal();
  const [panelRef, panelRevealed] = useScrollReveal();

  const isLoading = status === 'loading';
  const totals = stats.totals ?? {};
  const languages = stats.languages ?? [];
  const lastSync = timeAgo(syncedAt);
  const cards = buildCards(totals, timeAgo(totals.lastPushedAt));

  // Hold the counters at zero until the section is both on screen and loaded,
  // so visitors actually see the count rather than arriving after it finished.
  const animateCounters = gridRevealed && !isLoading;

  return (
    <section className="stats-section">
      <div className="container">
        <div
          ref={gridRef}
          className={`stats-grid reveal-stagger ${gridRevealed ? 'is-revealed' : ''}`}
          aria-busy={isLoading}
        >
          {cards.map((card) => (
            <StatCard key={card.label} card={card} animate={animateCounters} isLoading={isLoading} />
          ))}
        </div>

        {languages.length > 0 && (
          <div ref={panelRef} className={`language-panel reveal ${panelRevealed ? 'is-revealed' : ''}`}>
            <div className="language-panel-header">
              <h3>Language breakdown</h3>
              <span className="language-panel-note">
                {status === 'live'
                  ? `by bytes of code across all public repos${lastSync ? ` - updated ${lastSync}` : ''}`
                  : 'by bytes of code across all public repos'}
              </span>
            </div>

            <div
              className={`language-bar ${panelRevealed ? 'is-filled' : ''}`}
              role="img"
              aria-label={languages.map((l) => `${l.name} ${l.percent}%`).join(', ')}
            >
              {languages.map((language, index) => (
                <span
                  key={language.name}
                  className="language-bar-segment"
                  style={{
                    // The width is the animated property: segments grow from zero
                    // once the panel scrolls into view.
                    '--segment-width': `${language.percent}%`,
                    '--segment-delay': `${index * 70}ms`,
                    background: languageColor(language.name, index),
                  }}
                  title={`${language.name} - ${language.percent}%`}
                />
              ))}
            </div>

            <ul className="language-legend">
              {languages.map((language, index) => (
                <li key={language.name}>
                  <span
                    className="language-dot"
                    style={{ background: languageColor(language.name, index) }}
                  />
                  {language.name}
                  <em>{language.percent}%</em>
                </li>
              ))}
            </ul>
          </div>
        )}

        {stats.profile?.htmlUrl && (
          <a
            className="stats-source"
            href={stats.profile.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub /> {status === 'live' ? 'Live from' : 'Snapshot from'} github.com/
            {stats.profile.login}
          </a>
        )}
      </div>
    </section>
  );
};

export default Stats;
