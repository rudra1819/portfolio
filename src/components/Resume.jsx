import { FaDownload, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaBriefcase, FaGraduationCap, FaProjectDiagram, FaAward, FaTrophy, FaMedal, FaCertificate, FaMicrosoft } from 'react-icons/fa';
import './Resume.css';

const Resume = () => {
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="resume-container">
      <div className="resume-actions">
        <button onClick={handleDownload} className="resume-download-btn">
          <FaDownload /> Download PDF
        </button>
      </div>
      
      <div className="resume">
        {/* Left Sidebar */}
        <aside className="resume-sidebar">
          {/* Header */}
          <div className="resume-header-sidebar">
            <div className="resume-avatar">
              <span>BG</span>
            </div>
            <h1 className="resume-name">Bharat Goswami</h1>
            <h2 className="resume-title">Backend Developer & DevOps Developer</h2>
          </div>

          {/* Contact Info */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">Contact</h3>
            <div className="contact-list">
              <div className="contact-item">
                <FaEnvelope />
                <span>Goswamirudra825@gmail.com</span>
              </div>
              <div className="contact-item">
                <FaPhone />
                <span>+91 7880243673</span>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt />
                <span>Indore, M.P. 452012</span>
              </div>
              <div className="contact-item">
                <FaGithub />
                <a href="https://github.com/rudra1819" target="_blank" rel="noopener noreferrer">github.com/rudra1819</a>
              </div>
              <div className="contact-item">
                <FaLinkedin />
                <a href="https://linkedin.com/in/bharat-goswami-a1544a242" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">Technical Skills</h3>
            <div className="skills-list">
              <div className="skill-group">
                <h4 className="skill-group-title">Languages & Frameworks</h4>
                <div className="skill-tags">
                  <span className="skill-tag">Ruby</span>
                  <span className="skill-tag">Rails</span>
                  <span className="skill-tag">HTML5</span>
                  <span className="skill-tag">CSS3</span>
                </div>
              </div>
              <div className="skill-group">
                <h4 className="skill-group-title">Databases</h4>
                <div className="skill-tags">
                  <span className="skill-tag">PostgreSQL</span>
                  <span className="skill-tag">Redis</span>
                  <span className="skill-tag">ElasticSearch</span>
                  <span className="skill-tag">SQLite</span>
                </div>
              </div>
              <div className="skill-group">
                <h4 className="skill-group-title">DevOps</h4>
                <div className="skill-tags">
                  <span className="skill-tag">Docker</span>
                  <span className="skill-tag">Kubernetes</span>
                  <span className="skill-tag">CI/CD</span>
                  <span className="skill-tag">Vercel</span>
                </div>
              </div>
              <div className="skill-group">
                <h4 className="skill-group-title">Tools & Methods</h4>
                <div className="skill-tags">
                  <span className="skill-tag">Sidekiq</span>
                  <span className="skill-tag">RESTful APIs</span>
                  <span className="skill-tag">TDD/BDD</span>
                  <span className="skill-tag">Agile</span>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">Certifications</h3>
            <ul className="certifications-list-sidebar">
              <li>
                <FaMicrosoft className="cert-icon cert-icon-microsoft" />
                <span>Career Essentials in Generative AI - Microsoft & LinkedIn</span>
              </li>
              <li>
                <FaGraduationCap className="cert-icon cert-icon-education" />
                <span>Discrete Mathematics - RGPV</span>
              </li>
              <li>
                <FaAward className="cert-icon cert-icon-award" />
                <span>Mathematics 2 & 3 - RGPV</span>
              </li>
              <li>
                <FaTrophy className="cert-icon cert-icon-trophy" />
                <span>Internship Certificate - ZenQua</span>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="resume-main">
          {/* Professional Summary */}
          <section className="resume-section">
            <div className="section-header">
              <FaBriefcase className="section-icon" />
              <h3 className="section-title">Professional Summary</h3>
            </div>
            <p className="section-content">
              Passionate Backend and DevOps Developer with expertise in Ruby on Rails, building scalable 
              applications, and managing infrastructure. Experienced in developing robust backend systems, 
              implementing CI/CD pipelines, and optimizing application performance. Skilled in implementing 
              efficient database solutions, containerization with Docker, and following best practices 
              like TDD, BDD, and Agile methodologies.
            </p>
          </section>

          {/* Experience */}
          <section className="resume-section">
            <div className="section-header">
              <FaBriefcase className="section-icon" />
              <h3 className="section-title">Professional Experience</h3>
            </div>
            
            <div className="experience-item">
              <div className="experience-header">
                <div>
                  <h4 className="job-title">Associate Software Engineer</h4>
                  <p className="company-name">ZenQua Technologies Pvt. Ltd.</p>
                </div>
                <div className="experience-date">
                  <span className="date-badge">July 2025 – Present</span>
                  <span className="location">Indore, M.P.</span>
                </div>
              </div>
              <ul className="job-responsibilities">
                <li>Developing backend systems using Ruby on Rails and PostgreSQL</li>
                <li>Delivering features for authentication, CRUD operations and custom business logic</li>
                <li>Collaborating in a team using GitHub for version control and Jira for task management</li>
                <li>Implementing CI/CD pipelines and optimizing application performance</li>
              </ul>
            </div>

            <div className="experience-item">
              <div className="experience-header">
                <div>
                  <h4 className="job-title">Trainee Software Engineer</h4>
                  <p className="company-name">ZenQua Technologies Pvt. Ltd.</p>
                </div>
                <div className="experience-date">
                  <span className="date-badge">Dec 2024 – Apr 2025</span>
                  <span className="location">Indore, M.P.</span>
                </div>
              </div>
              <ul className="job-responsibilities">
                <li>Developed backend systems using Ruby on Rails and PostgreSQL</li>
                <li>Delivered features for authentication, CRUD operations and custom business logic</li>
                <li>Collaborated in a team using GitHub for version control and Jira for task management</li>
              </ul>
            </div>
          </section>

          {/* Projects */}
          <section className="resume-section">
            <div className="section-header">
              <FaProjectDiagram className="section-icon" />
              <h3 className="section-title">Key Projects</h3>
            </div>
            <div className="projects-grid">
              <div className="project-card">
                <h4 className="project-name">StudentMart</h4>
                <p className="project-tech">Ruby on Rails • PostgreSQL • HTML5 • CSS3</p>
                <p className="project-desc">Comprehensive student management platform</p>
                <a href="https://github.com/rudra1819/studentmart" target="_blank" rel="noopener noreferrer" className="project-link">
                  <FaGithub /> View on GitHub
                </a>
              </div>
              <div className="project-card">
                <h4 className="project-name">HR Mitra</h4>
                <p className="project-tech">Ruby on Rails • PostgreSQL • Sidekiq</p>
                <p className="project-desc">Human Resources management system for efficient HR operations</p>
                <a href="https://github.com/rudra1819/HR-mitra" target="_blank" rel="noopener noreferrer" className="project-link">
                  <FaGithub /> View on GitHub
                </a>
              </div>
              <div className="project-card">
                <h4 className="project-name">Trading Dashboard</h4>
                <p className="project-tech">Ruby on Rails • Redis • ActionCable</p>
                <p className="project-desc">Real-time trading dashboard with analytics and monitoring</p>
                <a href="https://github.com/rudra1819/trading-dashboard" target="_blank" rel="noopener noreferrer" className="project-link">
                  <FaGithub /> View on GitHub
                </a>
              </div>
              <div className="project-card">
                <h4 className="project-name">LMS Final</h4>
                <p className="project-tech">Ruby on Rails • PostgreSQL • ActiveRecord</p>
                <p className="project-desc">Learning Management System with course management</p>
                <a href="https://github.com/rudra1819/lms-final" target="_blank" rel="noopener noreferrer" className="project-link">
                  <FaGithub /> View on GitHub
                </a>
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="resume-section">
            <div className="section-header">
              <FaGraduationCap className="section-icon" />
              <h3 className="section-title">Education</h3>
            </div>
            <div className="education-timeline">
              <div className="education-item">
                <div className="education-dot"></div>
                <div className="education-content">
                  <div className="education-header">
                    <div>
                      <h4 className="degree">B.Tech – Computer Science and Engineering</h4>
                      <p className="institution">Chameli Devi Group of Institution</p>
                    </div>
                    <div className="education-date">
                      <span className="date-badge">2022-2026</span>
                      <span className="cgpa">CGPA: 7.0</span>
                    </div>
                  </div>
                  <p className="location">Indore, Madhya Pradesh</p>
                </div>
              </div>
              <div className="education-item">
                <div className="education-dot"></div>
                <div className="education-content">
                  <div className="education-header">
                    <div>
                      <h4 className="degree">12th Grade</h4>
                      <p className="institution">Pragati Vidya Peeth</p>
                    </div>
                    <div className="education-date">
                      <span className="date-badge">2021-2022</span>
                      <span className="cgpa">CGPA: 7.0</span>
                    </div>
                  </div>
                  <p className="location">Gwalior, Madhya Pradesh</p>
                </div>
              </div>
              <div className="education-item">
                <div className="education-dot"></div>
                <div className="education-content">
                  <div className="education-header">
                    <div>
                      <h4 className="degree">10th Grade</h4>
                      <p className="institution">Pragati Vidya Peeth</p>
                    </div>
                    <div className="education-date">
                      <span className="date-badge">2019-2020</span>
                      <span className="cgpa">CGPA: 7.6</span>
                    </div>
                  </div>
                  <p className="location">Gwalior, Madhya Pradesh</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Resume;
