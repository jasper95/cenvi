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
    const { file } = data;
    const extension = file.name.split('.').pop();
    uploadService(file, { extension }, '/file/upload/shapefile');
  }
}

export default CreateShapefile;
