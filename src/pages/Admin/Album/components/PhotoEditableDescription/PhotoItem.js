import React, { useState } from 'react';
import TextField from 'react-md/lib/TextFields/TextField';
import Button from 'react-md/lib/Buttons/Button';
import cn from 'classnames';
import { sortableHandle } from 'react-sortable-hoc';

const DragHandle = sortableHandle(({ 
  className, icon,
  iconClassName 
}) => (
  <Button
    icon
    children={icon}
    className={className}
    iconClassName={iconClassName}
  />
));

function PhotoItem(props) {
  const {
    photo, onChangeDescription, onRemove,
  } = props;

  const [isFavorite, setFavorite] = useState(false)

  const BCP = 'albumPhotoCard'
  const { description, file_path: url, id } = photo;
  const imgSrc = url 
    ? `${process.env.STATIC_URL}/${url}`
    : '/static/img/image-placeholder-gray.png'

  return (
    <div className={`${BCP}GridColumn`}>
      <div className={BCP}>

        <Button
          icon
          className={cn(`${BCP}_setFavorite`, {
            [`${BCP}_setFavorite-favorite`] : isFavorite,
          })}
          iconClassName={cn({
            'wtfr wtf-star' : !isFavorite,
            'wtfs wtf-star' : isFavorite,
          })}
          tooltipLabel="set as favorite"
          tooltipPosition="right"
          onClick={() => setFavorite(!isFavorite)}
        />

        <div className={`${BCP}_media`}>
          <img
            className={`${BCP}_img`}
            src={imgSrc}
          />
        </div>

        <div className={`${BCP}_content`}>
          <TextField
            className={`${BCP}_description iField `}
            label="Description"
            value={description}
            rows={3}
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
