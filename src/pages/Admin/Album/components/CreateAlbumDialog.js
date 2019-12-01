import React from 'react';
import flowRight from 'lodash/flowRight';
import withDialog from 'shared/hocs/withDialog';
import TextField from 'react-md/lib/TextFields/TextField';
import * as yup from 'yup';
import { getValidationResult, fieldIsRequired } from 'shared/utils/tools';

function CreateAlbum(props) {
  const {
    formState, formHandlers,
  } = props;
  const { fields, errors } = formState;
  const { onElementChange } = formHandlers;
  return (
    <>
      <TextField
        id="name"
        label="Title"
        onChange={onElementChange}
        value={fields.name}
        error={Boolean(errors.name)}
        errorText={errors.name}
      />
      <TextField
        id="excerpt"
        label="Excerpt"
        type="excerpt"
        onChange={onElementChange}
        errorText={errors.excerpt}
        error={Boolean(errors.excerpt)}
        value={fields.excerpt || ''}
        rows={4}
      />
    </>
  );
}
const CreateAlbumDialog = flowRight(
  withDialog(),
)(CreateAlbum);

CreateAlbumDialog.defaultProps = {
  validator(data) {
    const schema = yup.object().shape({
      name: yup.string().label('Title').required(fieldIsRequired),
      excerpt: yup.string().required(fieldIsRequired),
    });
    return getValidationResult(data, schema);
  },
};

export default CreateAlbumDialog;
