import { FaDownload, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaBriefcase, FaGraduationCap, FaProjectDiagram, FaAward, FaTrophy, FaMedal, FaCertificate, FaMicrosoft } from 'react-icons/fa';
import './Resume.css';
import { useEffect, useState } from "react";

const Resume = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDownload = () => {
    if (isClient) window.print();
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
              <div className="resume-contact-item">
                <FaEnvelope />
                <span>Goswamirudra825@gmail.com</span>
              </div>
              <div className="resume-contact-item">
                <FaPhone />
                <span>+91 7880243673</span>
              </div>
              <div className="resume-contact-item">
                <FaMapMarkerAlt />
                <span>Indore, Madhya Pradesh</span>
              </div>
              <div className="resume-contact-item">
                <FaGithub />
                <a href="https://github.com/rudra1819" target="_blank" rel="noopener noreferrer">github.com/rudra1819</a>
              </div>
              <div className="resume-contact-item">
                <FaLinkedin />
                <a href="https://linkedin.com/in/bharat-goswami-a1544a242" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">Technical Skills</h3>

            <div className="skill-group">
              <h4 className="skill-group-title">Backend</h4>
              <div className="skill-tags">
                <span className="skill-tag">Ruby</span>
                <span className="skill-tag">Ruby on Rails</span>
                <span className="skill-tag">MVC Architecture</span>
                <span className="skill-tag">REST APIs</span>
                <span className="skill-tag">Devise Authentication</span>
                <span className="skill-tag">ActiveRecord</span>
              </div>
            </div>

            <div className="skill-group">
              <h4 className="skill-group-title">Frontend</h4>
              <div className="skill-tags">
                <span className="skill-tag">React.js (Basics)</span>
                <span className="skill-tag">HTML5</span>
                <span className="skill-tag">CSS3</span>
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
              <h4 className="skill-group-title">Database</h4>
              <div className="skill-tags">
                <span className="skill-tag">PostgreSQL</span>
                <span className="skill-tag">SQLite</span>
              </div>
            </div>

            <div className="skill-group">
              <h4 className="skill-group-title">Tools</h4>
              <div className="skill-tags">
                <span className="skill-tag">Git</span>
                <span className="skill-tag">GitHub</span>
                <span className="skill-tag">Jira</span>
                <span className="skill-tag">Trello</span>
             </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">Certifications</h3>
            <ul className="certifications-list-sidebar">
              <li>
                <FaMicrosoft className="resume-cert-icon cert-icon-microsoft" />
                <span>Career Essentials in Generative AI - Microsoft & LinkedIn</span>
              </li>
              <li>
                <FaGraduationCap className="resume-cert-icon cert-icon-education" />
                <span>Discrete Mathematics - RGPV</span>
              </li>
              <li>
                <FaAward className="resume-cert-icon cert-icon-award" />
                <span>Mathematics 2 & 3 - RGPV</span>
              </li>
              <li>
                <FaTrophy className="resume-cert-icon cert-icon-trophy" />
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
              <h3 className="resume-section-title">Professional Summary</h3>
            </div>
            <p className="section-content">
              Ruby on Rails Developer with 1+ year of hands-on experience building
              backend-driven web applications using MVC architecture and RESTful
              APIs. Experienced in developing CRUD modules, implementing user
              authentication using Devise, and working with PostgreSQL databases.
              Also familiar with React.js for building basic component-based user
              interfaces. Actively seeking a remote, product-focused role with
              growth opportunities.
           </p>
          </section>

          {/* Experience */}
          <section className="resume-section">
            <div className="section-header">
              <FaBriefcase className="section-icon" />
              <h3 className="resume-section-title">Professional Experience</h3>
            </div>
            
            <div className="resume-experience-item">
              <div className="resume-experience-header">
                <div>
                  <h4 className="job-title">Associate Software Engineer</h4>
                  <p className="company-name">ZenQua Technologies Pvt. Ltd.</p>
                </div>
                <div className="experience-date">
                  <span className="date-badge">July 2025 – Present</span>
                  <span className="location">Indore, Madhya Pradesh, India</span>
                </div>
              </div>
              <ul className="job-responsibilities">
                <li>Developed and maintained production-grade backend applications using Ruby on Rails, PostgreSQL, and MySQL.</li>
                <li>Designed, built, and maintained RESTful APIs, authentication modules, CRUD operations, and custom business workflows.</li>
                <li>Optimized ActiveRecord queries and database performance to improve application efficiency and scalability.</li>
                <li>Worked with Redis and Sidekiq for background job processing and asynchronous task execution.</li>
                <li>Diagnosed and resolved production issues, performed bug fixes, and contributed to application stability and reliability.</li>
                <li>Collaborated with cross-functional teams using GitHub, Jira, and Agile development practices.</li>
                <li>Participated in code reviews, feature development, and backend architecture improvements.</li>
                <li>Worked with Docker, Kubernetes (GKE), and CI/CD pipelines to support deployments and production environments.</li>
                <li>Gained exposure to PHP while supporting backend modules alongside Ruby on Rails projects.</li>
              </ul>
            </div>

            <div className="resume-experience-item">
              <div className="resume-experience-header">
                <div>
                  <h4 className="job-title">Trainee Software Engineer</h4>
                  <p className="company-name">ZenQua Technologies Pvt. Ltd.</p>
                </div>
                <div className="experience-date">
                  <span className="date-badge">Dec 2024 – Apr 2025</span>
                  <span className="location">Indore, Madhya Pradesh, India</span>
                </div>
              </div>
              <ul className="job-responsibilities">
                <li>Developed backend systems using Ruby on Rails and PostgreSQL.</li>
                <li>Delivered features for authentication, CRUD operations, and custom business logic.</li>
                <li>Collaborated in a team using GitHub for version control and Jira for task management.</li>
              </ul>
            </div>
          </section>

          {/* Projects */}
          <section className="resume-section">
            <div className="section-header">
              <FaProjectDiagram className="section-icon" />
              <h3 className="resume-section-title">Key Projects</h3>
            </div>
            <div className="resume-projects-grid">
              <div className="resume-project-card">
                <h4 className="project-name">StudentMart</h4>
                <p className="project-tech">Ruby on Rails • PostgreSQL • HTML5 • CSS3</p>
                <p className="project-desc">Comprehensive student management platform</p>
                <a href="https://github.com/rudra1819/studentmart" target="_blank" rel="noopener noreferrer" className="resume-project-link">
                  <FaGithub /> View on GitHub
                </a>
              </div>
              <div className="resume-project-card">
                <h4 className="project-name">HR Mitra</h4>
                <p className="project-tech">Ruby on Rails • PostgreSQL • Sidekiq</p>
                <p className="project-desc">Human Resources management system for efficient HR operations</p>
                <a href="https://github.com/rudra1819/HR-mitra" target="_blank" rel="noopener noreferrer" className="resume-project-link">
                  <FaGithub /> View on GitHub
                </a>
              </div>
              <div className="resume-project-card">
                <h4 className="project-name">Trading Dashboard</h4>
                <p className="project-tech">Ruby on Rails • Redis • ActionCable</p>
                <p className="project-desc">Real-time trading dashboard with analytics and monitoring</p>
                <a href="https://github.com/rudra1819/trading-dashboard" target="_blank" rel="noopener noreferrer" className="resume-project-link">
                  <FaGithub /> View on GitHub
                </a>
              </div>
              <div className="resume-project-card">
                <h4 className="project-name">LMS Final</h4>
                <p className="project-tech">Ruby on Rails • PostgreSQL • ActiveRecord</p>
                <p className="project-desc">Learning Management System with course management</p>
                <a href="https://github.com/rudra1819/lms-final" target="_blank" rel="noopener noreferrer" className="resume-project-link">
                  <FaGithub /> View on GitHub
                </a>
              </div>
              <div className="resume-project-card">
                <h4 className="project-name">Krishna Technology Website</h4>
                <p className="project-tech">React.js • Vite • HTML • CSS</p>
                <p className="project-desc">Company portfolio website built using React and deployed online.</p>
                <a href="https://github.com/rudra1819/The-Krishna-s" target="_blank" rel="noopener noreferrer" className="resume-project-link">
                  <FaGithub /> View on GitHub
                </a>
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="resume-section">
            <div className="section-header">
              <FaGraduationCap className="section-icon" />
              <h3 className="resume-section-title">Education</h3>
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
