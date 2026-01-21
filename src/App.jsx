import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CertificateDetail from "./components/CertificateDetail";
import Resume from "./components/Resume";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/certificate/:id" element={<CertificateDetail />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
