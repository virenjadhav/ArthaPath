import React, { useEffect, useState } from "react";
import ModelComponent from "../../components/ModelComponent.js";
import columnsData from "./DebtColumns.json";
import debtServicesData from "./DebtServices.json";
import debtCriteriaDataStru from "./DebtCriteria.json";
import debtLinesCriteriaDataStru from "./DebtLinesCriteria.json";
import debtLinesServicesData from "./DebtLinesServices.json";
import debtLinesColumnsData from "./DebtLinesColumns.json";
import dayjs from "dayjs";
import {
  setSelectedRecord,
  setServicesData,
  setCriteriaDataStru,
  setIsDetailModel,
  setColumnsData,
} from "../../redux/features/generic/modelSlice.js";
import DebtAddEditForm from "./DebtAddEditForm";
import { useDispatch, useSelector } from "react-redux";
import DetailTab from "../../components/Detail/DetailTab.js";
import Detail from "../../components/Detail/Detail.js";
import TabPane from "antd/es/tabs/TabPane.js";
import { Space } from "antd";
import DebtLineAddEditForm from "./DebtLineAddEditForm";

const Debts = ({ title }) => {
  const selectedRecord = useSelector((state) => state.model.selectedRecord);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.model.data);
  // const { callApi } = useApiServiceCall();

  useEffect(() => {
    if (debtServicesData) {
      dispatch(setServicesData(debtServicesData));
    }

    return () => {
      if (debtServicesData) {
        dispatch(setServicesData(null));
      }
    };
  }, [debtServicesData]);

  useEffect(() => {
    if (debtCriteriaDataStru) {
      dispatch(setCriteriaDataStru(debtCriteriaDataStru));
    }
    return () => {
      if (debtCriteriaDataStru) {
        dispatch(setCriteriaDataStru(null));
      }
    };
  }, [debtCriteriaDataStru]);
  useEffect(() => {
    if (columnsData) {
      dispatch(setColumnsData(columnsData));
    }
  }, [columnsData]);

  return (
    <>
      <ModelComponent
        data={data}
        columnsData={columnsData}
        FormCustomComponent={DebtAddEditForm}
        navigatePath="/debts" // Path to navigate after delete
        moduleTitle={title}
        showDetail={true}
      >
        <DetailTab activeTabKey={"debt_lines"}>
          <TabPane tab={"Debt Lines"} key={"debt_lines"}>
            <Detail
              id="debtLines"
              detailKey={"debt_lines"}
              detailTag="debt_lines"
              detailServicesData={debtLinesServicesData}
              detailCriteriaData={debtLinesCriteriaDataStru}
              detailColumnsData={debtLinesColumnsData}
              detailAddEditComponent={DebtLineAddEditForm}
            />
          </TabPane>
          <TabPane tab={"tab5"} key={"5"}>
            Hello from tab 5 <br /> <br />
            Hello from tab 5 <br /> <br />
            Hello from tab 5 <br /> <br />
            Hello from tab 5 <br /> <br />
          </TabPane>
        </DetailTab>
      </ModelComponent>
    </>
  );
};

export default Debts;
