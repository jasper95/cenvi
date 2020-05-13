import React from 'react';
import flowRight from 'lodash/flowRight';
import withDialog from 'shared/hocs/withDialog';
import TextField from 'react-md/lib/TextFields/TextField';
import SingleFileUpload from 'shared/components/FileUpload/SingleFileUpload';
import uuid from 'uuid';
import { resourceValidator } from '../model/resource';

function Resource(props) {
  const {
    formState, formHandlers,
  } = props;
  const { fields, errors } = formState;
  const { onElementChange } = formHandlers;
  return (
    <>
      <TextField
        id="name"
        label="Name"
        className="iField"
        onChange={onElementChange}
        value={fields.name}
        error={Boolean(errors.name)}
        errorText={errors.name}
      />
      <TextField
        id="description"
        label="Description"
        className="iField"
        onChange={onElementChange}
        errorText={errors.description}
        error={Boolean(errors.description)}
        value={fields.description}
      />
      <SingleFileUpload
        id="file"
        onChange={(file) => {
          onElementChange(['resource', uuid(), file.name].join('/'), 'file_path');
          onElementChange(file.name.split('.').pop(), 'format');
          onElementChange(file, 'file');
        }}
        acceptedFileTypes={['doc', 'docx', 'pdf']}
      />
    </>
  );
}

const ResourceDialog = flowRight(
  withDialog(),
)(Resource);

ResourceDialog.defaultProps = {
  validator: resourceValidator,
};
export default ResourceDialog;
