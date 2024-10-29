import apiThunk from "../thunkAPI/apiThunk";

export const get_lookup_record = apiThunk(
  "generic/get_lookup_record",
  "get",
  "/get_lookup_record"
);

export const validate_lookup_value = apiThunk(
  "generic/validate_lookup_value",
  "post",
  "/validate_lookup_value"
);
