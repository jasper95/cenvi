import React from 'react';
import { getPhotoUrl } from 'shared/utils/tools';

const SNIPPET_LIMIT = 3;
function PreviewImages(props) {
  const {
    photos,
    className,
    linkToMore,
    history,
  } = props;
  const snippetImages = [...photos].slice(0, SNIPPET_LIMIT);
  if (photos.length > 0) {
    return (
      <div className={`${className} previewImg`}>
        <h5 className="previewImg_label">
          Photos
        </h5>
        <div className="previewImg_container">
          {snippetImages.map((img, i) => (
            <div key={img.id} className="previewImg_item">
              <img src={getPhotoUrl(img)} alt="" />
            </div>
          ))}
          { photos.length > SNIPPET_LIMIT && (
            <div
              className="previewImg_item showmore"
              onClick={() => { history.push(linkToMore); }}
            >
              <div className="countContainer">
                <div className="count">
                  {photos.length - SNIPPET_LIMIT}
                </div>
                <p className="text">
                  more photos
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className={className}>
      <div className="noRecords">
        <h1 className="noRecords_label">
          No photos to display
        </h1>
      </div>
    </div>
  );
}

export default PreviewImages;
