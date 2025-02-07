import { createSlice } from "@reduxjs/toolkit";

const detailSlice = createSlice({
  name: "detail",
  initialState: {
    detaiData: null,
    detailId: null,
    detailKey: null,
    detailTag: null,
    detailActiveTabKey: null,
    detailServicesData: null,
    detailCriteriaDataStru: null,
    detailSearchCriteriaData: {},
    detailColumnsData: null,
    detailRecords: null,
    selectedDetailRecord: null,
  },
  reducers: {
    setDetailData(state, action) {
      state.detaiData = action.payload;
    },
    setDetailId(state, action) {
      state.detailId = action.payload;
    },
    setDetailKey(state, action) {
      state.detailKey = action.payload;
    },
    setDetailServicesData(state, action) {
      state.detailServicesData = action.payload;
    },
    setDetailCriteriaDataStru(state, action) {
      state.detailCriteriaDataStru = action.payload;
    },
    setDetailSearchCriteriaData(state, action) {
      state.detailSearchCriteriaData = action.payload;
    },
    setDetailColumnsData(state, action) {
      state.detailColumnsData = action.payload;
    },
    setDetailActiveTabKey(state, action) {
      state.detailActiveTabKey = action.payload;
    },
    setSelectedDetailRecord(state, action) {
      state.selectedDetailRecord = action.payload;
    },
    setDetailTag(state, action) {
      state.detailTag = action.payload;
    },
    setDetailRecords(state, action) {
      state.detailRecords = action.payload;
    },
    clearDetail(state) {
      state.detaiData = null;
      state.detailId = null;
      state.detailKey = null;
      state.detailServicesData = null;
      state.detailCriteriaDataStru = null;
      state.detailSearchCriteriaData = {};
      state.detailColumnsData = null;
      state.detailActiveTabKey = null;
      state.detailRecords = null;
      state.selectedDetailRecord = null;
      state.detailTag = null;
    },
  },
});
export const {
  setDetailData,
  setDetailId,
  setDetailKey,
  setDetailServicesData,
  setDetailCriteriaDataStru,
  setDetailSearchCriteriaData,
  setDetailColumnsData,
  clearDetail,
  setDetailActiveTabKey,
  setSelectedDetailRecord,
  setDetailTag,
  setDetailRecords,
} = detailSlice.actions;
export const detailInitialState = detailSlice.getInitialState();

export default detailSlice.reducer;
