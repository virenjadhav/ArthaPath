// import { createSlice } from "@reduxjs/toolkit";
// import { get_transactions } from "./transactionApiThunk";

// const transactionSlice = createSlice({
//   name: "transaction",
//   initialState: {
//     data: null,
//     columns: null,
//   },
//   reducers: {
//     setData(state, action) {
//       state.data = action.payload;
//     },
//     setColumns(state, action) {
//       state.columns = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(get_transactions.pending, (state) => {
//         // state.loading = true;
//         // state.error = null;
//       })
//       .addCase(get_transactions.fulfilled, (state, action) => {
//         // state.loading = false;
//         state.data = action.payload?.transactions; // Assuming the API returns the data in action.payload
//       })
//       .addCase(get_transactions.rejected, (state, action) => {
//         // state.loading = false;
//         state.error = action.error.message || "Something went wrong";
//       });
//   },
// });

// export const { setData, setColumns } = transactionSlice.actions;
// export default transactionSlice.reducer;
