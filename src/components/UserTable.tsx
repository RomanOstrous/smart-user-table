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
} from '@tanstack/react-table';
import { useMemo } from 'react';
import { User } from '../types/user';
import { Filter } from './Filter';
import '../styles/UserTable.scss';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { setColumnFilter } from '../app/filterSlice';

interface TableProps {
  users: User[];
  sorting: SortingState;
  setSorting: (sorting: SortingState) => void;
}

const UserTable: React.FC<TableProps> = ({ users, sorting, setSorting }) => {
  const dispatch = useAppDispatch();
  const columnFilters = useAppSelector((state: RootState) => state.filters.columnFilters);

  const handleColumnFiltersChange = (updaterOrValue: Updater<ColumnFiltersState> | ColumnFiltersState) => {
    if (typeof updaterOrValue === 'function') {
      dispatch(setColumnFilter(updaterOrValue(columnFilters)));
    } else {
      dispatch(setColumnFilter(updaterOrValue));
    }
  };
  
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'name',
        header: () => 'Name',
      },
      {
        accessorKey: 'username',
        header: () => 'User Name'
      },
      {
        accessorKey: 'email',
        header: () => 'Email',
      },
      {
        accessorKey: 'phone',
        header: () => 'Phone',
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
    onColumnFiltersChange: handleColumnFiltersChange,
    onSortingChange: (updater: Updater<SortingState>) => {
      if (typeof updater === 'function') {
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

  return (
    <table className='table'>
        <thead className='table__head'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr className='table__head-tr' key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th className='table__head-th' key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <img 
                              className='table__head-img' 
                              src="/icons/arrow_up.svg" 
                              alt="sort" 
                            />,
                            desc: <img 
                              className='table__head-img' 
                              src="/icons/arrow_down.svg" 
                              alt="sort" 
                            />
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
                )
              })}
            </tr>
          ))}
        </thead>
      <tbody className='table__body'>
        {table
          .getRowModel()
          .rows.slice(0, 10)
          .map(row => (
            <tr className='table__body-tr' key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td className='table__body-td' key={cell.id}>
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
