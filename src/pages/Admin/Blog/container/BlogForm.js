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
import useQuery from 'shared/hooks/useLazyQuery';
import history from 'shared/utils/history';
import { toFormData } from 'shared/utils/tools';
import omit from 'lodash/omit';
import axios from 'shared/utils/axios';

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
      <div className="row row-ToolbarHeader row-ToolbarHeader-floating">
        <Paper className="col col-md-12-guttered">
          <div className="ToolbarHeader row">
            <div className="ToolbarHeader_title">
              <h1 className="title">
                { fields.name === ''
                  ? 'New Blog'
                  : `Blog: ${fields.name}`
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
                onClick={() => history.push('/admin/blogs')}
              />
            </div>
          </div>
        </Paper>
      </div>
      <div className="row row-formHeader">
        <Paper className="col col-md-12-guttered col-formHeader">
          <TextField
            id="name"
            label="Title"
            type="name"
            className="iField"
            variant="outlined"
            onChange={value => onChange('name', value)}
            errorText={errors.name}
            error={!!errors.name}
            value={fields.name || ''}
          />
        </Paper>
      </div>
      <div className="row row-formMedia">
        <Paper className="col col-md-12-guttered col-actions">
          <div className="iField">
            <p className="iField_label">Blog Photo</p>
            <SingleFileUpload
              id="file"
              value={fields.image_url ? `${process.env.STATIC_URL}/${fields.image_url}` : fields.file}
              onChange={onElementChange}
            />
          </div>
        </Paper>
      </div>
      <div className="row">
        <Paper className="col col-md-8-guttered col-form">
          <Editor
            wrapperClassName="iField-wysiwyg"
            toolbarClassName="iField-wysiwyg_toolbar"
            editorClassName="iField-wysiwyg_editor"
            toolbar={{
              image: {
                urlEnabled: true,
                uploadEnabled: true,
                uploadCallback: uploadFile,
                alt: { present: true, mandatory: false },
                previewImage: true,
              },
            }}
            editorState={editorState}
            onEditorStateChange={(newState) => {
              setEditorState(newState);
              onChange('content', convertToRaw(newState.getCurrentContent()));
            }}
          />
          <TextField
            id="excerpt"
            label="Excerpt"
            type="excerpt"
            className="iField"
            onChange={value => onChange('excerpt', value)}
            errorText={errors.excerpt}
            error={!!errors.excerpt}
            value={fields.excerpt || ''}
            rows={4}
          />
        </Paper>
        <Paper className="col col-md-4-guttered col-actions">
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
            <div className="iField">
              <div className="iField_date_label">
                Published Date
              </div>
              <DatePicker
                id="published_date"
                className="iField_date_picker"
                placeholderText="Published Date"
                onChange={onElementChange}
                value={fields.published_date}
              />
            </div>
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
            onClick={onSave}
            children="Save"
            flat
          />
        </Paper>
      </div>

    </>
  );

  async function uploadFile(file, params = {}) {
    const formData = toFormData({ ...params, file });
    const response = await axios({
      data: formData,
      url: '/file/upload/simple',
      method: 'POST',
    });
    const { file_path: filePath } = response;
    return { data: { link: `${process.env.STATIC_URL}/${filePath}` } };
  }

  async function onSave() {
    if (fields.file) {
      await uploadFile(fields.file, { entity: 'blog', entity_id: fields.id });
    }
    onMutate({
      data: omit(fields, 'file', 'image_url'),
      method: fields.id ? 'PUT' : 'POST',
    });
  }
}

export default EditBlog;
