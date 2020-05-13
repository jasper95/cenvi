import React from 'react';
import PageTable from 'shared/components/PageTable';
import history from 'shared/utils/history';
import usePageTable from 'shared/components/PageTable/usePageTable';
import loadable from '@loadable/component';
import { formatDate } from 'shared/components/DataTable/CellFormatter';
import { exportShapefile, toFormData } from 'shared/utils/tools';
import { useDispatch } from 'react-redux';
import { showDialog } from 'shared/redux/app/reducer';

const ShapefileDialog = loadable(() => import('pages/Admin/Shapefiles/components/ShapefileDialog'));

function Shapefiles() {
  const [pageTableState, pageTableHandlers] = usePageTable({
    node: 'shapefile', onSuccess, isPaginated: true, isBaseCreate: false,
  });
  const dispatch = useDispatch();
  return (
    <PageTable
      node="shapefiles"
      columns={getColumns()}
      pageName="Shapefiles"
      pageTableState={pageTableState}
      pageTableHandlers={pageTableHandlers}
      onClickNew={showShapefileDialog}
    />
  );

  function showShapefileDialog() {
    dispatch(showDialog({
      component: ShapefileDialog,
      props: {
        title: 'Create Shapefile',
        onValid,
      },
    }));
  }

  function onValid(data) {
    const { onCreate } = pageTableHandlers;
    const { file, sld } = data;
    const extension = file && file.name.split('.').pop();
    const sldExtension = sld && sld.name.split('.').pop();
    onCreate({
      data: toFormData({ ...data, extension, sld_extension: sldExtension }),
      onSuccess(response) {
        history.push(`/admin/shapefiles/${response.id}`);
      },
    });
  }

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
            onClick: data => history.push(`/admin/shapefiles/${data.id}`),
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
