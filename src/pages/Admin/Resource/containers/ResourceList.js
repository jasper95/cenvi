import React from 'react';
import PageTable from 'shared/components/PageTable';
import usePageTable from 'shared/components/PageTable/usePageTable';
import loadable from '@loadable/component';
import { showDialog } from 'shared/redux/app/reducer';
import { useDispatch } from 'react-redux';

const ResourceDialog = loadable(() => import('pages/Admin/Resource/components/ResourceDialog'));


function Resource() {
  const [pageTableState, pageTableHandlers] = usePageTable({ node: 'resource', isBaseCreate: false });
  const dispatch = useDispatch();
  return (
    <PageTable
      node="resource"
      columns={getColumns()}
      pageName="Resources"
      pageTableState={pageTableState}
      pageTableHandlers={pageTableHandlers}
      onClickNew={() => handleResourceDialog('Create')}
      onClickEdit={data => handleResourceDialog('Update', data)}
    />
  );

  function handleResourceDialog(type, initialFields = {}) {
    const { onCreate, onUpdate } = pageTableHandlers;
    const onSave = type === 'Create' ? onCreate : onUpdate;
    dispatch(showDialog({
      component: ResourceDialog,
      props: {
        title: `${type} Resource`,
        initialFields,
        onValid: (data) => {
          onSave({
            data,
          });
        },
      },
    }));
  }

  function getColumns() {
    const { onConfirmDelete } = pageTableHandlers;
    return [
      {
        title: 'Name',
        accessor: 'name',
      },
      {
        title: 'Actions',
        type: 'actions',
        actions: [
          {
            icon: 'edit',
            label: 'Edit',
            onClick: row => handleResourceDialog('Update', row),
          },
          {
            icon: 'delete',
            label: 'Delete',
            onClick: row => onConfirmDelete([row.id]),
          },
        ],
      },
    ];
  }
}

export default Resource;
