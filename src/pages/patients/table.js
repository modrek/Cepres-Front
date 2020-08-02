/* eslint-disable react-hooks/exhaustive-deps */

import { usePagination, useSortBy, useTable } from "react-table";
import React, { useEffect } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";

const MTable = ({ columns = [], data = [], onSort }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,

    prepareRow,
    state: { sortBy: sortName },
  } = useTable(
    {
      columns,
      data,
      manualSortBy: true,
    },
    useSortBy
  );
  const tableInstance = useTable({ columns, data }, usePagination);

  const {
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  useEffect(() => {
    onSort(sortName);
  }, [sortName]);

  const noData = <h2>There is no data to display</h2>;  

  return (
    <div>
      <Table {...getTableProps()} responsive hover>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              <th>Action</th>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <>{data.length == 0 ? noData : null}</>

        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                <td>
                  <Link
                    to={{
                      pathname: "./Patients/EditForm",
                      state: {
                        initialValues: row.original,
                      },
                    }}
                    className="btn btn-warning"
                  >
                    {"Edit"}
                  </Link>

                  <Link
                    to={{
                      pathname: "./Patients/PatientReport",
                      state: {
                        initialValues: row.original,
                      },
                    }}
                    className="btn btn-primary"
                  >
                    {"Patient Report"}
                  </Link>
                </td>

                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="pagination d-flex justify-content-between">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MTable;
