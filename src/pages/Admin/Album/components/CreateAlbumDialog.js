import React from 'react';
import flowRight from 'lodash/flowRight';
import withDialog from 'shared/hocs/withDialog';
import TextField from 'react-md/lib/TextFields/TextField';

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
    </>
  );
}
export default flowRight(
  withDialog(),
)(CreateAlbum);
