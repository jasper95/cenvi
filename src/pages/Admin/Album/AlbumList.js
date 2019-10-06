import React, { useRef, useEffect } from 'react';
import FineUploaderTraditional from 'fine-uploader-wrappers';
import Gallery from 'react-fine-uploader/gallery';
import 'react-fine-uploader/gallery/gallery.css';
import cookie from 'js-cookie';


function AlbumList() {
  const uploader = useRef(new FineUploaderTraditional({
    options: {
      request: {
        customHeaders: {
          Authorization: `Bearer ${cookie.get('token')}`,
        },
        endpoint: '/api/file/upload',
        uuidName: 'uuid',
        totalFileSizeName: 'totalfilesize',
        filenameParam: 'filename',
        inputName: 'file',
      },
      retry: {
        // preventRetryResponseProperty: 'prevent_retry',
        // enableAuto: true,
        maxAutoAttempts: Infinity,
      },
      chunking: {
        enabled: true,
        mandatory: true,
        paramNames: {
          chunkSize: 'chunksize',
          partByteOffset: 'partbyteoffset',
          partIndex: 'partindex',
          totalParts: 'totalparts',
        },
      },
    },
  }));
  return (
    <Gallery uploader={uploader.current} />
  );
}

export default AlbumList;
