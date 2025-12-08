import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import './Education.css';

const Education = () => {
  const education = [
    {
      id: 1,
      degree: 'B.Tech – Computer Science and Engineering',
      institution: 'Chameli Devi Group of Institution',
      location: 'Indore, Madhya Pradesh',
      period: '2022-2026',
      cgpa: 'CGPA: 7.0'
    },
    {
      id: 2,
      degree: '12th Grade',
      institution: 'Pragati Vidya Peeth',
      location: 'Gwalior, Madhya Pradesh',
      period: '2021-2022',
      cgpa: 'CGPA: 7.0'
    },
    {
      id: 3,
      degree: '10th Grade',
      institution: 'Pragati Vidya Peeth',
      location: 'Gwalior, Madhya Pradesh',
      period: '2019-2020',
      cgpa: 'CGPA: 7.6'
    }
  ];

  return (
    <section id="education" className="education">
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="education-grid">
          {education.map((edu) => (
            <div key={edu.id} className="education-card">
              <div className="education-icon">
                <FaGraduationCap />
              </div>
              <h3 className="education-degree">{edu.degree}</h3>
              <h4 className="education-institution">{edu.institution}</h4>
              <div className="education-meta">
                <div className="meta-item">
                  <FaCalendarAlt className="meta-icon" />
                  <span>{edu.period}</span>
                </div>
                <div className="meta-item">
                  <FaMapMarkerAlt className="meta-icon" />
                  <span>{edu.location}</span>
                </div>
              </div>
              <p className="education-cgpa">{edu.cgpa}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;

