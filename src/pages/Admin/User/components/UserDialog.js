import React from 'react';
import flowRight from 'lodash/flowRight';
import withDialog from 'shared/hocs/withDialog';
import TextField from 'react-md/lib/TextFields/TextField';

function UserDialog(props) {
  const {
    formState, formHandlers,
  } = props;
  const { fields, errors } = formState;
  const { onElementChange } = formHandlers;
  return (
    <>
      <TextField
        id="first_name"
        label="First Name"
        onChange={onElementChange}
        value={fields.first_name}
        error={Boolean(errors.first_name)}
        errorText={errors.first_name}
      />
      <TextField
        id="last_name"
        label="Last Name"
        type="last_name"
        onChange={onElementChange}
        errorText={errors.last_name}
        error={Boolean(errors.last_name)}
        value={fields.last_name}
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        onChange={onElementChange}
        errorText={errors.email}
        error={Boolean(errors.email)}
        value={fields.email}
      />
    </>
  );
}
export default flowRight(
  withDialog(),
)(UserDialog);
