import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Tilt3D from './Tilt3D';
import './Education.css';

const Education = () => {
  const [gridRef, gridRevealed] = useScrollReveal();

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
        <div
          ref={gridRef}
          className={`education-grid reveal-stagger ${gridRevealed ? 'is-revealed' : ''}`}
        >
          {education.map((edu) => (
            <Tilt3D key={edu.id} className="education-card" max={8}>
              <div className="education-icon depth-2">
                <FaGraduationCap />
              </div>
              <h3 className="education-degree depth-1">{edu.degree}</h3>
              <h4 className="education-institution depth-1">{edu.institution}</h4>
              <div className="education-meta depth-1">
                <div className="meta-item">
                  <FaCalendarAlt className="meta-icon" />
                  <span>{edu.period}</span>
                </div>
                <div className="meta-item">
                  <FaMapMarkerAlt className="meta-icon" />
                  <span>{edu.location}</span>
                </div>
              </div>
              <p className="education-cgpa depth-1">{edu.cgpa}</p>
            </Tilt3D>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;

