import React from 'react';
import DataTable from 'components/DataTable';
import { formatDate } from 'components/DataTable/CellFormatter';
import BlogStatus from 'pages/AdminBlogs/components/BlogStatus';

function AdminBlogList(props) {
  const rows = [
    {
      id: '1',
      title: 'This is A test',
      status: 'Published',
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString(),
    },
  ];
  return (
    <div className="container">
      <DataTable columns={getColumns()} rows={rows} />
    </div>
  );

  function getColumns() {
    return [
      {
        title: 'Title',
        accessor: 'title',
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
            onClick: () => {},
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
}


export default AdminBlogList;
