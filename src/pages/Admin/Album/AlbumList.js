import React, { useState } from 'react';
import 'react-fine-uploader/gallery/gallery.css';
import Gallery from 'shared/components/FileUpload/Gallery';
import pick from 'lodash/pick';
import { Paper } from 'react-md';

function AlbumList() {
  const [uploaded, setUploaded] = useState([]);
  return (
    <Paper>
      <div>
        Uploaded:
        <div>
          {uploaded.map(e => (
            <div key={e.id}>
              <img alt="" src={`${process.env.STATIC_URL}/${e.file_path}`} />
            </div>
          ))}
        </div>
      </div>
      <Gallery onUploadSuccess={onUploadSuccess} />
    </Paper>
  );

  function onUploadSuccess(data) {
    setUploaded(prevUploaded => prevUploaded.concat([pick(data, 'id', 'file_path')]));
  }
}

export default AlbumList;
