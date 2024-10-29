import apiThunk from "../thunkAPI/apiThunk";
import { setData } from "./transactionSlice";

// export const get_transactions = apiThunk(
//   "transaction/get_transactions",
//   "get",
//   "/transactions"
// );

// Fetch transactions and set data in Redux store
export const get_transactions = apiThunk(
  "transaction/get_transactions",
  "get",
  "/transactions/get_transactions"
);

export const delete_transaction = apiThunk(
  "transaction/delete_transaction",
  "delete",
  `/delete_transaction/`
);

// POST /transactions
export const create_transaction = apiThunk(
  "transaction/create_transaction",
  "post",
  "/create_transaction"
);

// PATCH/PUT /transactions/1
export const update_transaction = apiThunk(
  "transaction/update_transaction",
  "put",
  "/update_transaction"
);

// export const isUserLoggedIn = apiThunk(
//   "generic/isUserLoggedIn",
//   "get",
//   "/logged_in"
// );

// export const login = apiThunk("generic/login", "post", "/login");

// export const signup = apiThunk("generic/signup", "post", "/signup");

// export const logout = apiThunk("generic/logout", "delete", "/logout");
