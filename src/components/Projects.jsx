import { FaCodeBranch, FaExternalLinkAlt, FaGithub, FaRegClock, FaStar } from 'react-icons/fa';
import { useLiveData } from '../hooks/useLiveData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { fallbackProjects } from '../data/fallbackProjects';
import { projectVisuals } from '../lib/projectVisuals';
import { compactNumber, timeAgo } from '../lib/format';
import Tilt3D from './Tilt3D';
import './Projects.css';

const SKELETON_COUNT = 6;

const ProjectCard = ({ project }) => {
  const { icon, gradient } = projectVisuals(project);
  const lastPush = timeAgo(project.pushedAt);

  return (
    <Tilt3D className="project-card" max={8}>
      {project.featured && <span className="project-badge depth-3">Featured</span>}

      {/* Depth comes from this element's own transform in Projects.css, which
          combines translateZ with the hover rotation - so no .depth-* helper here. */}
      <div className="project-icon-wrapper" style={{ background: gradient }}>
        <div className="project-icon">{icon}</div>
      </div>

      {/* A gradient banner rather than a screenshot: the repo data GitHub
          returns has no image, and a placeholder-image service is one more
          third-party dependency that can go dark. */}
      <div className="project-banner" style={{ background: gradient }}>
        <span className="project-banner-language">{project.language ?? 'Multi-language'}</span>
        <div className="project-overlay">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
            title="View on GitHub"
            aria-label={`View ${project.title} on GitHub`}
          >
            <FaGithub />
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              title="View live demo"
              aria-label={`View the live demo of ${project.title}`}
            >
              <FaExternalLinkAlt />
            </a>
          )}
        </div>
      </div>

      <div className="project-content depth-1">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        <div className="project-meta">
          {project.stars > 0 && (
            <span className="project-meta-item" title={`${project.stars} stars on GitHub`}>
              <FaStar /> {compactNumber(project.stars)}
            </span>
          )}
          {project.forks > 0 && (
            <span className="project-meta-item" title={`${project.forks} forks on GitHub`}>
              <FaCodeBranch /> {compactNumber(project.forks)}
            </span>
          )}
          {lastPush && (
            <span className="project-meta-item" title={`Last pushed ${lastPush}`}>
              <FaRegClock /> {lastPush}
            </span>
          )}
        </div>

        <div className="project-technologies">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Tilt3D>
  );
};

const SkeletonCard = () => (
  <div className="project-card project-card--skeleton" aria-hidden="true">
    <div className="project-banner skeleton-block" />
    <div className="project-content">
      <div className="skeleton-line skeleton-line--title" />
      <div className="skeleton-line" />
      <div className="skeleton-line skeleton-line--short" />
      <div className="project-technologies">
        <span className="skeleton-pill" />
        <span className="skeleton-pill" />
        <span className="skeleton-pill" />
      </div>
    </div>
  </div>
);

const Projects = () => {
  const { data: projects, status, syncedAt } = useLiveData('/api/v1/projects', {
    fallback: fallbackProjects,
    select: (payload) => payload.projects,
  });
  const [gridRef, gridRevealed] = useScrollReveal();

  const isLoading = status === 'loading';
  const lastSync = timeAgo(syncedAt);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>

        <p className="section-subtitle">
          {isLoading
            ? 'Loading the latest from GitHub...'
            : status === 'live'
              ? `Pulled straight from GitHub${lastSync ? `, updated ${lastSync}` : ''}.`
              : 'Showing a saved snapshot - the live feed is unavailable right now.'}
        </p>

        <div
          ref={gridRef}
          className={`projects-grid reveal-stagger ${gridRevealed ? 'is-revealed' : ''}`}
          aria-busy={isLoading}
        >
          {isLoading
            ? Array.from({ length: SKELETON_COUNT }, (_, index) => <SkeletonCard key={index} />)
            : projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>

        {!isLoading && projects.length === 0 && (
          <p className="projects-empty">No public repositories to show yet.</p>
        )}
      </div>
    </section>
  );
};

export default Projects;
