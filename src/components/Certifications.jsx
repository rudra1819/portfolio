import { useNavigate } from 'react-router-dom';
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';
import './Certifications.css';

const Certifications = () => {
  const navigate = useNavigate();

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

  return (
    <section id="certifications" className="certifications">
      <div className="container">
        <h2 className="section-title">Certifications</h2>
        <div className="certifications-grid">
          {certifications.map((cert) => (
            <div 
              key={cert.id} 
              className="certification-card"
              onClick={() => handleCertificateClick(cert.id)}
            >
              <div className="cert-icon">
                <FaCertificate />
              </div>
              <h3 className="cert-name">{cert.name}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              <div className="cert-view-link">
                <span>View Certificate</span>
                <FaExternalLinkAlt className="link-icon" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;

