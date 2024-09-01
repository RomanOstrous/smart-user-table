import { useEffect, useState } from 'react';
import { SortingState } from '@tanstack/react-table';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { fetchUsers } from '../app/userSlice';
import SearchUser from './SearchUser';
import UserTable from './UserTable';


function App() {
  const dispatch = useAppDispatch();
  const { users, status } = useAppSelector((state: RootState) => state.users);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }

    console.log('aaaaa')
  }, [status, dispatch]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  return (
    <div className="p-2">
      <SearchUser globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      <UserTable
        users={users}
        sorting={sorting}
        setSorting={setSorting}
        globalFilter={globalFilter}
      />
    </div>
  );
}

export default App;