import React, { useEffect, useState } from "react";
import ModelComponent from "../../components/ModelComponent";
import columnsData from "./BudgetColumns.json";
import dayjs from "dayjs"; // Import day.js
import { setSelectedRecord } from "../../redux/features/generic/modelSlice";
import BudgetAddEditForm from "./BudgetAddEditForm.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setColumns,
  setData,
} from "../../redux/features/budget/budgetSlice.js";

import {
  delete_budget,
  get_budgets,
} from "../../redux/features/budget/budgetApiThunk.js";

const Budgets = ({ title }) => {
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const selectedRecord = useSelector((state) => state.model.selectedRecord);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.budget.data);

  useEffect(() => {
    if (!selectedRecord) {
      setSelectedRowKey(null);
    }
  }, [selectedRecord, data]);

  // useEffect(() => {
  //   const getAllBudgets = async () => {
  //     try {
  //       const response = await dispatch(get_budgets()).unwrap();
  //       dispatch(setData(response?.budget));
  //       dispatch(setColumns(columnsData));
  //     } catch (error) {
  //     }
  //   };
  //   if (!data) {
  //     getAllBudgets();
  //   }
  // }, [dispatch, data]);

  useEffect(() => {
    const getBudgets = async () => {
      try {
        // Dispatch the async thunk to check login status
        const response = await dispatch(get_budgets()).unwrap();

        // Dispatch actions to set user and logged-in status
        // dispatch(setUser(response.user));
        // dispatch(setLoggedIn(true));
        dispatch(setData(response?.budgets));
        dispatch(setColumns(columnsData));
      } catch (error) {
        console.error("Error for getting all budgets : ", error);
      }
    };
    if (!data) {
      getBudgets();
    }
  }, [dispatch, data]);

  const handleSelectRow = (record) => {
    setSelectedRowKey(record.id);
    dispatch(setSelectedRecord(record));
  };
  const columns = columnsData.map((column) => {
    if (column.dataIndex === "trans_date") {
      return {
        ...column,
        render: (text) => dayjs(text).format("YYYY-MM-DD"),
      };
    }
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
  return (
    <>
      <ModelComponent
        data={data}
        columns={columns}
        FormCustomComponent={BudgetAddEditForm}
        deleteAction={delete_budget}
        navigatePath="/budgets" // Path to navigate after delete
        refreshAction={() => dispatch(get_budgets())} // Action to refresh transactions
        moduleTitle={title}
      />
    </>
  );
};

export default Budgets;
