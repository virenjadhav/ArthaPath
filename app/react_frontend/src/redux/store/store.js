import { configureStore } from "@reduxjs/toolkit";
import genericSlice from "../features/generic/genericSlice";
import apiMiddleware from "../middleware/apiMiddleware";
import modelSlice from "../features/generic/modelSlice";

const store = configureStore({
  reducer: {
    generic: genericSlice,
    model: modelSlice
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
