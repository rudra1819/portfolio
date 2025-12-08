import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      role: 'Associate Software Engineer',
      company: 'ZenQua Technologies Pvt. Ltd.',
      location: 'Indore, M.P.',
      period: 'July 2025 – Present',
      description: [
        'Developing backend systems using Ruby on Rails and PostgreSQL',
        'Delivering features for authentication, CRUD operations and custom business logic',
        'Collaborating in a team using GitHub for version control and Jira for task management',
        'Implementing CI/CD pipelines and optimizing application performance'
      ]
    },
    {
      id: 2,
      role: 'Trainee Software Engineer',
      company: 'ZenQua Technologies Pvt. Ltd.',
      location: 'Indore, M.P.',
      period: 'Dec 2024 – Apr 2025',
      description: [
        'Developed backend systems using Ruby on Rails and PostgreSQL',
        'Delivered features for authentication, CRUD operations and custom business logic',
        'Collaborated in a team using GitHub for version control and Jira for task management'
      ]
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <div className="experience-timeline">
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

