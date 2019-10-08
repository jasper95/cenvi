import React from 'react';
import Button from 'react-md/lib/Buttons/Button';
import './style.scss';

function HeroSectionHome({ BCP = "section-hero"}) {
  return (
    <section id={BCP} className={BCP}>
      <div className="container">
        <div className="row">
          <div className={`col-md-6 col-content ${BCP}_content`}>
            <div className={`${BCP}_logos`}>
              <img id="img-logo" src="static/img/logo.png" alt="cenvi_logo" />
              <img id="img-upc" src="static/img/upc.png" alt="upc_logo" />
              <img id="img-up" src="static/img/up.png" alt="up_logo" />
            </div> 
            <h1 className={`${BCP}_region`}>
              Central Visayas
            </h1>
            <h1 className={`${BCP}_office`}>
              <span className="text">Center for Environmental Informatics</span> 
            </h1>
            <p className={`col_desc ${BCP}_desc`}>
              Providing technical solutions to environmental problems
            </p>
            <Button className={`iBttn iBttn-primary ${BCP}_bttn`}>
              Explore
            </Button>
          </div>
          <div className={`${BCP}_graphic`}>
            <img src="static/img/CENVI2.gif" alt=""/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSectionHome;
