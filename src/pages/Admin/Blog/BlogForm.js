import React, { useState, useEffect } from 'react';
import useForm from 'shared/hooks/useForm';
import TextField from 'react-md/lib/TextFields/TextField';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import DatePicker from 'components/DatePicker';
import CreatableInput from 'components/CreatableInput';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import cn from 'classnames';
import SelectAutocomplete from 'components/SelectAutocomplete';
import { Editor } from 'react-draft-wysiwyg';
import Button from 'react-md/lib/Buttons/Button';
import useMutation from 'shared/hooks/useMutation';
import useQuery from 'shared/hooks/useQuery';

function EditBlog(props) {
  const [blogResponse, onQueryBlog] = useQuery();
  const { loading: blogIsLoading } = blogResponse;
  const blog = {
    image_url: 'http://babaisannoy.com',
    status: 'published',
  };
  const [formState, formHandlers] = useForm({
    initialFields: blog,
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
    <div className="editBlog">
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
        value={fields.tags || []}
        onChange={value => onChange('tags', value)}
      />
      <Button
        className={cn('iBttn iBttn-primary', { processing: mutationState.loading })}
        onClick={() => {
          onMutate({
            data: fields,
            method: fields.id ? 'PUT' : 'POST',
          });
        }}
        children="Save"
        flat
      />
    </div>
  );
}

export default EditBlog;