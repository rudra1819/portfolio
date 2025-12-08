import { FaDownload, FaEnvelope } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    // Resume page par redirect karo
    window.open('/resume', '_blank');
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-badge">
            <span>Available for Opportunities</span>
          </div>
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">Bharat Goswami</span>
          </h1>
          <h2 className="hero-subtitle">Backend Developer & DevOps Developer</h2>
          <p className="hero-description">
            Passionate Backend and DevOps Developer with expertise in Ruby on Rails, 
            building scalable applications, and managing infrastructure. Experienced in 
            developing robust backend systems, implementing CI/CD pipelines, and optimizing 
            application performance. Always eager to learn new technologies and contribute 
            to innovative projects.
          </p>
          <div className="hero-cta">
            <button 
              className="btn btn-primary" 
              onClick={() => scrollToSection('contact')}
            >
              <FaEnvelope /> Get In Touch
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={handleDownloadResume}
            >
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
              <span>DevOps & CI/CD</span>
            </div>
            <div className="feature-item">
              <span className="feature-dot"></span>
              <span>Cloud Infrastructure</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

