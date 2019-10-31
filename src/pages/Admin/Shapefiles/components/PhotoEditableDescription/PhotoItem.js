import React from 'react';
import TextField from 'react-md/lib/TextFields/TextField';
import Button from 'react-md/lib/Buttons/Button';
import cn from 'classnames';

function PhotoItem(props) {
  const {
    photo, onChangeDescription, onRemove, onSetCover,
  } = props;

  const BCP = 'albumPhotoCard';
  const {
    description, file_path: url, id, is_cover: isCover,
  } = photo;
  const imgSrc = url
    ? `${process.env.STATIC_URL}/${url}`
    : '/static/img/image-placeholder-gray.png';

  return (
    <div className={`${BCP}GridColumn`}>
      <div className={BCP}>

        <Button
          icon
          className={cn(`${BCP}_setFavorite`, {
            [`${BCP}_setFavorite-favorite`]: photo.is_cover,
          })}
          iconClassName={cn({
            'wtfr wtf-star': !photo.is_cover,
            'wtfs wtf-star': photo.is_cover,
          })}
          tooltipLabel="set as favorite"
          tooltipPosition="right"
          onClick={onSetCover}
        />

        <div className={`${BCP}_media`}>
          <img
            className={`${BCP}_img`}
            src={imgSrc}
            alt=""
          />
        </div>

        <div className={`${BCP}_content`}>
          <TextField
            className={`${BCP}_description iField `}
            label="Description"
            value={description}
            rows={3}
            maxLength={140}
            onChange={onChangeDescription}
          />
        </div>

        <div className={`${BCP}_actions`}>
          <Button
            className="iBttn iBttn-error"
            children="remove"
            onClick={() => onRemove(id)}
          />
        </div>

      </div>
    </div>
  );
}
export default PhotoItem;
