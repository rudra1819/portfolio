import { useNavigate } from 'react-router-dom';
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Tilt3D from './Tilt3D';
import './Certifications.css';

const Certifications = () => {
  const navigate = useNavigate();
  const [gridRef, gridRevealed] = useScrollReveal();

  const certifications = [
    {
      id: 1,
      name: 'Career Essentials in Generative AI',
      issuer: 'Microsoft & LinkedIn'
    },
    {
      id: 2,
      name: 'Discrete Mathematics',
      issuer: 'RGPV (Education Point Online)'
    },
    {
      id: 3,
      name: 'Mathematics 2 & 3',
      issuer: 'RGPV (Education Point Online)'
    },
    {
      id: 4,
      name: 'Internship Certificate',
      issuer: 'ZenQua Technologies Pvt. Ltd.'
    }
  ];

  const handleCertificateClick = (certId) => {
    navigate(`/certificate/${certId}`);
  };

  // The card is a div rather than a button so the tilt transform and layout keep
  // working, so it has to earn its keyboard behaviour explicitly.
  const handleKeyDown = (event, certId) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    handleCertificateClick(certId);
  };

  return (
    <section id="certifications" className="certifications">
      <div className="container">
        <h2 className="section-title">Certifications</h2>
        <div
          ref={gridRef}
          className={`certifications-grid reveal-stagger ${gridRevealed ? 'is-revealed' : ''}`}
        >
          {certifications.map((cert) => (
            <Tilt3D
              key={cert.id}
              className="certification-card"
              max={10}
              role="button"
              tabIndex={0}
              aria-label={`View the ${cert.name} certificate`}
              onClick={() => handleCertificateClick(cert.id)}
              onKeyDown={(event) => handleKeyDown(event, cert.id)}
            >
              <div className="cert-icon depth-2">
                <FaCertificate />
              </div>
              <h3 className="cert-name depth-1">{cert.name}</h3>
              <p className="cert-issuer depth-1">{cert.issuer}</p>
              <div className="cert-view-link depth-1">
                <span>View Certificate</span>
                <FaExternalLinkAlt className="link-icon" />
              </div>
            </Tilt3D>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;

