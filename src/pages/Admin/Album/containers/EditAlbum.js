import React, { useState, useEffect } from 'react';
import 'react-fine-uploader/gallery/gallery.css';
import Gallery from 'shared/components/FileUpload/Gallery';
import pick from 'lodash/pick';
import useQuery from 'shared/hooks/useQuery';
import Paper from 'react-md/lib/Papers/Paper';
import TextField from 'react-md/lib/TextFields/TextField';
import DatePicker from 'shared/components/DatePicker';
import SelectAutocomplete from 'shared/components/SelectAutocomplete';
import CreatableInput from 'shared/components/CreatableInput';
import useForm from 'shared/hooks/useForm';


function EditAlbum(props) {
  const { id } = props.match.params;
  const [albumResponse, onQueryAlbum] = useQuery({ url: `/album/${id}` });
  const [formState, formHandlers] = useForm({
    initialFields: {},
  });
  const { fields, errors } = formState;
  const { onSetFields, onElementChange } = formHandlers;
  useEffect(() => {
    onQueryAlbum()
      .then((newFields) => {
        onSetFields(newFields);
      });
  }, []);
  const [uploaded, setUploaded] = useState([]);
  return (
    <>
      <Paper>
        <TextField
          id="name"
          onChange={onElementChange}
          value={fields.name}
          errorText={errors.name}
          error={Boolean(errors.name)}
        />
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
      <Paper>
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
      </Paper>
    </>
  );

  function onUploadSuccess(data) {
    setUploaded(prevUploaded => prevUploaded.concat([pick(data, 'id', 'file_path')]));
  }
}

export default EditAlbum;
