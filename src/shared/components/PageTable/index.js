import React from 'react';
import { Paper } from 'react-md';
import DataTable from 'shared/components/DataTable';
import SearchRenderer from './SearchRenderer';
import ToolbarRenderer from './ToolbarRenderer';

function PageTable(props) {
  const {
    pageTableState, pageTableHandlers, columns, toolbarRenderer: Toolbar,
    searchRenderer: SearchBar, onClickNew, pageName,
  } = props;
  const { selected, sort, rowResponse } = pageTableState;
  const { data: rows, loading: isLoading } = rowResponse;
  const { onRowToggle, onSort, onSearch } = pageTableHandlers;
  return (
    <>
      <Paper className="row-ToolbarHeader row-ToolbarHeader-floating">
        <Toolbar
          pageName={pageName}
          baseClass="ToolbarHeader"
          rows={rows}
          selected={selected}
          onClickNew={onClickNew}
        />
      </Paper>

      <Paper className="row-Table row-Table-floating">
        <div className="row-Table_header">
          <SearchBar onSearch={onSearch} pageName={pageName} />
        </div>
        <DataTable
          selected={selected}
          onRowToggle={onRowToggle}
          rows={rows}
          columns={columns}
          isSelectable
          sort={sort}
          onSort={onSort}
          processing={isLoading}
        />
      </Paper>
    </>
  );
}

PageTable.defaultProps = {
  searchRenderer: SearchRenderer,
  toolbarRenderer: ToolbarRenderer,
};
export default PageTable;
