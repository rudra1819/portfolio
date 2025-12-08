import { FaGithub, FaExternalLinkAlt, FaGraduationCap, FaUsers, FaChartLine, FaCalculator, FaDumbbell, FaCode, FaBook } from 'react-icons/fa';
import { SiRubyonrails } from 'react-icons/si';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'StudentMart',
      description: 'A comprehensive student management platform built with Ruby on Rails.',
      technologies: ['Ruby on Rails', 'PostgreSQL', 'HTML5', 'CSS3'],
      github: 'https://github.com/rudra1819/studentmart',
      image: 'https://via.placeholder.com/400x250/00d4ff/ffffff?text=StudentMart',
      icon: <FaGraduationCap />,
      gradient: 'linear-gradient(135deg, #00d4ff, #0099cc)'
    },
    {
      id: 2,
      title: 'HR Mitra',
      description: 'Human Resources management system for efficient HR operations.',
      technologies: ['Ruby on Rails', 'PostgreSQL', 'Sidekiq'],
      github: 'https://github.com/rudra1819/HR-mitra',
      image: 'https://via.placeholder.com/400x250/8a2be2/ffffff?text=HR+Mitra',
      icon: <FaUsers />,
      gradient: 'linear-gradient(135deg, #8a2be2, #6a1bb2)'
    },
    {
      id: 3,
      title: 'Trading Dashboard',
      description: 'Real-time trading dashboard with analytics and monitoring capabilities.',
      technologies: ['Ruby on Rails', 'Redis', 'ActionCable'],
      github: 'https://github.com/rudra1819/trading-dashboard',
      image: 'https://via.placeholder.com/400x250/00a8cc/ffffff?text=Trading+Dashboard',
      icon: <FaChartLine />,
      gradient: 'linear-gradient(135deg, #00a8cc, #007a99)'
    },
    {
      id: 4,
      title: 'String Calculator TDD',
      description: 'String calculator implementation following Test-Driven Development practices.',
      technologies: ['Ruby', 'RSpec', 'TDD'],
      github: 'https://github.com/rudra1819/string_calculator_tdd',
      image: 'https://via.placeholder.com/400x250/8a2be2/ffffff?text=String+Calculator',
      icon: <FaCalculator />,
      gradient: 'linear-gradient(135deg, #ff6b6b, #ee5a6f)'
    },
    {
      id: 5,
      title: 'Gym Website',
      description: 'Modern gym website with membership management and booking system.',
      technologies: ['Ruby on Rails', 'PostgreSQL', 'HTML5', 'CSS3'],
      github: 'https://github.com/rudra1819/gym-website',
      image: 'https://via.placeholder.com/400x250/00d4ff/ffffff?text=Gym+Website',
      icon: <FaDumbbell />,
      gradient: 'linear-gradient(135deg, #ffa500, #ff8c00)'
    },
    {
      id: 6,
      title: 'ROR Technical Challenge',
      description: 'Ruby on Rails technical challenge showcasing best practices and patterns.',
      technologies: ['Ruby on Rails', 'PostgreSQL', 'RESTful APIs'],
      github: 'https://github.com/rudra1819/ror-technical-challenge',
      image: 'https://via.placeholder.com/400x250/00a8cc/ffffff?text=ROR+Challenge',
      icon: <SiRubyonrails />,
      gradient: 'linear-gradient(135deg, #cc0000, #990000)'
    },
    {
      id: 7,
      title: 'LMS Final',
      description: 'Learning Management System with course management and student tracking.',
      technologies: ['Ruby on Rails', 'PostgreSQL', 'ActiveRecord'],
      github: 'https://github.com/rudra1819/lms-final',
      image: 'https://via.placeholder.com/400x250/8a2be2/ffffff?text=LMS',
      icon: <FaBook />,
      gradient: 'linear-gradient(135deg, #4ecdc4, #44a08d)'
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-icon-wrapper" style={{ background: project.gradient }}>
                <div className="project-icon">
                  {project.icon}
                </div>
              </div>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link" title="View on GitHub">
                    <FaGithub />
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link" title="View Live Demo">
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

