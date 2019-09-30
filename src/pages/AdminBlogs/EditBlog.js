import React, { useState } from 'react';
import useForm from 'lib/hooks/useForm';
import TextField from 'react-md/lib/TextFields/TextField';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import CreatableInput from 'components/CreatableInput';
import { Editor } from 'react-draft-wysiwyg';

function EditBlog() {
  const blog = {};
  const [formState, formHandlers] = useForm({
    initialFields: blog,
  });
  const [editorState, setEditorState] = useState(getEditorInitialState);
  const { onChange } = formHandlers;
  const { fields, errors } = formState;
  return (
    <div className="editBlog">
      <TextField
        id="title"
        label="Title"
        type="title"
        variant="outlined"
        onChange={value => onChange('title', value)}
        errorText={errors.title}
        error={!!errors.title}
        value={fields.title || ''}
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
      <CreatableInput
        value={fields.tags || []}
        onChange={value => onChange('tags', value)}
      />
    </div>
  );

  function getEditorInitialState() {
    return fields.content
      ? EditorState.createWithContent(convertFromRaw(fields.content))
      : EditorState.createEmpty();
  }
}

export default EditBlog;
