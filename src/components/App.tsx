import { useEffect, useState } from 'react';
import { SortingState } from '@tanstack/react-table';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { fetchUsers } from '../app/userSlice';
import UserTable from './UserTable';
import '../styles/App.scss';

function App() {
  const dispatch = useAppDispatch();
  const { users, status } = useAppSelector((state: RootState) => state.users);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const [sorting, setSorting] = useState<SortingState>([]);

  return (
    <div className="app">
      <UserTable
        users={users}
        sorting={sorting}
        setSorting={setSorting}
      />
    </div>
  );
}

export default App;