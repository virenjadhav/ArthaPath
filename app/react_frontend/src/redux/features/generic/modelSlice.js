import { createSlice } from "@reduxjs/toolkit";

const modelSlice = createSlice({
  name: "model",
  initialState: {
    data: null,
    isModelVisible: false,
    selectedForm: {},
    selectedRecord: null,
    records: null,
    isEditing: false,
  },
  reducers: {
    setDate(state, action) {
      state.data = action.payload;
    },
    setIsModelVisible(state, action) {
      state.isModelVisible = action.payload;
    },
    setSelectedForm(state, action) {
      state.selectedForm = action.payload;
    },
    setSelectedRecord(state, action) {
      state.selectedRecord = action.payload;
    },
    setIsEditing(state, action) {
      state.isEditing = action.payload;
    },
  },
});

export const {
  setDate,
  setIsModelVisible,
  setSelectedRecord,
  setSelectedForm,
  setIsEditing,
} = modelSlice.actions;
export default modelSlice.reducer;
