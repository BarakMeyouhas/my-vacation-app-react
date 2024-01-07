// search.js
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  searchValue: ''
};

// ==============================|| SLICE - SEARCH ||============================== //

const search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    }
  }
});

export default search.reducer;

export const { setSearchValue } = search.actions;
