import React from 'react';
import PageTable from 'shared/components/PageTable';
import usePageTable from 'shared/components/PageTable/usePageTable';
import loadable from '@loadable/component';
import { showDialog } from 'shared/redux/app/reducer';
import { useDispatch } from 'react-redux';
import omit from 'lodash/omit';
import uploadService from 'shared/utils/uploadService';
import pick from 'lodash/pick';
import history from 'shared/utils/history';

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
    />
  );

  function handleResourceDialog() {
    dispatch(showDialog({
      component: ResourceDialog,
      props: {
        title: 'Add Resource File',
        onValid,
      },
    }));
  }

  async function onValid(data) {
    const { onCreate } = pageTableHandlers;
    await uploadService(data.file, pick(data, 'file_path'));
    const response = await onCreate({
      data: omit(data, 'file'),
    });
    history.push(`/admin/resources/${response.id}`);
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
            onClick: row => history.push(`/admin/resources/${row.id}`),

          },
          {
            iconClassName: 'wtfr wtf-eye',
            label: 'Preview',
            onClick: openPreview,
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

  function openPreview(row) {
    const url = [process.env.STATIC_URL, row.file_path].join('/');
    const win = window.open(`https://docs.google.com/gview?url=${url}`, '_blank');
    win.focus();
  }
}

export default Resource;
