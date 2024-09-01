import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  Updater,
} from '@tanstack/react-table';
import { useMemo } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface TableProps {
  users: User[];
  sorting: SortingState;
  setSorting: (sorting: SortingState) => void;
  globalFilter: string;
}

const UserTable: React.FC<TableProps> = ({ users, sorting, setSorting, globalFilter }) => {
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'name',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'username',
        cell: info => info.getValue(),
        header: () => <span>Username</span>,
        sortUndefined: 'last',
        sortDescFirst: false,
      },
      {
        accessorKey: 'email',
        header: () => 'Email',
      },
      {
        accessorKey: 'phone',
        header: () => <span>Phone</span>,
        sortUndefined: 'last',
      },
    ],
    []
  );

  const table = useReactTable({
    columns,
    data: users,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: (updater: Updater<SortingState>) => {
      if (typeof updater === 'function') {
        setSorting(updater(sorting));
      } else {
        setSorting(updater);
      }
    },
    state: {
      sorting,
      globalFilter,
    },
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder ? null : (
                  <div
                    className={
                      header.column.getCanSort()
                        ? 'cursor-pointer select-none'
                        : ''
                    }
                    onClick={header.column.getToggleSortingHandler()}
                    title={
                      header.column.getCanSort()
                        ? header.column.getNextSortingOrder() === 'asc'
                          ? 'Sort ascending'
                          : header.column.getNextSortingOrder() === 'desc'
                            ? 'Sort descending'
                            : 'Clear sort'
                        : undefined
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table
          .getRowModel()
          .rows.slice(0, 10)
          .map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default UserTable;
