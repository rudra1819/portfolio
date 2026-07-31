import { FaCheckCircle } from 'react-icons/fa';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './About.css';

const About = () => {
  const [revealRef, isRevealed] = useScrollReveal();
  const highlights = [
    'Scalable Backend Systems Development',
    'CI/CD Pipeline Implementation',
    'Cloud Infrastructure Management',
    'Database Optimization & Design',
    'RESTful API Development',
    'Agile & DevOps Methodologies'
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p className="about-intro">
              I am a passionate <strong>Backend and DevOps Developer</strong> with a strong foundation in 
              Ruby on Rails and modern web technologies. My expertise lies in building 
              scalable backend systems, implementing efficient database solutions, and 
              managing cloud infrastructure.
            </p>
            <p>
              Currently working as an <strong>Associate Software Engineer</strong> at ZenQua Technologies, 
              I have experience developing robust authentication systems, CRUD operations, 
              and custom business logic. I'm skilled in implementing CI/CD pipelines, 
              containerization with Docker, and optimizing application performance.
            </p>
            <div className="about-highlights">
              <h3 className="highlights-title">Core Expertise</h3>
              <div
          ref={revealRef}
          className={`highlights-grid reveal-stagger ${isRevealed ? 'is-revealed' : ''}`}
        >
                {highlights.map((highlight, index) => (
                  <div key={index} className="highlight-item">
                    <FaCheckCircle className="highlight-icon" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="about-closing">
              I believe in writing clean, maintainable code and following best practices 
              like TDD, BDD, and Agile methodologies. When I'm not coding, I enjoy 
              contributing to open-source projects, learning new technologies, and 
              sharing knowledge with the developer community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

