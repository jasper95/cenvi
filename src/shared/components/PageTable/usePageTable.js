import {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import useTableSelect from 'shared/hooks/useTableSelect';
import useTableSort from 'shared/hooks/useTableSort';
import useQuery from 'shared/hooks/useQuery';
import debounce from 'lodash/debounce';
import { useDispatch } from 'react-redux';
import useMutation, { useCreateNode, useUpdateNode } from 'shared/hooks/useMutation';
import loadable from '@loadable/component';
import { showDialog } from 'shared/redux/app/reducer';

const Confirm = loadable(() => import('shared/components/Dialogs/Confirm'));

function usePage(props) {
  const { node } = props;
  const sortProps = { initialSorted: 'email', sortable: ['email', 'full_name'] };
  const [rowResponse, queryHandlers] = useQuery({ url: `/${node}` }, { initialData: [], initialLoading: true });
  const [search, setSearch] = useState('');
  const [sort, onSort] = useTableSort(sortProps);
  const { data: rows } = rowResponse;
  const [selected, { onRowToggle, setSelected }] = useTableSelect(rows);

  const [, onCreate] = useCreateNode({ node, onSuccess: queryHandlers.refetch });
  const [, onUpdate] = useUpdateNode({ node, onSuccess: queryHandlers.refetch });
  const [, onDelete] = useMutation({
    url: `/${node}/bulk`,
    method: 'DELETE',
    onSuccess: () => {
      setSelected([]);
      queryHandlers.refetch();
    },
  });
  const dispatch = useDispatch();
  const debounceSearch = useCallback(debounce(onSearch, 1000), []);
  const states = useMemo(() => ({
    rowResponse,
    selected,
    sort,
    search,
  }), [
    rowResponse,
    selected,
    sort,
    search,
  ]);
  const handlers = useMemo(() => ({
    onCreate,
    onDelete,
    onUpdate,
    onSort,
    onSearch: debounceSearch,
    onRowToggle,
    onConfirmDelete: confirmDelete,
  }), [
    onCreate,
    onDelete,
    onUpdate,
    onSort,
    debounceSearch,
    onRowToggle,
    confirmDelete,
  ]);
  return [states, handlers];

  function confirmDelete() {
    dispatch(showDialog({
      component: Confirm,
      props: {
        title: 'Confirm Delete',
        message: 'Do you want to delete selected record(s)?',
        onValid: () => onDelete({ data: { ids: selected }, message: 'Record(s) successfully deleted' }),
      },
    }));
  }

  function onSearch(value) {
    setSearch(value);
  }
}
export default usePage;
