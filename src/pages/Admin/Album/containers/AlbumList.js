import React from 'react';
import PageTable from 'shared/components/PageTable';
import history from 'shared/utils/history';
import usePageTable from 'shared/components/PageTable/usePageTable';
import BlogStatus from 'pages/Admin/Blog/components/BlogStatus';
import { formatDate } from 'shared/components/DataTable/CellFormatter';
import { showDialog } from 'shared/redux/app/reducer';
import { useDispatch } from 'react-redux';
import loadable from '@loadable/component';

const CreateAlbum = loadable(() => import('pages/Admin/Album/components/CreateAlbumDialog'));

function AlbumList() {
  const [pageTableState, pageTableHandlers] = usePageTable({ node: 'album', onSuccess });
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
        type: 'actions',
        actions: [
          {
            icon: 'edit',
            label: 'Edit',
            onClick: data => history.push(`/admin/blogs/${data.slug}`),
          },
          {
            icon: 'view',
            label: 'View',
            onClick: () => {},
          },
          {
            icon: 'delete',
            label: 'Delete',
            onClick: () => {},
          },
        ],
      },
    ];
  }

  function onSuccess() {

  }
}

export default AlbumList;
