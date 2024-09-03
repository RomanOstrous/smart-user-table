import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColumnFiltersState } from '@tanstack/react-table';

interface FilterState {
  columnFilters: ColumnFiltersState;
}

const initialState: FilterState = {
  columnFilters: [],
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setColumnFilter: (state, action: PayloadAction<ColumnFiltersState>) => {
      state.columnFilters = action.payload;
    },
  },
});

export const { setColumnFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
