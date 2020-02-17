import React from 'react';
import useQuery from 'shared/hooks/useQuery';
import Paper from 'react-md/lib/Papers/Paper';
import TextField from 'react-md/lib/TextFields/TextField';
import SelectAutocomplete from 'shared/components/SelectAutocomplete';
import Button from 'react-md/lib/Buttons/Button';
import history from 'shared/utils/history';
import cn from 'classnames';
import SingleFileUpload from 'shared/components/FileUpload/SingleFileUpload';
import { isUploadingSelector } from 'shared/utils/uploadService';
import { useSelector } from 'react-redux';
import useForm from 'shared/hooks/useForm';
import { useUpdateNode } from 'shared/hooks/useMutation';
import { toFormData, getValidationResult } from 'shared/utils/tools';
import CreatableInput from 'shared/components/CreatableInput';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';
import Map from 'pages/Map/components/Map';
import 'pages/Map/style.scss';
import 'sass/pages/edit-admin-shapefiles.scss';
import { WithAuthSkeleton } from 'shared/components/Skeletons';
import { updateShapefileSchema } from '../model/shapefile';


function ShapefilesForm(props) {
  const { id } = props.match.params;
  const [formState, formHandlers] = useForm({
    validator,
    onValid: onSave,
  });
  const { onSetFields, onElementChange } = formHandlers;
  const isUploading = useSelector(isUploadingSelector);
  const [categoryResponse] = useQuery({ url: '/category' }, { initialData: [], isBase: true });
  const [shapefileResponse] = useQuery({ url: `/shapefile/${id}` }, { onFetchSuccess: onSetFields, isBase: true });
  const [bboxQuery] = useQuery({ url: `/shapefile/${id}/bbox` }, { initialData: null });
  const { fields, errors } = formState;
  const [mutationState, onMutate] = useUpdateNode({ node: 'shapefile', isBase: false });
  const { data: categories } = categoryResponse;
  const { data: bbox } = bboxQuery;
  if (shapefileResponse.loading || bboxQuery.loading) {
    return (
      <WithAuthSkeleton />
    );
  }

  return (
    <>
      <div className="row row-ToolbarHeader row-ToolbarHeader-floating">
        <Paper className="col col-md-12-guttered">
          <div className="ToolbarHeader row">
            <div className="ToolbarHeader_title">
              <h1 className="title">
                {!fields.name
                  ? 'New Shapefile'
                  : `Shapefile: ${fields.name}`
                }
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
                onClick={() => history.push('/admin/shapefiles')}
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
            <div className="col col-md-5">
              <CreatableInput
                id="tags"
                label="Tags"
                value={fields.tags || []}
                onChange={onElementChange}
                className="iField iField-ci"
                classNamePrefix="iField-ci"
                error={errors.tags}
              />
            </div>
            <div className="col col-md-4">
              <SelectAutocomplete
                id="category_id"
                options={categories.map(e => ({ label: e.name, value: e.id }))}
                label="Category"
                required
                value={fields.category_id}
                onChange={onElementChange}
              />
            </div>
            <div className="col col-md-3">
              <div className="iField iField-cb">
                <p className="iField_label">
                  Download in Public
                </p>
                <Checkbox
                  id="is_public"
                  name=""
                  label="Allow Downloads"
                  checked={fields.is_public}
                  onChange={onElementChange}
                />
              </div>
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
        <Paper className="col col-md-8-guttered col-preview">
          <div className="iField col">
            <p className="iField_label">Preview</p>
            <div className="col-map">
              <Map activeLayers={[id]} bbox={bbox} />
            </div>
          </div>
        </Paper>


        <Paper className="col col-md-4-guttered col-options">
          <div className="iField col">
            <p className="iField_label">Shapefile</p>
            <SingleFileUpload
              id="file"
              onChange={onElementChange}
              acceptedFileTypes={['zip', 'shp', 'rar', 'kml', 'kmz']}
            />
          </div>

          <div className="iField col">
            <p className="iField_label">Style</p>
            <SingleFileUpload
              id="sld"
              onChange={onElementChange}
              acceptedFileTypes={['zip', 'rar', 'sld']}
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

function validator(data) {
  return getValidationResult(data, updateShapefileSchema);
}

export default ShapefilesForm;
