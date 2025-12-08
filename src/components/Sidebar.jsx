import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter, FaInstagram } from 'react-icons/fa6';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-card">
        <div className="profile-image">
          <div className="avatar-placeholder">
            <span>BG</span>
          </div>
        </div>
        <div className="profile-info">
          <h1 className="profile-name">Bharat Goswami</h1>
          <p className="profile-role">Backend Developer & DevOps Developer</p>
        </div>
        <div className="contact-info">
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <a href="https://mail.google.com/mail/?view=cm&to=Goswamirudra825@gmail.com" target="_blank" rel="noopener noreferrer">Goswamirudra825@gmail.com</a>
          </div>
          <div className="contact-item">
            <FaPhone className="contact-icon" />
            <a href="tel:+917880243673">+91 7880243673</a>
          </div>
          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />
            <span>12/A Choice Palace, Near Gopur Chauraha<br />Indore, M.P. 452012</span>
          </div>
        </div>
        <div className="social-links">
          <a href="https://instagram.com/vibes_with_rudra_1819" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://x.com/RudraGo66826692" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaXTwitter />
          </a>
          <a href="https://linkedin.com/in/bharat-goswami-a1544a242" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://github.com/rudra1819" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

