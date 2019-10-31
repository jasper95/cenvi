import React, { useEffect } from 'react';
import 'react-fine-uploader/gallery/gallery.css';
import Gallery from 'shared/components/FileUpload/Gallery';
import pick from 'lodash/pick';
import useQuery from 'shared/hooks/useLazyQuery';
import Paper from 'react-md/lib/Papers/Paper';
import TextField from 'react-md/lib/TextFields/TextField';
import DatePicker from 'shared/components/DatePicker';
import CreatableInput from 'shared/components/CreatableInput';
import SelectAutocomplete from 'shared/components/SelectAutocomplete';
import PhotosEditableDescription from 'pages/Admin/Album/components/PhotoEditableDescription';
import useForm from 'shared/hooks/useForm';
import Button from 'react-md/lib/Buttons/Button';
import history from 'shared/utils/history';
import cn from 'classnames';
import { useUpdateNode } from 'shared/hooks/useMutation';

import 'sass/pages/edit-admin-list-album.scss';

const customChangeHandler = {
  photos(newPhotos, oldFields) {
    return {
      ...oldFields,
      photos: newPhotos.length === 1 ? oldFields.photos.concat(newPhotos) : newPhotos,
    };
  },
};

function EditShapefiles(props) {
  const { id } = props.match.params;
  const [queryState, onQueryAlbum] = useQuery({ url: `/album/${id}` });
  const [mutationState, onMutate] = useUpdateNode({ node: 'album' });
  const [formState, formHandlers] = useForm({
    initialFields: {},
    customChangeHandler,
  });
  const { fields, errors } = formState;
  const { onSetFields, onElementChange } = formHandlers;
  const { photos = [] } = fields;

  useEffect(() => {
    onQueryAlbum()
      .then((newFields) => {
        onSetFields(newFields);
      });
  }, []);
  const { loading } = queryState;
  if (loading) {
    return (
      <span>Loading...</span>
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
                  ? 'New Shapefile'
                  : `Shapefile: ${fields.name}`
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
            <div className="col col-md-8">
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
            </div>
            <div className="col col-md-4">
              <SelectAutocomplete
                id="status"
                options={[
                  { value: 'category_1', label: 'category 1' },
                  { value: 'category_2', label: 'category 2' },
                  { value: 'category_3', label: 'category 3' }
                ]}
                label="Category"
                required
                value={fields.category}
                onChange={onElementChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col col-md-12">
              <TextField
                id="description"
                label="Description"
                type="description"
                className="iField"
                onChange={onElementChange}
                errorText={errors.description}
                error={!!errors.description}
                value={fields.description || ''}
                rows={4}
              />
            </div>
          </div>
        </Paper>
      </div>
      <div className="row row-stretch">
        <Paper className="col col-md-12-guttered col-uploadedDetails">
          <p className="iField_label">Upload Shapefile</p>
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

export default EditShapefiles;
