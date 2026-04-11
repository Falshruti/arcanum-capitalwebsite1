import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import ThesisText from './components/ThesisText';
import VennDiagram from './components/VennDiagram';
import PostVennText from './components/PostVennText';
import TagsSection from './components/TagsSection';
import PostTagsText from './components/PostTagsText';
import TeamSection from './components/TeamSection';
import VisionarySection from './components/VisionarySection';
import InvestmentsStack from './components/InvestmentsStack';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustedBy />
      <ThesisText />
      <VennDiagram />
      <PostVennText />
      <TagsSection />
      <PostTagsText />
      <TeamSection />
      <VisionarySection />
      <InvestmentsStack />
      <Footer />
    </>
  );
}

export default App;
