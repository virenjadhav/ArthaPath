import { setLoading, setError } from "../features/generic/genericSlice";

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
          const errorMessage = action.error.message || "something went wrong";
          dispatch(setError(errorMessage));
        }
      }
    }
    return next(action);
  };
export default apiMiddleware;
