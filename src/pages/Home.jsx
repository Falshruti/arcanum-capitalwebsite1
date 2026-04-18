import React from 'react';
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
    <>
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
    </>
  );
};

export default Home;
