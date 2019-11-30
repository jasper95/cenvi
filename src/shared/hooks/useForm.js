import { useState } from 'react';
import omit from 'lodash/omit';

export default function useForm(params) {
  const {
    initialFields = {},
    validator = () => ({ isValid: true }),
    customChangeHandler = {},
    onValid = () => {},
  } = params;
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState({});
  return [
    {
      fields,
      errors,
    },
    {
      onElementChange,
      onChange,
      onValidate,
      onReset,
      onSetFields: setFields,
    },
  ];

  function onElementChange(value, e) {
    const id = e.target ? e.target.id : e;
    onChange(id, value);
  }
  function onChange(key, value) {
    const customHandler = customChangeHandler[key];

    if (customHandler) {
      setFields((oldFields) => {
        const changes = customHandler(value, oldFields);
        if (changes) {
          return { ...oldFields, ...changes };
        }
        return oldFields;
      });
      setErrors(omit(errors, key));
      return;
    }
    setErrors(omit(errors, key));
    setFields(oldFields => ({ ...oldFields, [key]: value }));
  }

  function onValidate() {
    const { isValid, errors: validationErrors } = validator(fields);
    if (isValid) {
      setErrors({});
      onValid(fields);
      return;
    }
    setErrors(validationErrors);
  }
  function onReset() {
    setErrors({});
    setFields(initialFields);
  }
}
