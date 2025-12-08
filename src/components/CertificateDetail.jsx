import { useParams, useNavigate } from 'react-router-dom';
import { FaDownload, FaArrowLeft, FaCalendarAlt, FaCertificate } from 'react-icons/fa';
import './CertificateDetail.css';

const CertificateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Certificate data - yahan aap apne actual certificate images ka path add kar sakte ho
  const certificates = {
    1: {
      id: 1,
      name: 'Career Essentials in Generative AI',
      issuer: 'Microsoft & LinkedIn',
      date: '2024',
      description: 'Comprehensive certification covering fundamentals of Generative AI, including AI models, prompt engineering, and practical applications.',
      image: '/certificates/generative-ai-certificate.jpg', // Aap apne certificate image ka path yahan add karo
      downloadUrl: '/certificates/generative-ai-certificate.pdf' // PDF download ke liye
    },
    2: {
      id: 2,
      name: 'Discrete Mathematics',
      issuer: 'RGPV (Education Point Online)',
      date: '2023',
      description: 'Certificate in Discrete Mathematics covering topics like set theory, graph theory, combinatorics, and mathematical logic.',
      image: '/certificates/discrete-math-certificate.jpg',
      downloadUrl: '/certificates/discrete-math-certificate.pdf'
    },
    3: {
      id: 3,
      name: 'Mathematics 2 & 3',
      issuer: 'RGPV (Education Point Online)',
      date: '2023',
      description: 'Advanced mathematics certification covering calculus, linear algebra, differential equations, and mathematical analysis.',
      image: '/certificates/math-2-3-certificate.jpg',
      downloadUrl: '/certificates/math-2-3-certificate.pdf'
    },
    4: {
      id: 4,
      name: 'Internship Certificate',
      issuer: 'ZenQua Technologies Pvt. Ltd.',
      date: '2024-2025',
      description: 'Internship completion certificate from ZenQua Technologies for successful completion of software engineering internship.',
      image: '/certificates/internship-certificate.jpg',
      downloadUrl: '/certificates/Internship-Certificate-certificate.pdf'
    }
  };

  const certificate = certificates[id];

  if (!certificate) {
    return (
      <div className="certificate-detail">
        <div className="certificate-detail-container">
          <div className="error-message">
            <h2>Certificate not found</h2>
            <button onClick={() => navigate('/')} className="btn btn-primary">
              <FaArrowLeft /> Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    if (certificate.downloadUrl) {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = certificate.downloadUrl;
      link.download = `${certificate.name.replace(/\s+/g, '-')}-certificate.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // If no download URL, download the image
      const link = document.createElement('a');
      link.href = certificate.image;
      link.download = `${certificate.name.replace(/\s+/g, '-')}-certificate.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="certificate-detail">
      <div className="certificate-detail-container">
        <button onClick={() => navigate('/')} className="back-button">
          <FaArrowLeft /> Back to Portfolio
        </button>

        <div className="certificate-content">
          <div className="certificate-header">
            <div className="certificate-badge">
              <FaCertificate className="badge-icon" />
            </div>
            <div className="certificate-info">
              <h1 className="certificate-title">{certificate.name}</h1>
              <p className="certificate-issuer">Issued by: {certificate.issuer}</p>
              <div className="certificate-date">
                <FaCalendarAlt className="date-icon" />
                <span>{certificate.date}</span>
              </div>
            </div>
          </div>

          <div className="certificate-description">
            <p>{certificate.description}</p>
          </div>

          <div className="certificate-image-container">
            <div className="certificate-image-wrapper">
              <img 
                src={certificate.image} 
                alt={certificate.name}
                className="certificate-image"
                onError={(e) => {
                  // Agar image load nahi hoti to placeholder show karo
                  e.target.src = 'https://via.placeholder.com/800x600/0f0f0f/00d4ff?text=Certificate+Image';
                  e.target.alt = 'Certificate placeholder';
                }}
              />
            </div>
            <div className="certificate-actions">
              <button onClick={handleDownload} className="btn btn-download">
                <FaDownload /> Download Certificate
              </button>
            </div>
          </div>

          <div className="certificate-verification">
            <p className="verification-note">
              <strong>Note:</strong> This certificate is verified and authentic. 
              For verification, please contact: Goswamirudra825@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDetail;

