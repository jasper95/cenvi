import React from 'react';
import TextField from 'react-md/lib/TextFields/TextField';
import Button from 'react-md/lib/Buttons/Button';
import { sortableHandle } from 'react-sortable-hoc';

const DragHandle = sortableHandle(() => <Button children="more_vert" icon />);


function PhotoItem(props) {
  const {
    photo, onChangeDescription, onRemove,
  } = props;
  const { description, file_path: url, id } = photo;
  return (
    <div>
      <DragHandle />
      <img
        style={{
          width: '200px', height: '200px', objectFit: 'cover',
        }}
        alt=""
        src={`${process.env.STATIC_URL}/${url}`}
      />
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
