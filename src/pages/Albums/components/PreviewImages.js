import React from 'react';

const SNIPPET_LIMIT = 3
function PreviewImages(props) {
  const {
    images,
    className,
    linkToMore
  } = props
  const snippetImages = [...images].slice(0, SNIPPET_LIMIT)
  if(images.length > 0) {
    return(
      <div className={`${className} previewImg`}>
        <h5 className="previewImg_label">
          Photos
        </h5>
        <div className="previewImg_container">
          {snippetImages.map((img,i) => (
            <div className='previewImg_item'>
              <img src={img} alt={`preview image ${i}`}/>
            </div>
          ))}
          { images.length > SNIPPET_LIMIT && (
            <div className="previewImg_item showmore">
              <div className="countContainer">
                <div className="count">
                  {images.length - SNIPPET_LIMIT}
                </div>
                <p className="text">
                  more photos
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
  return (
    <div className={className}>
      <div className="noRecords">
        <h1 className='noRecords_label'>
          No photos to display
        </h1>
      </div>
    </div>
  )
}

export default PreviewImages;
