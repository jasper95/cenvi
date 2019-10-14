import React from 'react';
import PreviewImages from './PreviewImages';
import 'sass/components/cards/albumCard/index.scss';

function AlbumCard(props) {
  const {
    id, name, description,
    category, image, created_date,
    images, history
  } = props;
  const BCP = 'albumCard';
  return (
    <div className={`${BCP} row row-center`} key={id}>
      <div className={`${BCP}_media col col-md-5 `}>
        <img
          className={`${BCP}_media_img`}
          src={image}
          alt={name}
        />
      </div>
      <div className={`${BCP}_content col col-md-7 `}>
        <h1 className={`${BCP}_category`}>
          {category}
        </h1>
        <h1 className={`${BCP}_header`}  onClick={() => {history.push("/albums/test")}}>
          {name}
        </h1>
        <p className={`${BCP}_createdDate`}>
          {created_date}
        </p>
        <p className={`${BCP}_description`}>
          {description}
        </p>
        <PreviewImages
          className={`${BCP}_images`}
          images={images}
          linkToMore="/albums/test"
          history={history}
        />
      </div>
    </div>
  );
}

export default AlbumCard;
