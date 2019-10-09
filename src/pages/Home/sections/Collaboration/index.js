import React from 'react';
import { Row, Col } from 'reactstrap';
import { Icon } from 'react-icons-kit';
import { mapMarker } from 'react-icons-kit/fa/mapMarker';
import { phone } from 'react-icons-kit/fa/phone';
import { file } from 'react-icons-kit/fa/file';
import { envelope } from 'react-icons-kit/fa/envelope';
import { SectionHeader } from 'components/Section';
import './style.scss';

function CollaboratorsSectionHome({ BCP = "section-collaborators"}) {
  const collaboratos = [
    {
      id:1,
      logo: 'usc.jpg',
      name: 'University of San Carlos',
      address: 'Corner M.J. Cuenco Ave. & R. Palma St., Cebu',
      phone: '412-1399',
      fax: '256-2657',
      email: 'information@usc.edu.ph',
    },
    {
      id:2,
      logo: 'cit-u.png',
      name: 'Cebu Institute of Technology - University',
      address: 'N. Bacalso Avenue, Cebu',
      phone: '261-7741',
      fax: '261-7743',
      email: 'info@cit.edu',
    },
    {
      id:3,
      logo: 'ctu.png',
      name: 'Cebu Technological University - Argao Campus',
      address: 'Ed Kintanar St., Lamacan, Argao, Cebu',
      phone: '(6332) 485-8290',
      fax: '(6332) 485-8290',
      email: 'argao@ctu.edu.ph',
    },
    {
      id:4,
      logo: 'upv.png',
      name: 'University of the Philippines Visayas',
      address: 'New Administration Building, Miagao, Iloilo',
      phone: '(033) 315-9494',
      fax: '(033) 315-9494',
      email: 'ipo@upv.edu.ph',
    },
    {
      id:5,
      logo: 'nmrdc.png',
      name: 'National Mango Research & Development Center',
      address: 'San Miguel, Jordan, Guimaras',
      phone: '(033) 237-1391',
      fax: '(033) 237-1391',
      email: 'bpi.guimaras@gmail.com',
    }
  ]

  return (
    <section id={BCP} className={`${BCP} section`}>
      <div className="container">
        <SectionHeader
          headerLabel='collaborators'
          header='Together as One'
        />
        <div className="row row-body row-size-5">
          {collaboratos.map(info => (
            <div className="col">
              <div className="col_logo">
                <img
                  src={'/static/img/collaborators/' + info.logo}
                  alt={info.logo}
                />
              </div>
              <div className="col_content">
                <h2 className="col_content_name">
                  {info.name}
                </h2>
                <ul className="col_content_list">
                  <li className="col_content_list_item">
                    <Icon
                      icon={mapMarker}
                      size={20}
                      className="icon"
                    />
                    <span className="text">
                      {info.address}
                    </span>
                  </li>
                  <li className="col_content_list_item">
                    <Icon
                      icon={phone}
                      size={20}
                      className="icon"
                    />
                    <span className="text">
                      {info.phone}
                    </span>
                  </li>
                  <li className="col_content_list_item">
                    <Icon
                      icon={file}
                      size={20}
                      className="icon"
                    />
                    <span className="text">
                      {info.fax}
                    </span>
                  </li>
                  <li className="col_content_list_item">
                    <Icon
                      icon={envelope}
                      size={20}
                      className="icon"
                    />
                    <span className="text">
                      {info.email}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CollaboratorsSectionHome;
