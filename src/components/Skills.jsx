import { FaDocker, FaGitAlt } from 'react-icons/fa';
import { SiRubyonrails, SiPostgresql, SiRedis, SiKubernetes, SiVercel } from 'react-icons/si';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Skills.css';

const SkillCategory = ({ category }) => {
  const [ref, isRevealed] = useScrollReveal();

  return (
    <div ref={ref} className={`skill-category reveal ${isRevealed ? 'is-revealed' : ''}`}>
      <h3 className="category-title">{category.title}</h3>
      <div className="skills-grid">
        {category.skills.map((skill, index) => (
          <div key={skill.name} className="skill-item">
            <div className="skill-header">
              {skill.icon && <div className="skill-icon">{skill.icon}</div>}
              <span className="skill-name">{skill.name}</span>
              <span className="skill-percentage">{skill.level}%</span>
            </div>
            <div className={`skill-bar ${isRevealed ? 'is-filled' : ''}`}>
              {/* The level is a CSS variable rather than an inline width so the
                  bar can animate from zero when the category scrolls into view. */}
              <div
                className="skill-progress"
                style={{ '--skill-level': `${skill.level}%`, '--skill-delay': `${index * 60}ms` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const skillCategories = [
    {
      title: 'Languages & Frameworks',
      skills: [
        { name: 'Ruby', level: 85 },
        { name: 'Ruby on Rails', icon: <SiRubyonrails />, level: 90 },
        { name: 'HTML5', level: 85 },
        { name: 'CSS3', level: 80 },
      ]
    },
    {
      title: 'Databases & Search',
      skills: [
        { name: 'PostgreSQL', icon: <SiPostgresql />, level: 85 },
        { name: 'Redis', icon: <SiRedis />, level: 80 },
        { name: 'ElasticSearch', level: 75 },
        { name: 'SQLite', level: 80 },
        { name: 'ActiveRecord', level: 85 },
      ]
    },
    {
      title: 'Background Jobs & Real-time',
      skills: [
        { name: 'Sidekiq', level: 85 },
        { name: 'Active Job', level: 80 },
        { name: 'ActionCable', level: 75 },
      ]
    },
    {
      title: 'DevOps & Hosting',
      skills: [
        { name: 'Vercel', icon: <SiVercel />, level: 80 },
        { name: 'Docker', icon: <FaDocker />, level: 85 },
        { name: 'Puma', level: 80 },
        { name: 'CI/CD', level: 85 },
        { name: 'Kubernetes', icon: <SiKubernetes />, level: 75 },
        { name: 'Helm', level: 70 },
      ]
    },
    {
      title: 'APIs & Integrations',
      skills: [
        { name: 'NewRelic', level: 75 },
        { name: 'RESTful APIs', level: 90 },
        { name: 'OAuth2/JWT', level: 85 },
      ]
    },
    {
      title: 'Methodologies',
      skills: [
        { name: 'Agile (Scrum/Kanban)', level: 85 },
        { name: 'Code Review', level: 90 },
        { name: 'Mentorship', level: 80 },
        { name: 'TDD & BDD', level: 85 },
        { name: 'Pair Programming', level: 80 },
        { name: 'Performance Optimization', level: 85 },
      ]
    }
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        {/* Each category reveals and fills its bars on its own, so scrolling
            through the section stays paced instead of firing everything at once. */}
        <div className="skills-content">
          {skillCategories.map((category) => (
            <SkillCategory key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

