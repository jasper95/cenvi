import React from 'react';
import flowRight from 'lodash/flowRight';
import withDialog from 'shared/hocs/withDialog';
import TextField from 'react-md/lib/TextFields/TextField';
import * as yup from 'yup';
import { getValidationResult, fieldIsRequired } from 'shared/utils/tools';
import SingleFileUpload from 'shared/components/FileUpload/SingleFileUpload';

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
        onChange={onElementChange}
        value={fields.name}
        error={Boolean(errors.name)}
        errorText={errors.name}
      />
      <TextField
        id="description"
        label="Description"
        onChange={onElementChange}
        errorText={errors.description}
        error={Boolean(errors.description)}
        value={fields.description}
      />
      <SingleFileUpload
        id="file"
        onChange={onElementChange}
        acceptedFileTypes={['doc', 'docx', 'pdf']}
      />
    </>
  );
}

const ResourceDialog = flowRight(
  withDialog(),
)(Resource);

ResourceDialog.defaultProps = {
  validator(data) {
    const schema = yup.object().shape({
      name: yup.string().required(fieldIsRequired),
      description: yup.string().required(fieldIsRequired),
    });
    return getValidationResult(data, schema);
  },
};

export default ResourceDialog;
