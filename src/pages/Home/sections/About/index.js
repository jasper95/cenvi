import React from 'react';
import SectionHeader from 'shared/components/Section';
import useAutoScroll from 'shared/hooks/useAutoScroll'
import './style.scss';

function AboutSectionHome({ BCP = 'section-about' }) {
  const ref = useAutoScroll({ elementId: 'about' })
  return (
    <section ref={ref} id="about" className={`${BCP} section`}>
      <div className="container">
        <SectionHeader
          headerLabel="about us"
          header="Get to know Cenvi"
        />
        <div className="row row-content">
          <div className="col col-md-4">
            <div className="col_graphic">
              <i className="cenvi-icon-analytics-1" />
            </div>
            <h1 className="col_header header-1">
              What we do
            </h1>
            <p className="col_desc">
              CENVI uses analytical and ICT-based methods to
              monitor, assess, and protect natural resources.
              CENVI intends to contribute in strengthening the
              leadership of Central Visayas in the ICT industry,
              particularly in the emerging fields of data science,
              remote sensing, and artificial intelligence, by
              contributing to environmental conservation,
              research, and development.
            </p>
            <p className="col_desc">
              The center also hopes to be a long-term partner of
              the local governments in Central Visayas in
              developing livable and resilient communities while
              ensuring ecological integrity.
            </p>
          </div>
          <div className="col-center col col-md-4">
            <div className="col_graphic">
              <i className="cenvi-icon-browser" />
            </div>
            <h1 className="col_header header-1">
              Web Portal
            </h1>
            <p className="col_desc">
              As a web-based platform, CENVI web portal provides
              its audience access to various tools (e.g map
              viewer, downloads), appropriate access to important
              information, and effective channels of communication
              through single sign on. Users can also sign up for
              an account.
            </p>
          </div>
          <div className="col-right col col-md-4">
            <div className="col_graphic">
              <i className="cenvi-icon-diamond" />
            </div>
            <h1 className="col_header header-1">
              who we are
            </h1>
            <p className="col_desc">
              We are a team comprised of members who can handle a
              variety of tasks and are able to transition
              throughout the company at a moment's notice. There
              are important components that a team must have in
              order to be the efficient and effective force that
              most managers desire of them.
            </p>
            <p className="col_desc">
              CENVI is implemented by the University of the
              Philippines Cebu through the Niche Centers in the
              Regions for R&D (NICER) program of the Department of
              Science and Technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSectionHome;
