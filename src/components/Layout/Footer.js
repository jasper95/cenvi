import React from 'react';

import { Icon } from 'react-icons-kit';
import { mapMarker } from 'react-icons-kit/fa/mapMarker';
import { phone } from 'react-icons-kit/fa/phone';
import { file } from 'react-icons-kit/fa/file';
import { envelope } from 'react-icons-kit/fa/envelope';
import { facebook } from 'react-icons-kit/fa/facebook';


import 'sass/components/footer/index.scss';


export default function Footer() {

  const contactDetails = {
    address: 'University of the Philippines Cebu, Gorordo Ave., Lahug, Cebu City',
    telNoCenvi: '(032) 231-0223',
    telNoUp: '(032) 232-8185',
    localCenvi: '(local) 109',
    email: 'upcebunicer@gmail.com',
    fbPage: 'https://www.facebook.com/upcenvi/',
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="row row-main">
          <div className="col col-center">
            <h1 className="footer_header header-1">
              CONTACT US
            </h1>
            <ul className="footer_contact_list">
              <li className="footer_contact_list_item">
                <Icon icon={mapMarker} size={20} className="icon"/>
                <p className="text">{contactDetails.address}</p>
              </li>
              <li className="footer_contact_list_item">
                <Icon icon={phone} size={20} className="icon" />
                <p className="text">{contactDetails.telNoCenvi}</p>
                <p className="text">{contactDetails.telNoUp}</p>
                <p className="text">{contactDetails.localCenvi}</p>
              </li>
              <li className="footer_contact_list_item">
                <Icon icon={envelope} size={20} className="icon" />
                <p className="text">{contactDetails.email}</p>
              </li>
              <li className="footer_contact_list_item">
                <Icon icon={facebook} size={20} className="icon" />
                <a
                  href={contactDetails.fbPage}
                  className="text"
                >
                  {contactDetails.fbPage}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row row-copyright row-right">
          <p className="copyright">
            Copyright © { new Date().getFullYear() } Central Visayas 
            Center for Environmental Informatics
          </p>
        </div>
      </div>
    </footer>
  );
}
