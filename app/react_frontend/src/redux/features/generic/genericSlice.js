import { createSlice } from "@reduxjs/toolkit";
import messageReducer from "./messageSlice"; // Import the message reducer

const genericSlice = createSlice({
  name: "generic",
  initialState: {
    selectedModelId: null,
    selectedModelCode: null,
    user: null,
    error: "",
    logged_in: false,
    loading: false,
    message: messageReducer(undefined, {}), // Initialize message state from messageReducer
  },
  reducers: {
    setSelectedModelId(state, action) {
      state.selectedModelId = action.payload;
    },
    setSelectedModelCode(state, action) {
      state.selectedModelCode = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
      state.logged_in = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setLoggedIn(state, action) {
      state.logged_in = action.payload;
    },
    // Message-related actions delegate to messageReducer directly
    setMessageState(state, action) {
      state.message = messageReducer(state.message, action.payload); // Delegates message-related actions to messageReducer
    },
  },
});

export const {
  setSelectedModelId,
  setSelectedModelCode,
  setError,
  setUser,
  logout,
  setLoading,
  setLoggedIn,
  setMessageState, // Action to delegate message state
} = genericSlice.actions;

export default genericSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// // import messageSlice from "./messageSlice"; // Import messageSlice
// import { messageInitialState } from "./messageSlice"; // Import initial state

// const genericSlice = createSlice({
//   name: "generic",
//   initialState: {
//     selectedModelId: null,
//     selectedModelCode: null,
//     user: null,
//     error: "",
//     logged_in: false,
//     loading: false,
//     // message: messageSlice.getInitialState(), // Initialize message state from messageSlice
//     message: messageInitialState,
//   },
//   reducers: {
//     setSelectedModelId(state, action) {
//       state.selectedModelId = action.payload;
//     },
//     setSelectedModelCode(state, action) {
//       state.selectedModelCode = action.payload;
//     },
//     setError(state, action) {
//       state.error = action.payload;
//     },
//     setUser(state, action) {
//       state.user = action.payload;
//     },
//     logout(state) {
//       state.user = null;
//       state.logged_in = false;
//     },
//     setLoading(state, action) {
//       state.loading = action.payload;
//     },
//     setLoggedIn(state, action) {
//       state.logged_in = action.payload;
//     },
//     setMessageResult(state, action) {
//       state.message.result = action.payload;
//     },
//     setMessageSuccessMsg(state, action) {
//       state.message.successMsg = action.payload;
//     },
//     setMessageErrorMsg(state, action) {
//       state.message.errorMsg = action.payload;
//     },
//     setMessageWarningMsg(state, action) {
//       state.message.warningMsg = action.payload;
//     },
//     setMessageTime(state, action) {
//       state.message.time = action.payload;
//     },
//     setMessageClearMsg(state) {
//       state.message.time = 3;
//       state.message.warningMsg = null;
//       state.message.errorMsg = null;
//       state.message.successMsg = null;
//       state.message.result = null;
//     },
//   },
// });

// export const {
//   setLoading,
//   setSelectedModelId,
//   setSelectedModelCode,
//   setError,
//   setUser,
//   logout,
//   setLoggedIn,
//   setMessageResult,
//   setMessageSuccessMsg,
//   setMessageErrorMsg,
//   setMessageWarningMsg,
//   setMessageTime,
//   setMessageClearMsg,
// } = genericSlice.actions;

// export default genericSlice.reducer;

// // import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// // import axios from "axios";
// // import createApiThunk from "../../../apis/createApiThunk";
// // import axiosService from "../../../apis/axiosService";

// // Async thunk
// // export const isUserLoggedIn = createAsyncThunk(
// //   "generic/isUserLoggenIn",
// //   async () => {
// //     const response = await axios.get("http://localhost:5000/logged_in");
// //     return response.json();
// //     return response.json();
// //   }
// // );
// // export const isUserLoggedIn = createAsyncThunk(
// //   "generic/isUserLoggenIn",
// //   async (_, { getState }) => {
// //     const response = await axiosService.get("/logged_in", {
// //       store: getState().store, // Pass the store in the config
// //     });
// //     return response.data;
// //   }
// // );

// // //Async thunk
// // export const login = createAsyncThunk(
// //   "generic/login",
// //   async (email, password) => {
// //     const response = await axios.get("http://localhost:5000/login", {
// //       email,
// //       password,
// //     });
// //     return response.json();
// //   }
// // );

// // //Async thunk
// // export const signup = createAsyncThunk(
// //   "generic/signup",
// //   async (email, password, confirmPassword, name) => {
// //     const response = await axios.get("http://localhost:5000/login", {
// //       email,
// //       password,
// //       confirmPassword,
// //       name,
// //     });
// //     return response.json();
// //   }
// // );

// // export const login = createApiThunk("generic/login", "post", "/login");

// // export const signup = createApiThunk("generic/signup", "post", "/signup");

// // export const isUserLoggedIn = createApiThunk(
// //   "generic/isUserLogged",
// //   "get",
// //   "/logged_in"
// // );

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosService from "../../../apis/axiosService";
// import messageSlice from "./messageSlice";

// // export const login = createAsyncThunk(
// //   "generic/login",
// //   async ({ email, password }) => {
// //     const response = await axiosService.post("/login", { email, password });
// //     return response.data;
// //   }
// // );

// // Define async thunk for login
// // export const login = createAsyncThunk(
// //   "generic/login",
// //   async ({ email, password }, { rejectWithValue }) => {
// //     try {
// //       // const response = await axiosService.post("/login", { email, password });
// //       // Wrap email and password in a session object
// //       const response = await axiosService.post("/login", {
// //         session: { email, password },
// //       });
// //       return response.data; // Extract data from response
// //     } catch (error) {
// //       // Handle and return error response
// //       return rejectWithValue(error.response.data);
// //     }
// //   }
// // );

// // export const signup = createAsyncThunk(
// //   "generic/signup",
// //   async ({ email, password, confirmPassword, name }) => {
// //     const response = await axiosService.post("/signup", {
// //       email,
// //       password,
// //       confirmPassword,
// //       name,
// //     });
// //     return response.data;
// //   }
// // );

// // export const isUserLoggedIn = createAsyncThunk(
// //   "generic/isUserLoggedIn",
// //   async () => {
// //     const response = await axiosService.get("/logged_in");
// //     return response.data;
// //   }
// // );

// // export const isUserLoggedIn = createAsyncThunk(
// //   "generic/isUserLoggedIn",
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       // const response = await axiosService.get("/logged_in");
// //       const response = await axiosService.get("/logged_in");
// //       setLoggedIn(true);
// //       return response.data; // Extract data from response
// //     } catch (error) {
// //       // Return the error response
// //       return rejectWithValue(error.response.data);
// //     }
// //   }
// // );

// const genericSlice = createSlice({
//   name: "generic",
//   initialState: {
//     selectedModelId: null,
//     selectedModelCode: null,
//     user: null,
//     error: "",
//     logged_in: false,
//     loading: false,
//     message: messageSlice.getInitialState(), // Initialize message state inside generic
//   },
//   reducers: {
//     setSelectedModelId(state, action) {
//       state.selectedModelId = action.payload;
//     },
//     setSelectedModelCode(state, action) {
//       state.selectedModelCode = action.payload;
//     },
//     setError(state, action) {
//       state.error = action.payload;
//     },
//     setUser(state, action) {
//       state.user = action.payload;
//     },
//     logout(state) {
//       state.user = null;
//       state.logged_in = false;
//     },
//     setLoading(state, action) {
//       state.loading = action.payload;
//     },
//     setLoggedIn(state, action) {
//       state.logged_in = action.payload;
//     },
//     setMessageResult(state, action) {
//       state.message.result = action.payload;
//     },
//     setMessageSuccessMsg(state, action) {
//       state.message.successMsg = action.payload;
//     },
//     setMessageErrorMsg(state, action) {
//       state.message.errorMsg = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     // builder.addCase(isUserLoggedIn.fulfilled, (state, action) => {
//     //   // state.loading = false;
//     //   state.logged_in = true;
//     // });
//     // Handling async thunks and actions from other slices
//     // builder
//     //   .addCase(isUserLoggedIn.pending, (state) => {
//     //     // state.status = "loading";
//     //     state.loading = true;
//     //   })
//     //   .addCase(isUserLoggedIn.fulfilled, (state, action) => {
//     //     // state.status = "succeeded";
//     //     state.loading = false;
//     //     state.logged_in = true;
//     //   })
//     //   .addCase(isUserLoggedIn.rejected, (state, action) => {
//     //     // state.status = "failed";
//     //     state.loading = false;
//     //     state.logged_in = false;
//     //     state.error = action.error.message;
//     //   })
//     //   .addCase(login.pending, (state) => {
//     //     // state.status = "loading";
//     //     state.loading = true;
//     //   })
//     //   .addCase(login.fulfilled, (state, action) => {
//     //     // state.status = "succeeded";
//     //     state.loading = false;
//     //     state.user = action.payload;
//     //   })
//     //   .addCase(login.rejected, (state, action) => {
//     //     // state.status = "failed";
//     //     state.loading = false;
//     //     state.error = action.error.message;
//     //     state.user = null;
//     //   })
//     //   .addCase(signup.pending, (state) => {
//     //     // state.status = "loading";
//     //     state.loading = true;
//     //   })
//     //   .addCase(signup.fulfilled, (state, action) => {
//     //     // state.status = "succeeded";
//     //     state.loading = false;
//     //     state.user = action.payload;
//     //   })
//     //   .addCase(signup.rejected, (state, action) => {
//     //     // state.status = "failed";
//     //     state.loading = false;
//     //     state.error = action.error.message;
//     //     state.user = null;
//     //   });
//     //   .addCase(fetchData.fulfilled, (state, action) => {
//     //     // Example: handle actions from another slice
//     //     state.list = action.payload.users; // Assuming fetchData returns users
//     //   });
//   },
// });
// export const {
//   setLoading,
//   setSelectedModelId,
//   setSelectedModelCode,
//   setError,
//   setUser,
//   logout,
//   setLoggedIn,
//   setMessageResult,
//   setMessageSuccessMsg,
//   setMessageErrorMsg,
// } = genericSlice.actions;
// export default genericSlice.reducer;
