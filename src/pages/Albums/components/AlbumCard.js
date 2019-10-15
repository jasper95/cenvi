import React from 'react';
import Link from 'react-router-dom/Link';
import { getPhotoUrl, formatISOToDate } from 'shared/utils/tools';
import pick from 'lodash/pick';
import PreviewImages from './PreviewImages';
import 'sass/components/cards/albumCard/index.scss';

function AlbumCard(props) {
  const {
    history,
    album,
  } = props;
  const {
    id, photos, tags, name, slug, excerpt,
  } = album;
  const [hero] = photos;
  const BCP = 'albumCard';
  const dates = formatISOToDate(pick(album, 'published_date'), ['published_date'], 'MM-DD-YYYY');
  return (
    <div className={`${BCP} row row-center`} key={id}>
      <div className={`${BCP}_media col col-md-5 `}>
        <img
          className={`${BCP}_media_img`}
          src={getPhotoUrl(hero)}
          alt={name}
        />
      </div>
      <div className={`${BCP}_content col col-md-7 `}>

        <h1 className={`${BCP}_header`} onClick={() => { history.push(`/albums/${slug}`); }}>
          {name}
        </h1>

        { tags.length > 0 && (
          <div className={`${BCP}_tags tag`}>
            {tags.map(tag => (
              <Link
                to="/login"
                className="tag_item"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        <p className={`${BCP}_createdDate`}>
          {dates.published_date}
        </p>
        <p className={`${BCP}_description`}>
          {excerpt}
        </p>
        <PreviewImages
          className={`${BCP}_images`}
          photos={photos}
          linkToMore="/albums/test"
          history={history}
        />
      </div>
    </div>
  );
}

export default AlbumCard;
