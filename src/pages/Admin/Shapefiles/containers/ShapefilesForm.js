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
import uuid from 'uuid/v4';
import useForm from 'shared/hooks/useForm';
import useMutation from 'shared/hooks/useMutation';
import { toFormData } from 'shared/utils/tools';


function ShapefilesForm(props) {
  const { id } = props.match.params;
  const isCreate = id === 'new';
  const [formState, formHandlers] = useForm({
    initialFields: {
      id: uuid(),
    },
    // validator,
    onValid: onSave,
  });
  const { onSetFields, onElementChange } = formHandlers;
  const isUploading = useSelector(isUploadingSelector);
  const [categoryResponse] = useQuery({ url: '/category' }, { initialData: [] });
  const [shapefileResponse] = useQuery({ url: `/shapefile/${id}` }, { skip: isCreate, onFetchSuccess: onSetFields });
  const { fields, errors } = formState;
  const [mutationState, onMutate] = useMutation({ url: '/shapefile' });
  const { data: categories } = categoryResponse;
  if (shapefileResponse.isLoading) {
    return (
      <span>Loading...</span>
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
            <div className="col col-md-8">
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
        <Paper className="col col-md-12-guttered col-actions">
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
      method: isCreate ? 'POST' : 'PUT',
      message: `Shapefile successfuly ${isCreate ? 'created' : 'updated'}`,
      onSuccess() {
        if (isCreate) {
          history.push('/admin/shapefiles');
        }
      },
    });
  }
}

export default ShapefilesForm;
