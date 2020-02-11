import React from 'react';
import PageTable from 'shared/components/PageTable';
import history from 'shared/utils/history';
import usePageTable from 'shared/components/PageTable/usePageTable';
import { formatDate } from 'shared/components/DataTable/CellFormatter';
import qs from 'qs';
import { useDispatch } from 'react-redux';
import { exportShapefile } from 'shared/utils/tools';


function Shapefiles() {
  const [pageTableState, pageTableHandlers] = usePageTable({ node: 'shapefile', onSuccess });
  const dispatch = useDispatch();
  return (
    <PageTable
      node="shapefiles"
      columns={getColumns()}
      pageName="Shapefiles"
      pageTableState={pageTableState}
      pageTableHandlers={pageTableHandlers}
      onClickNew={() => history.push('/admin/shapefiles/new')}
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
        title: 'Actions',
        type: 'actions',
        actions: [
          {
            icon: 'edit',
            label: 'Edit',
            onClick: data => history.push(`/admin/shapefiles/${data.slug}`),
          },
          {
            icon: 'import_export',
            label: 'Export',
            onClick: exportShapefile,
          },
          {
            iconClassName: 'wtfr wtf-eye',
            label: 'View',
            onClick: data => window.open(`/shapefiles/${data.slug}`, '_blank'),
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

  function onSuccess(data) {
    history.push(`/admin/albums/${data.id}`);
  }
}

export default Shapefiles;
