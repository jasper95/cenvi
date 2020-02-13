import React from 'react';
import flowRight from 'lodash/flowRight';
import withDialog from 'shared/hocs/withDialog';
import TextField from 'react-md/lib/TextFields/TextField';
import { getValidationResult } from 'shared/utils/tools';
import SingleFileUpload from 'shared/components/FileUpload/SingleFileUpload';
import CreatableInput from 'shared/components/CreatableInput';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';
import SelectAutocomplete from 'shared/components/SelectAutocomplete';
import useQuery from 'shared/hooks/useQuery';
import { createShapefileSchema } from '../model/shapefile';

function Shapefile(props) {
  const {
    formState, formHandlers,
  } = props;
  const { fields, errors } = formState;
  const { onElementChange } = formHandlers;
  const [categoryResponse] = useQuery({ url: '/category' }, { initialData: [], isBase: true });
  const { data: categories } = categoryResponse;
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
      <CreatableInput
        id="tags"
        label="Tags"
        value={fields.tags || []}
        onChange={onElementChange}
        className="iField iField-ci"
        classNamePrefix="iField-ci"
        error={errors.tags}
      />
      <SelectAutocomplete
        id="category_id"
        options={categories.map(e => ({ label: e.name, value: e.id }))}
        label="Category"
        required
        value={fields.category_id}
        onChange={onElementChange}
      />
      <Checkbox
        id="is_public"
        name=""
        label="Download in public allowed"
        checked={fields.is_public}
        onChange={onElementChange}
      />
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
      <div className="row">
        <div className="iField col col-md-6">
          <p className="iField_label">Shapefile</p>
          <SingleFileUpload
            id="file"
            onChange={onElementChange}
            acceptedFileTypes={['zip', 'shp', 'rar', 'kml', 'kmz']}
          />
        </div>
        <div className="iField col col-md-6">
          <p className="iField_label">Style</p>
          <SingleFileUpload
            id="sld"
            onChange={onElementChange}
            acceptedFileTypes={['zip', 'rar', 'sld']}
          />
        </div>
      </div>
    </>
  );
}

const ShapefileDialog = flowRight(
  withDialog(),
)(Shapefile);

ShapefileDialog.defaultProps = {
  validator(data) {
    return getValidationResult(data, createShapefileSchema);
  },
};

export default ShapefileDialog;
