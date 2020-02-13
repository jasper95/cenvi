import * as yup from 'yup';
import { fieldIsRequired } from 'shared/utils/tools';

const baseSchema = {
  name: yup.string().required(fieldIsRequired),
  tags: yup.array().of(yup.string()),
  category_id: yup.string().label('Category').required(fieldIsRequired),
};
export const createShapefileSchema = yup.object().shape({
  ...baseSchema,
  shapefile: yup.string().required(fieldIsRequired),
});

export const updateShapefileSchema = yup.object().shape(baseSchema);
