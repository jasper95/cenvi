import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-md/lib/DataTables/DataTable';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import TableHead from 'react-md/lib/DataTables/TableHeader';
import cn from 'classnames';
import Row from './Row';
import PreLoader from './PreLoader';

function DataTable(props) {
  const {
    rows, columns, onRowClick, className, isSelectable, selected, onRowToggle,
    onSort, sort, isLoading,
  } = props;

  const BCP = 'iTable';

  return (
    <Table
      plain={!isSelectable}
      className={cn(`${BCP} ${className}`, {
        [`${BCP}-empty`]: rows.length === 0,
        [`${BCP}-loading`]: isLoading,
      })}
      onRowToggle={onRowToggle}
    >
      {
        isLoading ? (
          <PreLoader columns={columns.length} className={`${BCP}_preLoader`} />
        ) : (
          <>
            <TableHead className={`${BCP}_header`}>
              <TableRow className={`${BCP}_row`}>
                {columns.map(({ title, accessor, headProps = {} }, idx) => (
                  <TableColumn
                    key={idx}
                    onClick={() => onSort(accessor)}
                    sorted={sort[accessor]}
                    className={`${BCP}_cell`}
                    {...headProps}
                  >
                    {title}

                  </TableColumn>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className={`${BCP}_body`}>
              {rows.length === 0 && (
                <div>No Records Found</div>
              )}
              {rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRowClick(row);
                  }}
                  selected={selected.includes(row.id)}
                  className={`${BCP}_row`}
                >
                  {columns.map((column, idx) => (
                    <Row
                      key={idx}
                      row={row}
                      index={rowIndex}
                      columnClassName={`${BCP}_cell`}
                      {...column}
                    />
                  ))
                  }
                </TableRow>
              ))}
            </TableBody>
          </>
        )
      }
    </Table>
  );
}

DataTable.propTypes = {
  className: PropTypes.string,
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
  selected: PropTypes.array,
  isSelectable: PropTypes.bool,
  onRowToggle: PropTypes.func,
  onSort: PropTypes.func,
  sort: PropTypes.object,
  isLoading: PropTypes.bool,
};

DataTable.defaultProps = {
  className: '',
  onRowClick: () => {},
  onRowToggle: () => {},
  selected: [],
  isSelectable: false,
  onSort: () => {},
  sort: {},
  isLoading: false,
};

export default DataTable;
