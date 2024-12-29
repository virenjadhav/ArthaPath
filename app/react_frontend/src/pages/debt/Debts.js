import React, { useEffect, useState } from "react";
import ModelComponent from "../../components/ModelComponent.js";
import columnsData from "./DebtColumns.json";
import debtServicesData from "./DebtServices.json";
import debtCriteriaDataStru from "./DebtCriteria.json";
import dayjs from "dayjs";
import {
  setSelectedRecord,
  setServicesData,
  setCriteriaDataStru,
} from "../../redux/features/generic/modelSlice.js";
import DebtAddEditForm from "./DebtAddEditForm";
import { useDispatch, useSelector } from "react-redux";

const Debts = ({ title }) => {
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const selectedRecord = useSelector((state) => state.model.selectedRecord);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.model.data);
  // const { callApi } = useApiServiceCall();

  useEffect(() => {
    if (!selectedRecord) {
      setSelectedRowKey(null);
    }
  }, [selectedRecord, data]);

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

  const handleSelectRow = (record) => {
    setSelectedRowKey(record.id);
    dispatch(setSelectedRecord(record));
  };
  const columns = columnsData.map((column) => {
    if (column.dataIndex === "trans_date") {
      return {
        ...column,
        // render: (text) => dayjs(text).format("DD MMM YYYY"), // Format date using day.js
        // let Date = selectedRecord.trans_date
        // ? dayjs(selectedRecord.trans_date, "YYYY-MM-DD HH:mm:ss.SSS")
        // : null;
        // render: (text) => dayjs(text).format("YYYY-MM-DD"),
        render: (text) => dayjs(text).format("YYYY-MM-DD"),
      };
    }
    if (column.dataIndex === "radio") {
      return {
        ...column,
        className: "radio-button-column",
        render: (_, record) => (
          <input
            type="radio"
            checked={record.id === selectedRowKey}
            onChange={() => handleSelectRow(record)}
          />
        ),
      };
    }
    return column;
  });
  return (
    <>
      <ModelComponent
        data={data}
        columns={columns}
        FormCustomComponent={DebtAddEditForm}
        navigatePath="/debts" // Path to navigate after delete
        moduleTitle={title}
      />
    </>
  );
};

export default Debts;
