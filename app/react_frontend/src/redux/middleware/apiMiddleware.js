import {
  setLoading,
  setError,
  setMessageState,
} from "../features/generic/genericSlice";
import { setErrorMsg } from "../features/generic/messageSlice";

const apiMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // Ensure action.type is a string before calling endsWith
    if (typeof action.type === "string") {
      // check if the action in a api call
      if (action.type.endsWith("/pending")) {
        // Action dispatched before api call
        dispatch(setLoading(true));
      }
      if (
        action.type.endsWith("/fulfilled") ||
        action.type.endsWith("/rejected")
      ) {
        //Action dispatched after api call
        dispatch(setLoading(false));
        if (action.type.endsWith("/rejected")) {
          // const errorMessage = action.error.message || "something went wrong";
          // const errorMessage =
          //   action.payload?.message ||
          //   action.payload?.error ||
          //   "Something went wrong.";
          // dispatch(setMessageState(setErrorMsg(errorMessage)));
        }
      }
    }
    return next(action);
  };
export default apiMiddleware;
