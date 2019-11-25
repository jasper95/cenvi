import React from 'react';
import useForm from 'shared/hooks/useForm';
import { useCreateNode } from 'shared/hooks/useMutation';
import uuid from 'uuid/v4';
import uploadService from 'shared/utils/uploadService';
import ShapeFilesForm from '../components/ShapefilesForm';

function CreateShapefile(props) {
  const [mutationState, onMutate] = useCreateNode({ node: 'shapefile' });
  const [formState, formHandlers] = useForm({
    initialFields: {
    },
    onValid,
  });
  const { fields, errors } = formState;
  const { onSetFields, onElementChange } = formHandlers;
  const { photos = [] } = fields;

  return (
    <ShapeFilesForm
      formState={formState}
      formHandlers={formHandlers}
      mutationState={mutationState}
      onMutate={onMutate}
    />
  );

  function onValid(data) {
    const fileId = uuid();
    const { file, ...restData } = data;
    const geojsonPath = `uploads/${fileId}/data.geojson.gz`;
    const extension = file.name.split('.').pop();
    uploadService(file, { file_path: geojsonPath, extension }, '/file/upload/shapefile');
    onMutate({
      data: {
        ...restData,
        file_path: geojsonPath,
      },
    });
  }
}

export default CreateShapefile;
