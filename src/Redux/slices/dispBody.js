import { createSlice } from '@reduxjs/toolkit';

export const displayBody = createSlice({
  name: 'displayComp',
  initialState: {
    value: 'first',
  },
  reducers: {
    changeDisplayValue: (state , action) => {
      state.value = action.payload;
    },
  },
});

export const {changeDisplayValue} = displayBody.actions;

export default displayBody.reducer;