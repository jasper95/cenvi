import React, { useState, useEffect } from 'react';
import useQuery from 'shared/hooks/useLazyQuery';
import Paper from 'react-md/lib/Papers/Paper';
import TextField from 'react-md/lib/TextFields/TextField';
import SelectAutocomplete from 'shared/components/SelectAutocomplete';
import Button from 'react-md/lib/Buttons/Button';
import history from 'shared/utils/history';
import cn from 'classnames';
import SingleFileUpload from 'shared/components/FileUpload/SingleFileUpload';
import uploadService from 'shared/utils/uploadService';
import { useSelector } from 'react-redux';

function ShapefilesForm(props) {
  const isSingleUploading = useSelector(state => state.app.isSingleUploading);
  const [, onQueryCategories] = useQuery({ url: '/category' }, { isBase: true, initialData: [] });
  const [categories, setCategories] = useState([]);
  const {
    mutationState, onMutate, formState, formHandlers,
  } = props;
  const { fields, errors } = formState;
  const { onElementChange } = formHandlers;

  useEffect(() => {
    onQueryCategories()
      .then((categories) => {
        setCategories(categories.map(category => ({
          value: category.id,
          label: category.name,
        })));
      });
  }, []);

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
                className={cn('iBttn iBttn-primary', { processing: mutationState.loading })}
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
                options={categories}
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
          <div className="iField">
            <p className="iField_label">Shapefile</p>
            <SingleFileUpload
              id="file"
              // value={fields.image_url ? `${process.env.STATIC_URL}/${fields.image_url}` : fields.file}
              onChange={validateShapefile}
            />
          </div>
        </Paper>
      </div>
    </>
  );

  function validateShapefile(file) {
    onElementChange(file, 'file');
  }
}

export default ShapefilesForm;
