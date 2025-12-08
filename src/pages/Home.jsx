import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Sidebar />
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Certifications />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;

