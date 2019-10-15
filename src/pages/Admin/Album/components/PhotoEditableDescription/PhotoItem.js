import React from 'react';
import TextField from 'react-md/lib/TextFields/TextField';
import Button from 'react-md/lib/Buttons/Button';
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

  const BCP = 'albumPhotoCard'
  const { description, file_path: url, id } = photo;
  const imgSrc = url 
    ? `${process.env.STATIC_URL}/${url}`
    : '/static/img/image-placeholder-gray.png'

  return (
    <div className={`${BCP}GridColumn`}>
      <div className={BCP}>
        <div className={`${BCP}_media`}>
          <img
            className={`${BCP}_img`}
            src={imgSrc}
          />
        </div>

        <div className={`${BCP}_content`}>
          <TextField
            className="iField"
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
