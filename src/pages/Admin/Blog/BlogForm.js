import React, { useState, useEffect } from 'react';
import useForm from 'shared/hooks/useForm';
import TextField from 'react-md/lib/TextFields/TextField';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import DatePicker from 'shared/components/DatePicker';
import CreatableInput from 'shared/components/CreatableInput';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import cn from 'classnames';
import SelectAutocomplete from 'shared/components/SelectAutocomplete';
import { Editor } from 'react-draft-wysiwyg';
import Paper from 'react-md/lib/Papers/Paper';
import SingleFileUpload from 'shared/components/FileUpload/SingleFileUpload';
import Button from 'react-md/lib/Buttons/Button';
import useMutation from 'shared/hooks/useMutation';
import useQuery from 'shared/hooks/useQuery';
import toFormData from 'object-to-formdata';

function EditBlog(props) {
  const [blogResponse, onQueryBlog] = useQuery();
  const { loading: blogIsLoading } = blogResponse;
  const [formState, formHandlers] = useForm({
    initialFields: {},
  });
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { onSetFields, onElementChange } = formHandlers;
  useEffect(() => {
    const { id } = props.match.params;
    if (id !== 'new') {
      onQueryBlog({ url: `/blog/${id}` })
        .then((newFields) => {
          setEditorState(EditorState.createWithContent(convertFromRaw(newFields.content)));
          onSetFields(newFields);
        });
    }
  }, []);
  const { fields, errors } = formState;
  const { onChange } = formHandlers;
  const [mutationState, onMutate] = useMutation({ url: '/blog' });
  if (blogIsLoading) {
    return (
      <span>Loading...</span>
    );
  }
  return (
    <>
      <Paper className="col col-md-12 col-formHeader">
        <TextField
          id="name"
          label="Title"
          type="name"
          variant="outlined"
          onChange={value => onChange('name', value)}
          errorText={errors.name}
          error={!!errors.name}
          value={fields.name || ''}
        />
      </Paper>
      <div className="row">
        <Paper className="col col-md-8 col-form">
          <Editor
            toolbar={{
              image: {
                uploadCallback: () => {},
                alt: { present: true, mandatory: true },
              },
            }}
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={(newState) => {
              setEditorState(newState);
              onChange('content', convertToRaw(newState.getCurrentContent()));
            }}
          />
          <TextField
            id="excerpt"
            label="Excerpt"
            type="excerpt"
            onChange={value => onChange('excerpt', value)}
            errorText={errors.excerpt}
            error={!!errors.excerpt}
            value={fields.excerpt || ''}
            rows={4}
          />
        </Paper>
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
                data: toFormData(fields),
                method: 'POST',
              });
            }}
            children="Save"
            flat
          />
        </Paper>
        <Paper className="col col-md-12 col-actions">
          <SingleFileUpload
            id="file"
            value={fields.image_url ? `${process.env.STATIC_URL}/${fields.image_url}` : fields.file}
            onChange={onElementChange}
          />
        </Paper>
      </div>
    </>
  );
}

export default EditBlog;
