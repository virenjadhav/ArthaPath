import { createSlice } from "@reduxjs/toolkit";
import { get_budgets } from "./budgetApiThunk";

const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    data: null,
    columns: null,
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    setColumns(state, action) {
      state.columns = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_budgets.pending, (state) => {
        // state.loading = true;
        // state.error = null;
      })
      .addCase(get_budgets.fulfilled, (state, action) => {
        // state.loading = false;
        state.data = action.payload?.budgets; // Assuming the API returns the data in action.payload
      })
      .addCase(get_budgets.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setData, setColumns } = budgetSlice.actions;
export default budgetSlice.reducer;
