import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice";
import usersReducer from "./userSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
