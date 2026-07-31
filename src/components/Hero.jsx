import { FaAws, FaDownload, FaEnvelope } from 'react-icons/fa';
import { SiDocker, SiGithubactions, SiPostgresql, SiRedis, SiRubyonrails } from 'react-icons/si';
import { usePointerParallax } from '../hooks/usePointerParallax';
import './Hero.css';

// The floating stack scene. Each chip sits at its own depth (z) and drifts by
// its own amount (shift) - near chips move further than far ones, which is what
// sells the parallax as depth rather than as a wobble.
const STACK = [
  { label: 'Rails', icon: <SiRubyonrails />, x: 8, y: 14, z: 70, shift: 30, delay: 0 },
  { label: 'PostgreSQL', icon: <SiPostgresql />, x: 62, y: 6, z: 40, shift: 20, delay: 0.7 },
  { label: 'Docker', icon: <SiDocker />, x: 72, y: 46, z: 90, shift: 38, delay: 1.4 },
  { label: 'Redis', icon: <SiRedis />, x: 2, y: 58, z: 30, shift: 16, delay: 2.1 },
  { label: 'CI/CD', icon: <SiGithubactions />, x: 46, y: 80, z: 62, shift: 26, delay: 2.8 },
  { label: 'AWS', icon: <FaAws />, x: 20, y: 88, z: 20, shift: 12, delay: 3.5 },
];

const Hero = () => {
  const { ref: sceneRef, handlers } = usePointerParallax();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    window.open('/resume', '_blank');
  };

  return (
    <section id="home" className="hero" ref={sceneRef} {...handlers}>
      {/* Perspective floor grid: a cheap, static depth cue behind everything. */}
      <div className="hero-floor" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-badge">
            <span>Available for Opportunities</span>
          </div>
          <h1 className="hero-title">
            Hi, I&apos;m <span className="highlight">Bharat Goswami</span>
          </h1>
          <h2 className="hero-subtitle">Backend Developer &amp; DevOps Developer</h2>
          <p className="hero-description">
            Passionate Backend and DevOps Developer with expertise in Ruby on Rails,
            building scalable applications, and managing infrastructure. Experienced in
            developing robust backend systems, implementing CI/CD pipelines, and optimizing
            application performance. Always eager to learn new technologies and contribute
            to innovative projects.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => scrollToSection('contact')}>
              <FaEnvelope /> Get In Touch
            </button>
            <button className="btn btn-secondary" onClick={handleDownloadResume}>
              <FaDownload /> Download Resume
            </button>
          </div>
          <div className="hero-features">
            <div className="feature-item">
              <span className="feature-dot"></span>
              <span>Backend Development</span>
            </div>
            <div className="feature-item">
              <span className="feature-dot"></span>
              <span>DevOps &amp; CI/CD</span>
            </div>
            <div className="feature-item">
              <span className="feature-dot"></span>
              <span>Cloud Infrastructure</span>
            </div>
          </div>
        </div>

        {/* Decorative: the stack is already stated in the copy above, so this is
            hidden from assistive tech rather than repeated to it. */}
        <div className="hero-scene" aria-hidden="true">
          <div className="hero-scene-glow" />
          <div className="hero-orb">
            <span className="hero-orb-initials">BG</span>
            <span className="hero-orb-ring hero-orb-ring--1" />
            <span className="hero-orb-ring hero-orb-ring--2" />
          </div>

          {STACK.map((item) => (
            <div
              key={item.label}
              className="hero-chip"
              style={{
                '--chip-x': `${item.x}%`,
                '--chip-y': `${item.y}%`,
                '--chip-z': `${item.z}px`,
                '--chip-shift': `${item.shift}px`,
              }}
            >
              <div className="hero-chip-inner" style={{ animationDelay: `${item.delay}s` }}>
                <span className="hero-chip-icon">{item.icon}</span>
                <span className="hero-chip-label">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
