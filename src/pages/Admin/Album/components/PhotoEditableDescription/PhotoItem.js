import React from 'react';
import TextField from 'react-md/lib/TextFields/TextField';
import Button from 'react-md/lib/Buttons/Button';

function PhotoItem(props) {
  const {
    photo, onChangeDescription, onRemove,
  } = props;
  const { description, file_path: url, id } = photo;
  return (
    <div>
      <img alt="" src={`${process.env.STATIC_URL}/${url}`} />
      <TextField
        label="Description"
        value={description}
        onChange={onChangeDescription}
      />
      <Button icon children="remove" onClick={() => onRemove(id)} />
    </div>
  );
}
export default PhotoItem;
