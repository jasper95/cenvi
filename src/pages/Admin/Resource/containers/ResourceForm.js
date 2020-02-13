import React from 'react';
import useQuery from 'shared/hooks/useQuery';
import Paper from 'react-md/lib/Papers/Paper';
import TextField from 'react-md/lib/TextFields/TextField';
import Button from 'react-md/lib/Buttons/Button';
import history from 'shared/utils/history';
import cn from 'classnames';
import SingleFileUpload from 'shared/components/FileUpload/SingleFileUpload';
import { isUploadingSelector } from 'shared/utils/uploadService';
import { useSelector } from 'react-redux';
import uuid from 'uuid/v4';
import useForm from 'shared/hooks/useForm';
import { useUpdateNode } from 'shared/hooks/useMutation';
import { toFormData } from 'shared/utils/tools';
import { resourceValidator } from '../model/resource';


function ShapefilesForm(props) {
  const { id } = props.match.params;
  const [formState, formHandlers] = useForm({
    initialFields: {
      id: uuid(),
    },
    validator: resourceValidator,
    onValid: onSave,
  });
  const { onSetFields, onElementChange } = formHandlers;
  const isUploading = useSelector(isUploadingSelector);
  const [queryResponse] = useQuery({ url: `/resource/${id}` }, { onFetchSuccess: onSetFields, isBase: true });
  const { fields, errors } = formState;
  const [mutationState, onMutate] = useUpdateNode({ node: 'resource' });
  if (queryResponse.loading) {
    return (
      <span>Loading...</span>
    );
  }

  const url = [process.env.STATIC_URL, fields.file_path].join('/');
  return (
    <>
      <div className="row row-ToolbarHeader row-ToolbarHeader-floating">
        <Paper className="col col-md-12-guttered">
          <div className="ToolbarHeader row">
            <div className="ToolbarHeader_title">
              <h1 className="title">
                {`Resource: ${fields.name}`}
              </h1>
            </div>
            <div className="ToolbarHeader_toolbar">
              <Button
                className={cn('iBttn iBttn-primary', { processing: mutationState.loading || isUploading })}
                onClick={formHandlers.onValidate}
                children="Save"
                flat
              />
              <Button
                flat
                className="iBttn iBttn-second-prio"
                children="Cancel"
                onClick={() => history.push('/admin/resources')}
              />
            </div>
          </div>
        </Paper>
      </div>

      <div className="row row-formHeader">
        <Paper className="col col-md-12-guttered">
          <div className="row">
            <div className="col col-md-12">
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
        <Paper className="col col-md-12-guttered col-actions">
          <div className="iField col col-md-7">
            <p className="iField_label">Preview</p>
            <div className="iframeViewer">
              <iframe
                src={`https://docs.google.com/gview?url=${url}&embedded=true`}
                title="Preview"
              />
            </div>
          </div>
          <div className="iField col col-md-5">
            <p className="iField_label">File</p>
            <SingleFileUpload
              id="file"
              onChange={onElementChange}
              acceptedFileTypes={['doc', 'docx', 'pdf']}
            />
          </div>
        </Paper>
      </div>
    </>
  );

  async function onSave(data) {
    const { file, sld } = data;
    const extension = file && file.name.split('.').pop();
    const sldExtension = sld && sld.name.split('.').pop();
    onMutate({
      data: toFormData({ ...data, extension, sld_extension: sldExtension }),
    });
  }
}

export default ShapefilesForm;
