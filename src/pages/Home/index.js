import React, { Component } from 'react';
import HeroSectionHome from './sections/HeroSectionHome';
import AboutSectionHome from './sections/AboutSectionHome';
import DownloadSectionHome from './sections/DownloadSectionHome';
import CollaboratorsSectionHome from './sections/CollaboratorsSectionHome';

class HomePage extends Component {
  componentDidMount() {
    // animateScroll();
  }

  render() {
    return (
      <div id="page-container">
        <HeroSectionHome />
        <AboutSectionHome />
        <DownloadSectionHome />
        <CollaboratorsSectionHome />
      </div>
    );
  }
}

export default HomePage;