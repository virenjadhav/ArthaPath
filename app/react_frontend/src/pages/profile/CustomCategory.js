import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModelComponent from "../../components/ModelComponent";
import {
  setColumnsData,
  setCriteriaDataStru,
  setSelectedRecord,
  setServicesData,
} from "../../redux/features/generic/modelSlice";
import columnsData from "./UserCategoryColumns.json";
import CustomCategoryAddEdit from "./CustomCategoryAddEdit";
import Categories from "./Categories";
import categoriesCriteriaData from "./CategoryCriteriaStru.json";
import categoryServicesData from "./UserCategoryServices.json";

const CustomCategory = ({ title }) => {
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const selectedRecord = useSelector((state) => state.model.selectedRecord);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.model.data);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  useEffect(() => {
    if (!selectedRecord) {
      setSelectedRowKey(null);
    }
  }, [selectedRecord, data]);
  useEffect(() => {
    const columns = columnsData.map((column) => {
      // if (column.dataIndex === "trans_date") {
      //   return {
      //     ...column,
      //     render: (text) => dayjs(text).format("YYYY-MM-DD"),
      //   };
      // }
      if (column.dataIndex === "radio") {
        return {
          ...column,
          className: "radio-button-column", // Apply the CSS class
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
    dispatch(setColumnsData(columnsData));
  }, columnsData);
  useEffect(() => {
    if (categoryServicesData) {
      dispatch(setServicesData(categoryServicesData));
    }
    // Cleanup function to remove component on unmount
    return () => {
      if (categoryServicesData) {
        // delete formComponentProps.current[name];
        dispatch(setServicesData(null));
      }
    };
  }, [categoryServicesData]);

  useEffect(() => {
    if (categoriesCriteriaData) {
      dispatch(setCriteriaDataStru(categoriesCriteriaData));
    }
    // Cleanup function to remove component on unmount
    return () => {
      if (categoriesCriteriaData) {
        // delete formComponentProps.current[name];
        dispatch(setCriteriaDataStru(null));
      }
    };
  }, [categoriesCriteriaData]);
  const handleSelectRow = (record) => {
    setSelectedRowKey(record.id);
    dispatch(setSelectedRecord(record));
  };
  const columns = columnsData.map((column) => {
    // if (column.dataIndex === "trans_date") {
    //   return {
    //     ...column,
    //     render: (text) => dayjs(text).format("YYYY-MM-DD"),
    //   };
    // }
    if (column.dataIndex === "radio") {
      return {
        ...column,
        className: "radio-button-column", // Apply the CSS class
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
  const handleExpand = (expanded, record) => {
    if (expanded) {
      setExpandedRowKeys([record.key]);
    } else {
      setExpandedRowKeys([]);
    }
  };
  return (
    <>
      <ModelComponent
        data={data}
        columns={columns}
        FormCustomComponent={CustomCategoryAddEdit}
        deleteAction={null}
        navigatePath="/transactions" // Path to navigate after delete
        refreshAction={null} // Action to refresh transactions
        moduleTitle={title}
        expandable={{
          expandedRowKeys,
          onExpand: handleExpand,
          rowExpandable: (record) =>
            record.children && record.children.length > 0,
        }}
      />
    </>
  );
};

export default CustomCategory;
