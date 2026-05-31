import React from 'react';
import './Home.css';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import ThesisText from '../components/ThesisText';
import VennDiagram from '../components/VennDiagram';
import PostVennText from '../components/PostVennText';
import TagsSection from '../components/TagsSection';
import PostTagsText from '../components/PostTagsText';
import TeamSection from '../components/TeamSection';
import VisionarySection from '../components/VisionarySection';
import InvestmentsStack from '../components/InvestmentsStack';

const Home = () => {
  return (
    <div className="home-page">
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
    </div>
  );
};

export default Home;
