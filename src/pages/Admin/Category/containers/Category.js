import React from 'react';
import PageTable from 'shared/components/PageTable';
import history from 'shared/utils/history';
import usePageTable from 'shared/components/PageTable/usePageTable';
import BlogStatus from 'pages/Admin/Blog/components/BlogStatus';
import { formatDate } from 'shared/components/DataTable/CellFormatter';
import { showDialog } from 'shared/redux/app/reducer';
import { useDispatch } from 'react-redux';
import loadable from '@loadable/component';

const CreateCategoryDialog = loadable(() => import('pages/Admin/Category/components/CreateCategoryDialog'));

function Category() {
  const [pageTableState, pageTableHandlers] = usePageTable({ node: 'category', onSuccess });
  const dispatch = useDispatch();
  return (
    <PageTable
      node="category"
      columns={getColumns()}
      pageName="Categories"
      pageTableState={pageTableState}
      pageTableHandlers={pageTableHandlers}
      onClickNew={() => dispatch(showDialog({
        component: CreateCategoryDialog,
        props: {
          title: 'Create Category',
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
            onClick: data => history.push(`/admin/category/${data.slug}`),
          },
          {
            iconClassName: 'wtfr wtf-eye',
            label: 'View',
            onClick: data => window.open(`/category/${data.slug}`, '_blank'),
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

export default Category;
