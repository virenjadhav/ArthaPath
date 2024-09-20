import apiThunk from "../thunkAPI/apiThunk";

export const get_budgets = apiThunk("budget/get_budgets", "get", "/budgets");

export const delete_budget = apiThunk(
  "budget/delete_budget",
  "delete",
  `/budgets/`
);

// POST /budgets
export const create_budget = apiThunk(
  "generic/create_budget",
  "post",
  "/budgets"
);

// PATCH/PUT /budgets/1
export const update_budget = apiThunk(
  "generic/update_budget",
  "put",
  "/budgets"
);
