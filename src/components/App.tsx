import { useEffect, useState } from "react";
import { SortingState } from "@tanstack/react-table";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { fetchUsers } from "../app/userSlice";
import UserTable from "./UserTable";
import "../styles/App.scss";
import { Loader } from "./Loader";

function App() {
  const dispatch = useAppDispatch();
  const { users, status } = useAppSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [sorting, setSorting] = useState<SortingState>([]);

  return (
    <div className="app">
      {status === "loading" ? (
        <Loader />
      ) : (
        <UserTable users={users} sorting={sorting} setSorting={setSorting} />
      )}

      {status === "failed" && <p className="app__error">failed loadig data</p>}
    </div>
  );
}

export default App;
