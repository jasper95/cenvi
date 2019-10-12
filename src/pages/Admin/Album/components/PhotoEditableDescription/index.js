import React from 'react';
import PhotoItem from './PhotoItem';

function PhotosEditableDescription(props) {
  const { photos, onChange, id } = props;
  return (
    <div>
      {photos.map(photo => (
        <PhotoItem
          key={photo.id}
          photo={photo}
          onChangeDescription={value => handleChangeDescription(value, photo.id)}
          onRemove={handleRemove}
        />
      ))}
    </div>
  );

  function handleChangeDescription(description, photoId) {
    const newPhotos = photos.map((photo) => {
      if (photo.id === photoId) {
        return {
          ...photo,
          description,
        };
      }
      return photo;
    });
    onChange(newPhotos, id);
    console.log('id: ', id);
  }
  function handleRemove(photoId) {
    onChange(photos.filter(photo => photo.id !== photoId), id);
  }
}

export default PhotosEditableDescription;
