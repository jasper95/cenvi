import React, { useEffect, useState } from 'react';
import { Col } from 'reactstrap';
import range from 'lodash/range';
import Button from 'react-md/lib/Buttons/Button';

import SectionHeader from 'shared/components/Section';
import './style.scss';
import useQuery from 'shared/hooks/useQuery';
import { downloadFile } from 'shared/utils/tools';
import { SpinnerSkeletonLoader } from 'shared/components/Skeletons';

function DownloadSectionHome({ BCP = 'section-downloads' }) {
  const [queryState] = useQuery({ url: '/resource' }, { isBase: true });
  const { data, loading } = queryState;
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
          {loading ? (
            <SpinnerSkeletonLoader />
          ) : (
            <>
              {data.map(item => (
                <div className="col col-md-4 col-sm-6">
                  <DowndloadableItem data={item} />
                </div>
              ))}
            </>
          )}

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
  const {
    data,
  } = props;
  const {
    name,
    format,
    description,
    file_path: filePath,
  } = data;

  const assumedFilename = `${name.replace(' ', '-')}.${format}`;
  const assumedImgSrc = `/img/file_icons/${format}.png`;

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
          onClick={() => downloadFile(filePath)}
        />
      </div>
    </div>
  );
}


export default DownloadSectionHome;
