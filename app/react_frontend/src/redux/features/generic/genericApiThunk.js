import apiThunk from "../thunkAPI/apiThunk";

export const isUserLoggedIn = apiThunk(
  "generic/isUserLoggedIn",
  "get",
  "/logged_in"
);

export const login = apiThunk("generic/login", "post", "/login");

export const signup = apiThunk("generic/signup", "post", "/signup");

export const logout = apiThunk("generic/logout", "delete", "/logout");
