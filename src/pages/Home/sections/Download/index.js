import React, { useEffect, useState } from 'react';
import { Col } from 'reactstrap';
import range from 'lodash/range';
import Button from 'react-md/lib/Buttons/Button';

import SectionHeader from 'shared/components/Section';
import './style.scss';

const apiURL = process.env.REACT_APP_API_HOST_PORT;

function DownloadSectionHome({ BCP = 'section-downloads' }) {
  const [downloads, handleDownload] = useState(null);
  const [categories, handleCategories] = useState(null);

  const getDownloads = () => {
    fetch(`${apiURL}/download`, { credentials: 'include' })
      .then(response => response.json())
      .then(response => handleDownload(response.data))
      .catch(err => console.error(err));
  };

  const getDownloadCategories = () => {
    fetch(`${apiURL}/download-category`, { credentials: 'include' })
      .then(response => response.json())
      .then(response => handleCategories(response.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    // getDownloads()
    // getDownloadCategories()
  }, []);

  return (
    <section id="downloads" className={`${BCP} section`}>
      <div className="container">

        <SectionHeader
          rowSize={8}
          headerLabel="Downloads"
          header="Files & Resources"
          desc="Aute esse ea anim ipsum amet id officia. Officia aliquip nisi fugiat
          magna commodo. Excepteur tempor occaecat ut culpa exercitation consectetur excepteur dolor.
            Duis et labore dolore duis. Labore voluptate do ipsum et velit.
          "
        />

        <div className="row row-downloads">
          {range(0, 9).map(r => (
            <div className="col col-md-4 col-sm-6">
              <DowndloadableItem />
            </div>
          ))}
        </div>

        {/* <div className="row row-content">
          <div className="col col-md-4 col-categories">
            {categories && categories.map(category => (
              <div key={category.id}>
                <CategoryButton
                  categoryName={category.name}
                  key={category.id}
                  id={category.id}
                  categoriesSize={categories.length}
                />
              </div>
            ))}
          </div>
          <div className="col col-md-8 col-downloads">
            {downloads && downloads.map((download, id) => (
              <Download
                titleFile={download.title}
                hrefVal={`${apiURL}/download/uid/${download.uid}/filename/${download.filename}`}
                id={download.category}
                key={id}
              />
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
}

function getRandom(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function DowndloadableItem(props) {
  const randomfiletype = ['csv', 'docx', 'jpeg', 'kml', 'shp', 'txt'];
  const {
    name = 'filename',
    format = randomfiletype[getRandom(randomfiletype.length)],
    description = 'Id veniam cillum nisi velit velit officia tempor occaecat esse ea.',
  } = props;

  const assumedFilename = `${name.replace(' ', '-')}.${format}`;
  const assumedImgSrc = `/static/img/file_icons/${format}.png`;

  return (
    <div className="dlItem">
      <div className="dlItem_thumbnail">
        <img
          src={assumedImgSrc}
          alt={assumedFilename}
        />
      </div>
      <div className="dlItem_info">
        <h1 className="dlItem_info_name">
          {name}
        </h1>
        <p className="dlItem_info_desc">
          {description}
        </p>
        <Button
          flat
          secondary
          children="Download"
          iconEl={<i className="wtfr wtf-cloud-download" />}
          className="iBttn iBttn-second-prio"
        />
      </div>
    </div>
  );
}

function Download(props) {
  return (
    <div>
      <Col xs="12" sm="12">
        <div
          id="collapse"
          key={props.id}
          className={`dowload-file collapse${props.id}`}
          style={{ display: 'none' }}
        >
          <a href={props.hrefVal} className="download-link">
            {props.titleFile}
          </a>
        </div>
      </Col>
    </div>
  );
}

function CategoryButton(props) {
  return (
    <div
      className="btn btn-info btn-category"
      data-toggle="collapse"
      role="button"
      id={`button${props.id}`}
      onClick={() => chooseCatDisplay(props.id, props.categoriesSize)}
    >
      {props.categoryName}
      <span className="arrow">❯</span>
    </div>
  );
}

function chooseCatDisplay(id, categoriesSize) {
  collapseShow(id, categoriesSize);
  changeBtnBackgrnd(id, categoriesSize);
}

function changeBtnBackgrnd(id, categoriesSize) {
  for (let i = 1; i <= categoriesSize; i++) {
    if (id === i) {
      document.getElementById(`button${id}`).style.background = '#bdc3c7';
    } else {
      document.getElementById(`button${i}`).style.background = '#f5f6fa';
    }
  }
}

function collapseShow(id, categoriesSize) {
  let i; let j; let
    elements;
  for (i = 1; i <= categoriesSize; i++) {
    if (id === i) {
      elements = document.getElementsByClassName(`collapse${id}`);
      for (j = 0; j < elements.length; j++) {
        elements[j].style.display = 'block';
      }
    } else {
      elements = document.getElementsByClassName(`collapse${i}`);
      for (j = 0; j < elements.length; j++) {
        elements[j].style.display = 'none';
      }
    }
  }
}

export default DownloadSectionHome;
