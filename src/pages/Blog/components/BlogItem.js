import React from 'react';
import { formatISOToDate } from 'shared/utils/tools';
import pick from 'lodash/pick';
import history from 'shared/utils/history';
import Link from 'react-router-dom/Link';
import Button from 'react-md/lib/Buttons/Button';
import 'sass/components/blogCard/index.scss';

function BlogItem(props) {
  const { blog } = props;
  const dates = formatISOToDate(pick(blog, 'published_date'), ['published_date'], 'MM-DD-YYYY');
  const BCP = 'blogCard';

  console.log('dates == ', dates);

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
              history.push(`/blogs/${blog.slug}`);
            }}
          />
        </div>
        <img
          className={`${BCP}_media_img`}
          src="https://source.unsplash.com/random"
          alt=""
        />
      </div>

      <div className={`${BCP}_content`}>
        <Link className={`${BCP}_header`} to={`/blogs/${blog.slug}`}>
          {/* {blog.name} */}
          Example Blog with Very Long Name
        </Link>
        <div className={`${BCP}_tags tag`}>
          { blog.tags.length > 0 && blog.tags.map(tag => (
            <Link
              to="/login"
              className="tag_item"
            >
              {/* {tag} */}
              Technology
            </Link>
          ))}
        </div>
        <p className={`${BCP}_excerpt`}>
          {/* {blog.excerpt} */}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Magnam, pariatur sunt mollitia hic consequuntur. Unde.
        </p>
      </div>

      <div className={`${BCP}_footer`}>
        <Author
          className={`${BCP}_author`}
          name={blog.author}
        />

      </div>
    </div>
  );
}

function Author(props) {
  const {
    className,
    name,
    avatar = 'https://i.pravatar.cc/300',
    userId = 1,
    position = 'developer',
  } = props;

  return (
    <div className={`${className} author`}>
      <div className="author_avatar">
        <img src={avatar} />
      </div>
      <div className="author_info">
        <p className="author_info_name">
          {name}
        </p>
        <p className="author_info_position">
          {position}
        </p>
      </div>
    </div>
  );
}

export default BlogItem;
