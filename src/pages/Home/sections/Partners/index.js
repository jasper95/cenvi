import React from 'react';
import './style.scss';

function PartnersSectionHome({ BCP = "section-partners"}) {
  const partnerLogos = [
    {
      id: 'logo',
      src: "static/img/logo.png",
      alt: "cenvi logo",
    },
    {
      id: 'logo-upc',
      src: "static/img/upc.png",
      alt: "upc logo",
    },
    {
      id: 'logo-up',
      src: "static/img/up.png",
      alt: "up logo",
    }
  ]

  return (
    <section id={BCP} className={BCP}>
      <div className="container ">
        <div className="row">
          <div className="col col-label col-middle col-md-2">
            <h1 className="col_header">
              Partners
            </h1>
            <p className="col_desc">
              Cenvi was founded by these schools to achieve the cause
            </p>
          </div>
          <div className="col col-logos col-md-10">
            <div className="logo">
              {partnerLogos.map( partner => (
               <div
                  key={partner.id}
                  className={`logo_item logo-${partner.id}`}
                >
                  <img { ...partner } />
               </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PartnersSectionHome;
