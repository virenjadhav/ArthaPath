import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    result: null,
    successMsg: null,
    errorMsg: null,
    warningMsg: null,
    time: 3,
  },
  reducers: {
    setResult(state, action) {
      state.result = action.payload;
    },
    setSuccessMsg(state, action) {
      state.successMsg = action.payload;
    },
    setErrorMsg(state, action) {
      state.errorMsg = action.payload;
    },
    setWarningMsg(state, action) {
      state.warningMsg = action.payload;
    },
    setTime(state, action) {
      state.time = action.payload;
    },
    clearMessage(state) {
      state.result = null;
      state.successMsg = null;
      state.errorMsg = null;
      state.warningMsg = null;
    },
  },
});

export const {
  setResult,
  setSuccessMsg,
  setErrorMsg,
  setWarningMsg,
  setTime,
  clearMessage,
} = messageSlice.actions;

export const messageInitialState = messageSlice.getInitialState(); // Export initial state

export default messageSlice.reducer;
