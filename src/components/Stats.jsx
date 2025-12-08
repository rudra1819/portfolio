import { FaCode, FaProjectDiagram, FaAward, FaClock } from 'react-icons/fa';
import './Stats.css';

const Stats = () => {
  const stats = [
    {
      icon: <FaCode />,
      number: '7+',
      label: 'Projects Completed',
      description: 'Production-ready applications'
    },
    {
      icon: <FaProjectDiagram />,
      number: '1+',
      label: 'Years Experience',
      description: 'Backend & DevOps development'
    },
    {
      icon: <FaAward />,
      number: '4',
      label: 'Certifications',
      description: 'Industry recognized credentials'
    },
    {
      icon: <FaClock />,
      number: '100%',
      label: 'Client Satisfaction',
      description: 'Delivered on time, every time'
    }
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon-wrapper">
                {stat.icon}
              </div>
              <div className="stat-content">
                <h3 className="stat-number">{stat.number}</h3>
                <h4 className="stat-label">{stat.label}</h4>
                <p className="stat-description">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

