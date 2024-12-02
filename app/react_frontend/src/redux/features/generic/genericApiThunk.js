import apiThunk from "../thunkAPI/apiThunk";

export const isUserLoggedIn = apiThunk(
  "generic/isUserLoggedIn",
  "get",
  "/logged_in"
);

// export const login = apiThunk("generic/login", "post", "/login");

// export const signup = apiThunk("generic/signup", "post", "/signup");

// export const logout = apiThunk("generic/logout", "delete", "/logout");

export const login = (actionType, method, baseUrl, payload = {}) => {
  return apiThunk(actionType, method, baseUrl, payload);
};
export const signup = (actionType, method, baseUrl, payload = {}) => {
  return apiThunk(actionType, method, baseUrl, payload);
};
export const logout = (actionType, method, baseUrl, payload = {}) => {
  return apiThunk(actionType, method, baseUrl, payload);
};

export const changePassword = apiThunk(
  "generic/changePassword",
  "put",
  "/change_password"
);
// export const serviceCall = () => {
//   return async (dispatch) => {
//     // Ensure the service call is dispatched
//     return await dispatch(
//       apiThunk(
//         "transaction/get_transactions",
//         "get",
//         "/transactions/get_transactions"
//       )
//     );
//   };
// };
// export const serviceCall = apiThunk(
//   "transaction/get_transactions",
//   "get",
//   "/transactions/get_transactions"
// );
export const serviceCall = (actionType, method, baseUrl, payload = {}, axiosDetail = {baseURL: null, contentType:null}) => {
  return apiThunk(actionType, method, baseUrl, payload, axiosDetail);
};
