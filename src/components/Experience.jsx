import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Experience.css';

const Experience = () => {
  const [revealRef, isRevealed] = useScrollReveal();
  const experiences = [
    {
      id: 1,
      role: 'Associate Software Engineer',
      company: 'ZenQua Technologies Pvt. Ltd.',
      location: 'Indore, Madhya Pradesh, India',
      period: 'July 2025 – Present',
      description: [
        'Developed and maintained production-grade backend applications using Ruby on Rails, PostgreSQL, and MySQL.',
        'Designed, built, and maintained RESTful APIs, authentication modules, CRUD operations, and custom business workflows.',
        'Optimized ActiveRecord queries and database performance to improve application efficiency and scalability.',
        'Worked with Redis and Sidekiq for background job processing and asynchronous task execution.',
        'Diagnosed and resolved production issues, performed bug fixes, and contributed to application stability and reliability.',
        'Collaborated with cross-functional teams using GitHub, Jira, and Agile development practices.',
        'Participated in code reviews, feature development, and backend architecture improvements.',
        'Worked with Docker, Kubernetes (GKE), and CI/CD pipelines to support deployments and production environments.',
        'Gained exposure to PHP while supporting backend modules alongside Ruby on Rails projects.'
      ]
    },
    {
      id: 2,
      role: 'Trainee Software Engineer',
      company: 'ZenQua Technologies Pvt. Ltd.',
      location: 'Indore, Madhya Pradesh, India',
      period: 'Dec 2024 – Apr 2025',
      description: [
        'Developed backend systems using Ruby on Rails and PostgreSQL.',
        'Delivered features for authentication, CRUD operations, and custom business logic.',
        'Collaborated in a team using GitHub for version control and Jira for task management.'
      ]
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <div
          ref={revealRef}
          className={`experience-timeline reveal-stagger ${isRevealed ? 'is-revealed' : ''}`}
        >
          {experiences.map((exp) => (
            <div key={exp.id} className="experience-item">
              <div className="experience-header">
                <h3 className="experience-role">{exp.role}</h3>
                <h4 className="experience-company">{exp.company}</h4>
              </div>
              <div className="experience-meta">
                <div className="meta-item">
                  <FaCalendarAlt className="meta-icon" />
                  <span>{exp.period}</span>
                </div>
                <div className="meta-item">
                  <FaMapMarkerAlt className="meta-icon" />
                  <span>{exp.location}</span>
                </div>
              </div>
              <ul className="experience-description">
                {exp.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

