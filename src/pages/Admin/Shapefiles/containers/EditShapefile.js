import React, { useEffect } from 'react';
import useQuery from 'shared/hooks/useLazyQuery';
import useForm from 'shared/hooks/useForm';
import { useUpdateNode } from 'shared/hooks/useMutation';
import ShapeFilesForm from '../components/ShapefilesForm';

function EditShapefile(props) {
  const { id } = props.match.params;
  const [queryState, onQueryShapefiles] = useQuery({ url: `/shapefile/${id}` });
  const [mutationState, onMutate] = useUpdateNode({ node: 'shapefile' });
  const [formState, formHandlers] = useForm({
    initialFields: {},
  });

  const { onSetFields } = formHandlers;

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

  return <ShapeFilesForm formState={formState} formHandlers={formHandlers} mutationState={mutationState} onMutate={onMutate} />;
}

export default EditShapefile;
