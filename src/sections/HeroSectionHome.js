import React, { Component } from 'react';

function HeroSectionHome(props) {
  return (
    <section id="section-hero" className="section-hero">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-content">
            <div className="section-hero_logos">
              <img id="img-logo" src="static/img/logo.png" alt="cenvi_logo" />
              <img id="img-upc" src="static/img/upc.png" alt="upc_logo" />
              <img id="img-up" src="static/img/up.png" alt="up_logo" />
            </div> 
            <h1 className="col_header section-hero_region">
              CENTRAL VISAYAS
            </h1>
            <h1 className="col_header section-hero_office">
              CENTER FOR ENVIRONMENTAL INFORMATICS
            </h1>
            <div className="col_desc section-hero_desc">
              Providing technical solutions to environmental problems
            </div>
          </div>
          <div className="col-md-6 col-graphic">
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSectionHome;
