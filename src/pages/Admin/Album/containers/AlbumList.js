import React from 'react';
import PageTable from 'shared/components/PageTable';
import history from 'shared/utils/history';
import usePageTable from 'shared/components/PageTable/usePageTable';
import BlogStatus from 'pages/Admin/Post/components/BlogStatus';
import { formatDate } from 'shared/components/DataTable/CellFormatter';
import { showDialog } from 'shared/redux/app/reducer';
import { useDispatch } from 'react-redux';
import loadable from '@loadable/component';

const CreateAlbum = loadable(() => import('pages/Admin/Album/components/CreateAlbumDialog'));

function AlbumList() {
  const [pageTableState, pageTableHandlers] = usePageTable({ node: 'album', onSuccess, isPaginated: true });
  const dispatch = useDispatch();
  return (
    <PageTable
      node="album"
      columns={getColumns()}
      pageName="Albums"
      pageTableState={pageTableState}
      pageTableHandlers={pageTableHandlers}
      onClickNew={() => dispatch(showDialog({
        component: CreateAlbum,
        props: {
          title: 'Create Album',
          onValid,
          initialFields: {
            status: 'Active',
            published_date: new Date().toISOString(),
          },
        },
      }))}
    />
  );

  function getColumns() {
    return [
      {
        title: 'Title',
        accessor: 'name',
      },
      {
        type: 'function',
        fn: formatDate('updated_date', 'MMMM DD, YYYY'),
        title: 'Last Updated',
      },
      {
        title: 'Status',
        type: 'component',
        component: BlogStatus,
        bodyProps: {
          className: '',
        },
      },
      {
        title: 'Actions',
        type: 'actions',
        actions: [
          {
            icon: 'edit',
            label: 'Edit',
            onClick: data => history.push(`/admin/albums/${data.slug}`),
          },
          {
            iconClassName: 'wtfr wtf-eye',
            label: 'View',
            onClick: data => window.open(`/albums/${data.slug}`, '_blank'),
          },
          {
            icon: 'delete',
            label: 'Delete',
            onClick: row => pageTableHandlers.onConfirmDelete([row.id]),
          },
        ],
      },
    ];
  }

  function onValid(data) {
    pageTableHandlers.onCreate({ data });
  }

  function onSuccess(data) {
    history.push(`/admin/albums/${data.id}`);
  }
}

export default AlbumList;
