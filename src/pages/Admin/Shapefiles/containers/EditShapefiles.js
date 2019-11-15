import React, { useEffect, useState } from 'react';
import useQuery from 'shared/hooks/useLazyQuery';
import useForm from 'shared/hooks/useForm';
import { useUpdateNode } from 'shared/hooks/useMutation';
import ShapeFilesForm from '../components/ShapefilesForm'

// const customChangeHandler = {
//   photos(newPhotos, oldFields) {
//     return {
//       ...oldFields,
//       photos: newPhotos.length === 1 ? oldFields.photos.concat(newPhotos) : newPhotos,
//     };
//   },
// };

function EditShapefiles(props) {
  const { id } = props.match.params;
  const [queryState, onQueryShapefiles] = useQuery({ url: `/shapefile/${id}` });
  const [mutationState, onMutate] = useUpdateNode({ node: 'shapefile' });
  const [formState, formHandlers] = useForm({
    initialFields: {}
  });
  const { fields, errors } = formState;
  const { onSetFields, onElementChange } = formHandlers;
  const { photos = [] } = fields;
  useEffect(() => {
    onQueryShapefiles()
      .then((newFields) => {
        onSetFields(newFields);
      });
  }, []);

  const { loading } = queryState;
  if (loading) {
    return (
      <span>Loading...</span>
    );
  }

  return (<ShapeFilesForm formState={formState} formHandlers={formHandlers} mutationState={mutationState} onMutate={onMutate} />);
}

export default EditShapefiles;
