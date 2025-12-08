import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CertificateDetail from './components/CertificateDetail';
import Resume from './components/Resume';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/certificate/:id" element={<CertificateDetail />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
