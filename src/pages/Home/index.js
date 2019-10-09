import React, { useEffect } from 'react';
import {
  HeroSectionHome ,
  AboutSectionHome ,
  DownloadSectionHome ,
  CollaboratorsSectionHome
} from './sections';

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div id="page-container">
      <HeroSectionHome />
      <AboutSectionHome />
      <DownloadSectionHome />
      <CollaboratorsSectionHome />
    </div>
  );
}

export default HomePage;