import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-text">
            <p>&copy; {currentYear} Bharat Goswami. All rights reserved.</p>
          </div>
          <div className="footer-social">
            <a href="https://github.com/rudra1819" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/bharat-goswami-a1544a242" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://mail.google.com/mail/?view=cm&to=Goswamirudra825@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

