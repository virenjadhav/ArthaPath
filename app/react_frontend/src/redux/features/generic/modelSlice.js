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

    servicesData: null,
    criteriaDataStru: null,
    searchCriteriaData: {},
  },
  reducers: {
    setData(state, action) {
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
    setServicesData(state, action) {
      state.servicesData = action.payload;
    },
    setCriteriaDataStru(state, action) {
      state.criteriaDataStru = action.payload;
    },
    setSearchCriteriaData(state, action) {
      state.searchCriteriaData = action.payload;
    },
  },
});

export const {
  setData,
  setIsModelVisible,
  setSelectedRecord,
  setSelectedForm,
  setIsEditing,
  setServicesData,
  setCriteriaDataStru,
  setSearchCriteriaData,
} = modelSlice.actions;
export default modelSlice.reducer;
