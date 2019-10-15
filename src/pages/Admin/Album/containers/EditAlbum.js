import React, { useEffect } from 'react';
import 'react-fine-uploader/gallery/gallery.css';
import Gallery from 'shared/components/FileUpload/Gallery';
import pick from 'lodash/pick';
import useQuery from 'shared/hooks/useQuery';
import Paper from 'react-md/lib/Papers/Paper';
import TextField from 'react-md/lib/TextFields/TextField';
import DatePicker from 'shared/components/DatePicker';
import SelectAutocomplete from 'shared/components/SelectAutocomplete';
import CreatableInput from 'shared/components/CreatableInput';
import PhotosEditableDescription from 'pages/Admin/Album/components/PhotoEditableDescription';
import SingleFileUpload from 'shared/components/FileUpload/SingleFileUpload';
import useForm from 'shared/hooks/useForm';
import Button from 'react-md/lib/Buttons/Button';
import cn from 'classnames';
import { useUpdateNode } from 'shared/hooks/useMutation';

const customChangeHandler = {
  photos(newPhotos, oldFields) {
    return {
      ...oldFields,
      photos: newPhotos.length === 1 ? oldFields.photos.concat(newPhotos) : newPhotos,
    };
  },
};

function EditAlbum(props) {
  const { id } = props.match.params;
  const [, onQueryAlbum] = useQuery({ url: `/album/${id}` });
  const [mutationState, onMutate] = useUpdateNode({ node: 'album' });
  const [formState, formHandlers] = useForm({
    initialFields: {},
    customChangeHandler,
  });
  const { fields, errors } = formState;
  console.log('fields: ', fields);
  const { onSetFields, onElementChange } = formHandlers;
  const { photos = [] } = fields;

  useEffect(() => {
    onQueryAlbum()
      .then((newFields) => {
        onSetFields(newFields);
      });
  }, []);

  return (
    <>
      <div className="row row-formHeader">
        <Paper className="col col-md-12-guttered">
          <TextField
            id="name"
            label="Title"
            type="name"
            className="iField"
            onChange={onElementChange}
            errorText={errors.name}
            error={!!errors.name}
            value={fields.name || ''}
          />
        </Paper>
      </div>
      <div className="row">
        <Paper className="col col-md-12-guttered col-actions">
          <div className="iField">
            <p className="iField_label">Album Thumnail</p>
            <SingleFileUpload
              id="file"
              onChange={() => { console.log(' thumbnail ') }}
            />
          </div>
        </Paper>
      </div>
      <div className="row">
        <Paper className="col col-md-10-guttered col-form">
          <p className="iField_label">Album Photos</p>
          <div className="row">
            <div className="col col-md-4">
              <Gallery onUploadSuccess={onUploadSuccess} />
            </div>
            <div className="col col-md-8">
              <PhotosEditableDescription
                id="photos"
                photos={photos}
                onChange={onElementChange}
              />
            </div>
          </div>
          <TextField
            id="excerpt"
            label="Excerpt"
            type="excerpt"
            className="iField"
            onChange={onElementChange}
            errorText={errors.excerpt}
            error={!!errors.excerpt}
            value={fields.excerpt || ''}
            rows={4}
          />
        </Paper>
        <div className="col col-md-2-guttered col-actions">
          <Paper className="col col-md-12">
            <SelectAutocomplete
              id="status"
              options={[
                { value: 'published', label: 'Published' },
                { value: 'unpublished', label: 'Unpublished' },
              ]}
              label="Status"
              required
              value={fields.status}
              onChange={onElementChange}
            />
            {fields.status === 'published' && (
              <DatePicker
                id="published_date"
                label="Published Date"
                placeholderText="Published Date"
                onChange={onElementChange}
                value={fields.published_date}
              />
            )}
            <CreatableInput
              id="tags"
              value={fields.tags || []}
              onChange={onElementChange}
              className="iField iField-ci"
              classNamePrefix="iField-ci"
            />
            <Button
              className={cn('iBttn iBttn-primary', { processing: mutationState.loading })}
              onClick={() => {
                onMutate({
                  data: fields,
                });
              }}
              children="Save"
              flat
            />
          </Paper>
        </div>
      </div>
    </>
  );

  function onUploadSuccess(data) {
    data = pick(data, 'id', 'file_path');
    onElementChange([data], 'photos');
  }
}

export default EditAlbum;
