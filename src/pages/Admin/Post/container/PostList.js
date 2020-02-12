import React, { useMemo } from 'react';
import { formatDate } from 'shared/components/DataTable/CellFormatter';
import BlogStatus from 'pages/Admin/Post/components/BlogStatus';
import PageTable from 'shared/components/PageTable';
import usePageTable from 'shared/components/PageTable/usePageTable';
import history from 'shared/utils/history';
import useRouter from 'shared/hooks/useRouter';
import { getPostType, getPostLabel } from 'shared/utils/tools';


function AdminPostList() {
  const router = useRouter();
  const { post } = router.params;
  const type = useMemo(() => getPostType(post), [post]);
  const [pageTableState, pageTableHandlers] = usePageTable({ node: 'post', queryParams: { type }, isBaseCreate: false });
  return (
    <PageTable
      columns={getColumns()}
      pageName={getPostLabel(post)}
      pageTableState={pageTableState}
      pageTableHandlers={pageTableHandlers}
      onClickNew={() => history.push(`/admin/${post}/new`)}
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
            onClick: data => history.push(`/admin/${post}/${data.slug}`),
          },
          {
            iconClassName: 'wtfr wtf-eye',
            label: 'View',
            onClick: data => window.open(`/${post}/${data.slug}`, '_blank'),
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


export default AdminPostList;
