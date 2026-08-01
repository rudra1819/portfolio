import { FaArrowRight, FaGlobe } from 'react-icons/fa';
import { liveProjects } from '../data/liveProjects';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Tilt3D from './Tilt3D';
import './LiveProjects.css';

const LiveProjectCard = ({ project }) => (
  <Tilt3D className="live-card" max={5}>
    <div className="live-card-aside depth-2">
      <div className="live-logo" style={{ background: project.accent }}>
        <span>{project.initials}</span>
      </div>
      <span className="live-badge">
        <span className="live-dot" aria-hidden="true" />
        Live
      </span>
    </div>

    <div className="live-card-body depth-1">
      <div className="live-meta">
        <span className="live-role">{project.role}</span>
        {project.since && <span className="live-since">{project.since}</span>}
      </div>

      <h3 className="live-name">{project.name}</h3>
      <p className="live-tagline">{project.tagline}</p>
      <p className="live-description">{project.description}</p>

      {project.technologies.length > 0 && (
        <div className="live-tech">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
      )}

      <a
        className="live-visit"
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${project.name} at ${project.displayUrl}`}
      >
        <FaGlobe />
        <span>{project.displayUrl}</span>
        <FaArrowRight className="live-visit-arrow" />
      </a>
    </div>
  </Tilt3D>
);

const LiveProjects = () => {
  const [gridRef, gridRevealed] = useScrollReveal();

  if (liveProjects.length === 0) return null;

  return (
    <section id="live" className="live-projects">
      <div className="container">
        <h2 className="section-title">Live Projects</h2>
        <p className="section-subtitle">
          Products running in production and open to the public.
        </p>

        <div
          ref={gridRef}
          className={`live-grid reveal-stagger ${gridRevealed ? 'is-revealed' : ''}`}
        >
          {liveProjects.map((project) => (
            <LiveProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveProjects;
