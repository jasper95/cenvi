import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import cn from 'classnames';
import ImageLoader from 'react-image';
import TextFieldMessage from 'react-md/lib/TextFields/TextFieldMessage';
import { useDispatch } from 'react-redux';
import { showError } from 'shared/redux/app/reducer';
import FILE_TYPE_IMAGES from 'shared/constants/fileType';

function SingleFileUpload(props) {
  const {
    value, onChange, id, error,
    acceptedFileTypes
  } = props;
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (value && typeof value === 'string') {
      setPreview(value);
    }
  }, [value]);
 
  const { getRootProps, getInputProps } = useDropzone({ 
    onDrop, 
    multiple: false,
  }); 


  const hasPreviewImage = (file && file.type.includes('image')) || preview;

  return (
    <div
      className={cn('iDropzone iDropzone-singleUpload', { 'iDropzone-hasFiles': hasPreviewImage })}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <p className="iDropzone_entryMsg">
        Drag 'n' drop some files here, or click to select files
      </p>
      { hasPreviewImage && (
        <div className="iDropzone_files">
          <div className={`iDropzone_file  iDropzone_file--${file.type.split('/')[1]}`}>
            <div className="iDropzone_file_preview">
              <ImageLoader
                className="iDropzone_file_preview_src"
                src={preview}
                alt="Preview"
              />
            </div>
          </div>
        </div>
      )}
      <TextFieldMessage
        className="iField_date_message"
        errorText={error}
        error={error}
      />
    </div>
  );

  function onDrop([acceptedFile]) {
    const reader = new FileReader();
    const fileType = acceptedFile.type.split('/')[1]

    setFile(acceptedFile);
    
    console.log('acceptedFile ==== ', acceptedFile)

    if (acceptedFileTypes && !acceptedFileTypes.includes(fileType)) {
      dispatch(showError({ message: 'File is not supported' }))
      return;
    }

    const retrieveDefaultFileType = FILE_TYPE_IMAGES.find((f) => f.type === fileType)

    console.log('retrieveDefaultFileType === ', retrieveDefaultFileType)

    reader.onload = () => {
      let preview = retrieveDefaultFileType 
        ? retrieveDefaultFileType.image
        : reader.result

      setPreview(preview);
    };

    onChange(acceptedFile, id);
    reader.readAsDataURL(acceptedFile);
  }
}

export default SingleFileUpload;
