import React from 'react';
import { formatDate } from 'shared/components/DataTable/CellFormatter';
import BlogStatus from 'pages/Admin/Blog/components/BlogStatus';
import PageTable from 'shared/components/PageTable';
import usePageTable from 'shared/components/PageTable/usePageTable';
import history from 'shared/utils/history';

function AdminBlogList() {
  const [pageTableState, pageTableHandlers] = usePageTable({ node: 'blog' });
  return (
    <PageTable
      node="blog"
      columns={getColumns()}
      pageName="Blogs"
      pageTableState={pageTableState}
      pageTableHandlers={pageTableHandlers}
      onClickNew={() => history.push('/admin/blogs/new')}
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
            iconClassName: 'wtfr wtf-eye',
            label: 'View',
            onClick: data => window.open(`/blogs/${data.slug}`, '_blank'),
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
}


export default AdminBlogList;
