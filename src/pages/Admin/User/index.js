import React from 'react';
import PageTable from 'components/PageTable';
import usePageTable from 'components/PageTable/usePageTable';
import { useDispatch } from 'react-redux';

function User() {
  const [pageTableState, pageTableHandlers] = usePageTable({ node: 'user' });
  const dispatch = useDispatch();
  return (
    <PageTable
      node="user"
      columns={getColumns()}
      pageName="Users"
      pageTableState={pageTableState}
      pageTableHandlers={pageTableHandlers}
      onClickNew={() => showDialog('Create')}
      onClickEdit={data => showDialog('Update', data)}
    />
  );

  function showDialog(type, initialFields = {}) {
    const { onCreate, onUpdate } = pageTableHandlers;
    const onSave = type === 'Create' ? onCreate : onUpdate;
    dispatch({
      type: 'SHOW_DIALOG',
      payload: {
        path: 'User',
        props: {
          title: `${type} User`,
          initialFields,
          onValid: (data) => {
            onSave({
              data,
            });
          },
          dialogClassName: 'i_dialog_container--l',
        },
      },
    });
  }

  function getColumns() {
    const { onConfirmDelete } = pageTableHandlers;
    return [
      {
        title: 'Email',
        accessor: 'email',
      },
      {
        title: 'Full Name',
        accessor: 'full_name',
      },
      {
        type: 'actions',
        actions: [
          {
            icon: 'edit',
            label: 'Edit',
            onClick: row => showDialog('Edit', row),
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

export default User;
