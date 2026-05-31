import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Insights from './pages/Insights';
import Contact from './pages/Contact';
import Nexus from './pages/Nexus';
import SubmitProfile from './pages/SubmitProfile';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/nexus" element={<Nexus />} />
        <Route path="/submit-profile" element={<SubmitProfile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
