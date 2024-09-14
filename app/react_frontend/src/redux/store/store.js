import { configureStore } from "@reduxjs/toolkit";
import genericSlice from "../features/generic/genericSlice";
import modelSlice from "../features/generic/modelSlice";
import transactionSlice from "../features/transaction/transactionSlice";
import apiMiddleware from "../middleware/apiMiddleware";

const store = configureStore({
  reducer: {
    generic: genericSlice, // Includes message inside generic
    model: modelSlice,
    transaction: transactionSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});

// Attach store to window object for debugging
window.store = store;

export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import usersReducer from "../features/users/usersSlice";
// import genericSlice from "../features/generic/genericSlice";

// const store = configureStore({
//   reducer: {
//     users: usersReducer,
//     generic: genericSlice,
//   },
// });

// export default store;
