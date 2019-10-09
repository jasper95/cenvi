import React from 'react';
import { formatISOToDate } from 'shared/utils/tools';
import pick from 'lodash/pick';
import history from 'shared/utils/history';

function BlogItem(props) {
  const { blog } = props;
  const dates = formatISOToDate(pick(blog, 'published_date'), ['published_date'], 'MM-DD-YYYY');
  return (
    <div>
      <p>{blog.name}</p>
      <p>{blog.excerpt}</p>
      <p>img here</p>
      <p>{blog.author}</p>
      <p>{dates.published_date}</p>
      <button
        onClick={() => {
          history.push(`/blogs/${blog.slug}`);
        }}
        type="button"
      >
        Read More
      </button>
    </div>
  );
}

export default BlogItem;
