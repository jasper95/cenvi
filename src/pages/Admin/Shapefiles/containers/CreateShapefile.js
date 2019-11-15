import React, { useEffect, useState } from 'react';
import useQuery from 'shared/hooks/useLazyQuery';
import useForm from 'shared/hooks/useForm';
import { useCreateNode } from 'shared/hooks/useMutation';
import ShapeFilesForm from '../components/ShapefilesForm'

function CreateShapefile(props) {
  const [mutationState, onMutate] = useCreateNode({ node: 'shapefile' });
  const [formState, formHandlers] = useForm({
    initialFields: {},
    customChangeHandler,
  });
  const { fields, errors } = formState;
  const { onSetFields, onElementChange } = formHandlers;
  const { photos = [] } = fields;

  return (<ShapeFilesForm formState={formState} formHandlers={formHandlers} mutationState={mutationState} onMutate={onMutate} />);
}

export default CreateShapefile;