import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  Updater,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { User } from "../types/user";
import { Filter } from "./Filter";
import "../styles/UserTable.scss";

interface TableProps {
  users: User[];
  sorting: SortingState;
  setSorting: (sorting: SortingState) => void;
}

const UserTable: React.FC<TableProps> = ({ users, sorting, setSorting }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "name",
        header: () => "Name",
      },
      {
        accessorKey: "username",
        header: () => "User Name",
      },
      {
        accessorKey: "email",
        header: () => "Email",
      },
      {
        accessorKey: "phone",
        header: () => "Phone",
      },
    ],
    [],
  );

  const table = useReactTable({
    columns,
    data: users,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: (updater: Updater<SortingState>) => {
      if (typeof updater === "function") {
        setSorting(updater(sorting));
      } else {
        setSorting(updater);
      }
    },
    state: {
      sorting,
      columnFilters,
    },
  });

  const rows = table.getRowModel().rows.slice(0, 10);

  return (
    <table className="table">
      <thead className="table__head">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr className="table__head-tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th
                  className="table__head-th"
                  key={header.id}
                  colSpan={header.colSpan}
                >
                  {header.isPlaceholder ? null : (
                    <>
                      <div
                        {...{
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: (
                            <svg
                              className="table__head-img"
                              xmlns="http://www.w3.org/2000/svg"
                              height="14px"
                              viewBox="0 -960 960 960"
                              width="14px"
                              fill="#e8eaed"
                            >
                              <path d="m296-224-56-56 240-240 240 240-56 56-184-183-184 183Zm0-240-56-56 240-240 240 240-56 56-184-183-184 183Z" />
                            </svg>
                          ),
                          desc: (
                            <svg
                              className="table__head-img"
                              xmlns="http://www.w3.org/2000/svg"
                              height="14px"
                              viewBox="0 -960 960 960"
                              width="14px"
                              fill="#e8eaed"
                            >
                              <path d="M480-200 240-440l56-56 184 183 184-183 56 56-240 240Zm0-240L240-680l56-56 184 183 184-183 56 56-240 240Z" />
                            </svg>
                          ),
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                      {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} />
                        </div>
                      ) : null}
                    </>
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody className="table__body">
        {rows.length > 0 ? (
          rows.map((row) => (
            <tr className="table__body-tr" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className="table__body-td" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr className="table__body-tr">
            <td className="table__body-td--notf" colSpan={columns.length}>
              No result found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
