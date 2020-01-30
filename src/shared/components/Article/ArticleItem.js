import React from 'react';
import { formatISOToDate } from 'shared/utils/tools';
import pick from 'lodash/pick';
import history from 'shared/utils/history';
import Link from 'react-router-dom/Link';
import Button from 'react-md/lib/Buttons/Button';
import ImageLoader from 'react-image';
import Author from './Author';
import 'sass/components/cards/articleCard/index.scss';

function ArticleItem(props) {
  const { data, type } = props;
  const dates = formatISOToDate(pick(data, 'published_date'), ['published_date'], 'MM-DD-YYYY');
  const BCP = 'articleCard';
  return (
    <div className={BCP}>

      <p className={`${BCP}_date`}>
        {dates.published_date}
      </p>

      <div className={`${BCP}_media`}>
        <div className={`${BCP}_media_action`}>
          <Button
            icon
            primary
            className={`${BCP}_link`}
            children="insert_link"
            onClick={() => {
              history.push(`/${type}/${data.slug}`);
            }}
          />
        </div>
        <ImageLoader
          className={`${BCP}_media_img`}
          src={`${process.env.STATIC_URL}/${data.image_url}`}
          alt=""
        />
      </div>

      <div className={`${BCP}_content`}>
        <Link className={`${BCP}_header`} to={`/blogs/${data.slug}`}>
          {data.name}
        </Link>
        <div className={`${BCP}_tags tag`}>
          { data.tags.length > 0 && data.tags.map(tag => (
            <Link
              to="/login"
              className="tag_item"
            >
              {tag}
            </Link>
          ))}
        </div>
        <p className={`${BCP}_excerpt`}>
          {data.excerpt}
        </p>
      </div>

      <div className={`${BCP}_footer`}>
        <Author
          className={`${BCP}_author`}
          name={data.author}
        />
      </div>
    </div>
  );
}


export default ArticleItem;
