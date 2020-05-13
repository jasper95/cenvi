import React from 'react';
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
import useForm from 'shared/hooks/useForm';
import Button from 'react-md/lib/Buttons/Button';
import history from 'shared/utils/history';
import cn from 'classnames';
import { useUpdateNode } from 'shared/hooks/useMutation';

import 'sass/pages/edit-admin-list-album.scss';
import { SpinnerSkeletonLoader } from 'shared/components/Skeletons';

function EditAlbum(props) {
  const { id } = props.match.params;
  const [formState, formHandlers] = useForm({
    initialFields: {},
    // customChangeHandler,
  });
  const { onSetFields, onElementChange } = formHandlers;
  const [queryState] = useQuery({ url: `/album/${id}` }, { isBase: true, onFetchSuccess: onSetFields });
  const [mutationState, onMutate] = useUpdateNode({ node: 'album' });
  const { fields, errors } = formState;
  const { photos = [] } = fields;
  console.log('photos: ', photos);
  const { loading } = queryState;
  if (loading) {
    return (
      <SpinnerSkeletonLoader />
    );
  }

  return (
    <>

      <div className="row row-ToolbarHeader row-ToolbarHeader-floating">
        <Paper className="col col-md-12-guttered">
          <div className="ToolbarHeader row">
            <div className="ToolbarHeader_title">
              <h1 className="title">
                { !fields.name
                  ? 'New Album'
                  : `Album: ${fields.name}`
                }
              </h1>
            </div>
            <div className="ToolbarHeader_toolbar">
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
              <Button
                flat
                className="iBttn iBttn-second-prio"
                children="Cancel"
                onClick={() => history.push('/admin/albums')}
              />
            </div>
          </div>
        </Paper>
      </div>

      <div className="row row-formHeader">
        <Paper className="col col-md-12-guttered">
          <div className="row">
            <div className="col col-infoFields col-md-8">
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
            </div>
            <div className="col col-infoDetails col-md-4">
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
            </div>
          </div>
        </Paper>
      </div>
      <div className="row row-stretch">
        <Paper className="col col-md-8-guttered col-uploadedPhotos">
          <p className="iField_label">Uploaded Photos</p>
          <PhotosEditableDescription
            id="photos"
            photos={photos}
            onChange={onElementChange}
          />
        </Paper>
        <Paper className="col col-md-4-guttered col-uploadedDetails">
          <p className="iField_label">Upload Photos</p>
          <Gallery onUploadSuccess={onUploadSuccess} />
        </Paper>
      </div>
    </>
  );

  function onUploadSuccess(data) {
    data = pick(data, 'id', 'file_path');
    onElementChange([data], 'photos');
  }
}

export default EditAlbum;
