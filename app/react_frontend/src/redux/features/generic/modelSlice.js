import { createSlice } from "@reduxjs/toolkit";
import detailReducer from "./detailSlice";

const modelSlice = createSlice({
  name: "model",
  initialState: {
    data: null,
    isModelVisible: false,
    selectedForm: {},
    selectedRecord: null,
    showRecord: null,
    records: null,
    isEditing: false,

    servicesData: null,
    criteriaDataStru: null,
    searchCriteriaData: {},
    columnsData: null,
    detail: detailReducer(undefined, {}), // Initialize message state from messageReducer
    isDetailModel: false,
    selectedMainRecord: null,
    modelRecordType: "main",
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
    setColumnsData(state, action) {
      state.columnsData = action.payload;
    },
    setShowRecord(state, action) {
      state.showRecord = action.payload;
    },
    setIsDetailModel(state, action) {
      state.isDetailModel = action.payload;
    },
    setRecords(state, action) {
      state.records = action.payload;
    },
    setSelectedMainRecord(state, action) {
      state.selectedMainRecord = action.payload;
    },
    setModelRecordType(state, action) {
      state.modelRecordType = action.payload;
    },
    clearModelReducer(state) {
      state.data = null;
      state.isModelVisible = false;
      state.selectedForm = {};
      state.selectedRecord = null;
      state.records = null;
      state.isEditing = false;
      state.servicesData = null;
      state.criteriaDataStru = null;
      state.searchCriteriaData = {};
      state.columnsData = null;
      state.detail = detailReducer(undefined, {});
      state.isDetailModel = false;
      state.selectedMainRecord = null;
      state.modelRecordType = "main";
    },
    setDetailState(state, action) {
      state.detail = detailReducer(state.detail, action.payload);
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
  clearModelReducer,
  setColumnsData,
  setShowRecord,
  setDetailState,
  setIsDetailModel,
  setRecords,
  setSelectedMainRecord,
  setModelRecordType,
} = modelSlice.actions;
export default modelSlice.reducer;
