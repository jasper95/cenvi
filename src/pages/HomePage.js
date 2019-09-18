import React, { Component } from 'react';
// import { animateScroll } from '../scripts/animate-scroll';

import Navbar from 'components/Navbar/Navbar';
import Header from 'components/Header/Header';
import About from 'components/About/About';
import Downloads from 'components/Downloads/Downloads';
import Collaborators from 'components/Collaborators/Collaborators';
import Contact from 'components/Contact/Contact';

class HomePage extends Component {
  componentDidMount() {
    // animateScroll();
  }

  render() {
    return (
      <div id="page-container">
        <Navbar />
        <scroll-container>
          <section id="section-header">
            <Header />
          </section>
          <section id="section-about">
            <About />
          </section>
          <section id="section-downloads">
            <Downloads />
          </section>
          <section id="section-collaborators">
            <Collaborators />
          </section>
          <section id="section-contact">
            <Contact />
          </section>
        </scroll-container>
      </div>
    );
  }
}

export default HomePage;
