import * as yup from 'yup';
import { fieldIsRequired, getValidationResult } from 'shared/utils/tools';

export const resourceSchema = yup.object().shape({
  name: yup.string().required(fieldIsRequired),
  description: yup.string().required(fieldIsRequired),
  file_path: yup.string().label('File').required(fieldIsRequired),
});

export function resourceValidator(data) {
  return getValidationResult(data, resourceSchema);
}
