import React from 'react';
import { formatISOToDate } from 'shared/utils/tools';
import pick from 'lodash/pick';
import history from 'shared/utils/history';
import Link from 'react-router-dom/Link';
import Button from 'react-md/lib/Buttons/Button';
import 'sass/components/author/index.scss';

function Author(props) {
  const {
    className,
    name,
    avatar = '/static/img/default-avatar.png',
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

export default Author;
