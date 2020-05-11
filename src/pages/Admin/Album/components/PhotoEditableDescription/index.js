import React, { useMemo, Fragment } from 'react';
import chunk from 'lodash/chunk';
import flatten from 'lodash/flatten';
import { arrayMove } from 'shared/utils/tools';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';

import PhotoItem from './PhotoItem';
import 'sass/components/cards/albumPhotoCard/index.scss';


const SortablePhotoItem = sortableElement(PhotoItem);
const SortableContainer = sortableContainer(({ children }) => (
  <div className="albumPhotoCardGridContainer">
    {children}
  </div>
));


function PhotosEditableDescription(props) {
  const { photos, onChange, id } = props;
  const chunkedPhotos = useMemo(() => chunk(photos, 4), [photos]);
  return (
    <div className="albumPhotoCardFormGridContainer">
      <SortableContainer
        axis="xy"
        onSortEnd={onSortEnd}
        helperClass="onTheFly onTheFly-albumCard"
      >
        {chunkedPhotos.map((row, i) => (
          <Fragment key={i}>
            {row.map((photo, index) => (
              <SortablePhotoItem
                key={photo.id}
                photo={photo}
                index={index}
                onChangeDescription={(value) => {
                  if (value && value.length >= 140) {
                    return;
                  }
                  handleChangeDescription(value, photo.id);
                }}
                onSetCover={() => handleSetFavorite(photo.id)}
                onRemove={handleRemove}
                collection={i}
              />
            ))}
          </Fragment>
        ))}
      </SortableContainer>
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
  }

  function handleSetFavorite(photoId) {
    const newPhotos = photos.map((photo) => {
      if (photo.id === photoId) {
        return {
          ...photo,
          is_cover: true,
        };
      }
      return {
        ...photo,
        is_cover: false,
      };
    });
    onChange(newPhotos, id);
  }

  function handleRemove(photoId) {
    onChange(photos.filter(photo => photo.id !== photoId), id);
  }

  function onSortEnd({ oldIndex, newIndex, collection }) {
    const newCollections = [...chunkedPhotos];
    newCollections[collection] = arrayMove(
      chunkedPhotos[collection],
      oldIndex,
      newIndex,
    );
    onChange(flatten(newCollections), id);
  }
}

export default PhotosEditableDescription;
