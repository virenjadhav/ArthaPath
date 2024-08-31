// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import createApiThunk from "../../../apis/createApiThunk";
// import axiosService from "../../../apis/axiosService";

// Async thunk
// export const isUserLoggedIn = createAsyncThunk(
//   "generic/isUserLoggenIn",
//   async () => {
//     const response = await axios.get("http://localhost:5000/logged_in");
//     return response.json();
//     return response.json();
//   }
// );
// export const isUserLoggedIn = createAsyncThunk(
//   "generic/isUserLoggenIn",
//   async (_, { getState }) => {
//     const response = await axiosService.get("/logged_in", {
//       store: getState().store, // Pass the store in the config
//     });
//     return response.data;
//   }
// );

// //Async thunk
// export const login = createAsyncThunk(
//   "generic/login",
//   async (email, password) => {
//     const response = await axios.get("http://localhost:5000/login", {
//       email,
//       password,
//     });
//     return response.json();
//   }
// );

// //Async thunk
// export const signup = createAsyncThunk(
//   "generic/signup",
//   async (email, password, confirmPassword, name) => {
//     const response = await axios.get("http://localhost:5000/login", {
//       email,
//       password,
//       confirmPassword,
//       name,
//     });
//     return response.json();
//   }
// );

// export const login = createApiThunk("generic/login", "post", "/login");

// export const signup = createApiThunk("generic/signup", "post", "/signup");

// export const isUserLoggedIn = createApiThunk(
//   "generic/isUserLogged",
//   "get",
//   "/logged_in"
// );

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../../../apis/axiosService";

// export const login = createAsyncThunk(
//   "generic/login",
//   async ({ email, password }) => {
//     const response = await axiosService.post("/login", { email, password });
//     return response.data;
//   }
// );

// Define async thunk for login
// export const login = createAsyncThunk(
//   "generic/login",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       // const response = await axiosService.post("/login", { email, password });
//       // Wrap email and password in a session object
//       const response = await axiosService.post("/login", {
//         session: { email, password },
//       });
//       return response.data; // Extract data from response
//     } catch (error) {
//       // Handle and return error response
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const signup = createAsyncThunk(
//   "generic/signup",
//   async ({ email, password, confirmPassword, name }) => {
//     const response = await axiosService.post("/signup", {
//       email,
//       password,
//       confirmPassword,
//       name,
//     });
//     return response.data;
//   }
// );

// export const isUserLoggedIn = createAsyncThunk(
//   "generic/isUserLoggedIn",
//   async () => {
//     const response = await axiosService.get("/logged_in");
//     return response.data;
//   }
// );

// export const isUserLoggedIn = createAsyncThunk(
//   "generic/isUserLoggedIn",
//   async (_, { rejectWithValue }) => {
//     try {
//       // const response = await axiosService.get("/logged_in");
//       const response = await axiosService.get("/logged_in");
//       setLoggedIn(true);
//       return response.data; // Extract data from response
//     } catch (error) {
//       // Return the error response
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

const genericSlice = createSlice({
  name: "generic",
  initialState: {
    selectedModel: "",
    user: null,
    error: "",
    logged_in: false,
    loading: false,
  },
  reducers: {
    setSelectedModel(state, action) {
      state.selectedModel = action.payload;
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
  },
  extraReducers: (builder) => {
    // builder.addCase(isUserLoggedIn.fulfilled, (state, action) => {
    //   // state.loading = false;
    //   state.logged_in = true;
    // });
    // Handling async thunks and actions from other slices
    // builder
    //   .addCase(isUserLoggedIn.pending, (state) => {
    //     // state.status = "loading";
    //     state.loading = true;
    //   })
    //   .addCase(isUserLoggedIn.fulfilled, (state, action) => {
    //     // state.status = "succeeded";
    //     state.loading = false;
    //     state.logged_in = true;
    //   })
    //   .addCase(isUserLoggedIn.rejected, (state, action) => {
    //     // state.status = "failed";
    //     state.loading = false;
    //     state.logged_in = false;
    //     state.error = action.error.message;
    //   })
    //   .addCase(login.pending, (state) => {
    //     // state.status = "loading";
    //     state.loading = true;
    //   })
    //   .addCase(login.fulfilled, (state, action) => {
    //     // state.status = "succeeded";
    //     state.loading = false;
    //     console.log(action);
    //     state.user = action.payload;
    //   })
    //   .addCase(login.rejected, (state, action) => {
    //     // state.status = "failed";
    //     state.loading = false;
    //     state.error = action.error.message;
    //     state.user = null;
    //   })
    //   .addCase(signup.pending, (state) => {
    //     // state.status = "loading";
    //     state.loading = true;
    //   })
    //   .addCase(signup.fulfilled, (state, action) => {
    //     // state.status = "succeeded";
    //     state.loading = false;
    //     console.log(action);
    //     state.user = action.payload;
    //   })
    //   .addCase(signup.rejected, (state, action) => {
    //     // state.status = "failed";
    //     state.loading = false;
    //     state.error = action.error.message;
    //     state.user = null;
    //   });
    //   .addCase(fetchData.fulfilled, (state, action) => {
    //     // Example: handle actions from another slice
    //     state.list = action.payload.users; // Assuming fetchData returns users
    //   });
  },
});
export const {
  setLoading,
  setSelectedModel,
  setError,
  setUser,
  logout,
  setLoggedIn,
} = genericSlice.actions;
export default genericSlice.reducer;
