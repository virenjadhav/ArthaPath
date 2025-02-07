import TabPane from "antd/es/tabs/TabPane";
import React, { useEffect } from "react";
import ModelComponent from "../ModelComponent";
import { useDispatch, useSelector } from "react-redux";
import DebtAddEditForm from "../../pages/debt/DebtAddEditForm";
import TableComponent from "../TableComponent";
import { setDetailState } from "../../redux/features/generic/modelSlice";
import {
  setDetailKey,
  setDetailColumnsData,
  setDetailCriteriaDataStru,
  setDetailId,
  setDetailServicesData,
  setDetailTag,
} from "../../redux/features/generic/detailSlice";

const Detail = ({
  id,
  detailKey,
  detailTag,
  detailServicesData = null,
  detailCriteriaData = null,
  detailColumnsData = null,
  detailAddEditComponent = null,
}) => {
  const dispatch = useDispatch();
  const detailData = useSelector((state) => state.model.detail.detaiData);
  const data = useSelector((state) => state.model.data);
  const detailActiveTabKey = useSelector(
    (state) => state.model.detail.detailActiveTabKey
  );
  useEffect(() => {
    if (detailKey === detailActiveTabKey) {
      dispatch(setDetailState(setDetailId(id)));
      dispatch(setDetailState(setDetailKey(detailKey)));
      dispatch(setDetailState(setDetailTag(detailTag)));
    }
  }, [id, detailKey, detailTag, detailActiveTabKey]);
  useEffect(() => {
    if (detailServicesData && detailKey === detailActiveTabKey) {
      dispatch(setDetailState(setDetailServicesData(detailServicesData)));
    }
  }, [detailServicesData, detailActiveTabKey]);
  useEffect(() => {
    if (detailColumnsData && detailKey === detailActiveTabKey) {
      dispatch(setDetailState(setDetailColumnsData(detailColumnsData)));
    }
  }, [detailColumnsData, detailActiveTabKey]);
  useEffect(() => {
    if (detailCriteriaData && detailKey === detailActiveTabKey) {
      dispatch(setDetailState(setDetailCriteriaDataStru(detailCriteriaData)));
    }
  }, [detailCriteriaData, detailActiveTabKey]);
  return (
    <>
      {/* <TabPane tab={"tab2"} key={"2"}> */}
      {/* <div>Hello from Detail</div> */}
      {/* </TabPane> */}
      <ModelComponent
        data={detailData}
        columnsData={detailColumnsData}
        DetailFormCustomComponent={detailAddEditComponent}
        navigatePath="/debts" // Path to navigate after delete
        moduleTitle={"title"}
        isDetailModelComponent={true}
      />
    </>
  );
};

export default Detail;
