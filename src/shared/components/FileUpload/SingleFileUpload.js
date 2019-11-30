import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import cn from 'classnames';
import ImageLoader from 'react-image';

function SingleFileUpload(props) {
  const { value, onChange, id } = props;
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(value);
  useEffect(() => {
    if (value && typeof value === 'string') {
      setPreview(value);
    }
  }, [value]);
  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

  const hasPreviewImage = (file && file.type.includes('image')) || preview;
  return (
    <div
      className={cn('iDropzone', { 'iDropzone-hasFiles': hasPreviewImage })}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <p className="iDropzone_entryMsg">
        Drag 'n' drop some files here, or click to select files
      </p>
      { hasPreviewImage && (
        <div className="iDropzone_files">
          <div className="iDropzone_file">
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
    </div>
  );

  function onDrop([acceptedFile]) {
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    setFile(acceptedFile);
    onChange(acceptedFile, id);
    reader.readAsDataURL(acceptedFile);
  }
}

export default SingleFileUpload;
