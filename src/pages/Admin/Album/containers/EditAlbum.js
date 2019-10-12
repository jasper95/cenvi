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
import useForm from 'shared/hooks/useForm';
import Button from 'react-md/lib/Buttons/Button';
import cn from 'classnames';
import { useUpdateNode } from 'shared/hooks/useMutation';


function EditAlbum(props) {
  const { id } = props.match.params;
  const [, onQueryAlbum] = useQuery({ url: `/album/${id}` });
  const [mutationState, onMutate] = useUpdateNode({ node: 'album' });
  const [formState, formHandlers] = useForm({
    initialFields: {},
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
  return (
    <>
      <Paper className="col col-md-12 col-formHeader">
        <TextField
          id="name"
          label="Title"
          type="name"
          onChange={onElementChange}
          errorText={errors.name}
          error={!!errors.name}
          value={fields.name || ''}
        />
      </Paper>
      <div className="row">
        <Paper className="col col-md-8 col-form">
          <div>
            Uploaded:
            <PhotosEditableDescription photos={photos} id="photos" onChange={onElementChange} />
          </div>
          <Gallery onUploadSuccess={onUploadSuccess} />
          <TextField
            id="excerpt"
            label="Excerpt"
            type="excerpt"
            onChange={onElementChange}
            errorText={errors.excerpt}
            error={!!errors.excerpt}
            value={fields.excerpt || ''}
            rows={4}
          />
        </Paper>
      </div>
      <Paper className="col col-md-4 col-actions">
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
    </>
  );

  function onUploadSuccess(data) {
    data = pick(data, 'id', 'file_path');
    onElementChange([...photos, data], 'photos');
  }
}

export default EditAlbum;
