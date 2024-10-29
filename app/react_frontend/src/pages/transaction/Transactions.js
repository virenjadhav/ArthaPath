import React, { useEffect, useState } from "react";
import ModelComponent from "../../components/ModelComponent";
import HeaderComponent from "../../components/Header";
import columnsData from "./TransactionColumns.json";
import transactionServicesData from "./TransactionServices.json";
import transactionCriteriaDataStru from "./TransactionCriteria.json";
// import moment from "moment";
import dayjs from "dayjs"; // Import day.js
import {
  setDate,
  setSelectedForm,
  setSelectedRecord,
  setServicesData,
  setCriteriaDataStru,
} from "../../redux/features/generic/modelSlice";
import TransactionAddEditForm from "./TransactionAddEditForm";
import { useDispatch, useSelector } from "react-redux";
import {
  setColumns,
  setData,
} from "../../redux/features/transaction/transactionSlice.js";
// import './styles.css'; // Import the custom CSS

import {
  delete_transaction,
  get_transactions,
} from "../../redux/features/transaction/transactionApiThunk.js";
import { setMessageState } from "../../redux/features/generic/genericSlice.js";
// import useApiServiceCall, {
//   ApiServiceCall,
// } from "../../apis/ApiServiceCall.js";
import {
  setErrorMsg,
  setResult,
} from "../../redux/features/generic/messageSlice.js";

const Transactions = ({ title }) => {
  // const [data, setData] = useState([
  //   {
  //     key: "1",
  //     name: "Transaction 1",
  //     amount: "$100",
  //     date: "2024-08-27",
  //   },
  //   {
  //     key: "2",
  //     name: "Transaction 2",
  //     amount: "$200",
  //     date: "2024-08-26",
  //   },
  //   {
  //     key: "3",
  //     name: "Transaction 3",
  //     amount: "$300",
  //     date: "2024-08-25",
  //   },
  // ]);
  // const columns = [
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "name",
  //   },
  //   {
  //     title: "Amount",
  //     dataIndex: "amount",
  //     key: "amount",
  //   },
  //   {
  //     title: "Date",
  //     dataIndex: "date",
  //     key: "date",
  //   },
  //   {
  //     //   title: "Action",
  //     //   key: "action",
  //     //   render: (text, record) => (
  //     //     <Space size="middle">
  //     //       <Button onClick={() => showEditTransactionModal(record)}>Edit</Button>
  //     //       <Button danger onClick={() => handleDeleteTransaction(record.key)}>
  //     //         Delete
  //     //       </Button>
  //     //     </Space>
  //     //   ),
  //   },
  // ];
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const selectedRecord = useSelector((state) => state.model.selectedRecord);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.transaction.data);
  // const { callApi } = useApiServiceCall();

  useEffect(() => {
    if (!selectedRecord) {
      setSelectedRowKey(null);
    }
  }, [selectedRecord, data]);

  useEffect(() => {
    if (transactionServicesData) {
      dispatch(setServicesData(transactionServicesData));
    }
    // Cleanup function to remove component on unmount
    return () => {
      if (transactionServicesData) {
        // delete formComponentProps.current[name];
        dispatch(setServicesData(null));
      }
    };
  }, [transactionServicesData]);

  useEffect(() => {
    if (transactionCriteriaDataStru) {
      dispatch(setCriteriaDataStru(transactionCriteriaDataStru));
    }
    // Cleanup function to remove component on unmount
    return () => {
      if (transactionCriteriaDataStru) {
        // delete formComponentProps.current[name];
        dispatch(setCriteriaDataStru(null));
      }
    };
  }, [transactionCriteriaDataStru]);
  // const getAllTransacations = async () => {
  //   try {
  //     const response = await callApi("getList"); // Using serviceId for fetching the list
  //   } catch (error) {
  //   }
  // };

  // useEffect(() => {
  //   // const getAllTransacations = async () => {
  //   //   // try {
  //   //   // Dispatch the async thunk to check login status
  //   //   // const response = await dispatch(get_transactions()).unwrap();
  //   //   // const response = await dispatch(ApiServiceCall("getList"));
  //   //   const { callApi } = useApiServiceCall("getList");
  //   //   try {
  //   //     const response = await callApi();
  //   //   } catch (error) {
  //   //   }

  //   //   // Dispatch actions to set user and logged-in status
  //   //   // dispatch(setUser(response.user));
  //   //   // dispatch(setLoggedIn(true));
  //   //   //   dispatch(setData(response.transactions));
  //   //   //   dispatch(setColumns(columnsData));
  //   //   // } catch (error) {
  //   //   //   dispatch(setMessageState(setResult("error")));
  //   //   //   dispatch(setMessageState(setErrorMsg(error?.message)));
  //   //   // }
  //   // };
  //   if (!data) {
  //     getAllTransacations();
  //   }
  // }, []);

  const handleSelectRow = (record) => {
    setSelectedRowKey(record.id);
    dispatch(setSelectedRecord(record));
  };
  // const handleSelectRow = (record) => {
  //   // Check if trans_date exists and is a valid date
  //   if (record.trans_date) {
  //     // Create a new Date object from the trans_date
  //     const date = new Date(record.trans_date);

  //     // Format the date to "YYYY-MM-DD"
  //     const formattedDate = date.toISOString().split("T")[0];

  //     // Create a new record object with the formatted date
  //     const updatedRecord = { ...record, trans_date: "2024-08-27" };

  //     // Set the updated record and dispatch it
  //     setSelectedRowKey(updatedRecord.id);
  //     dispatch(setSelectedRecord(updatedRecord));
  //   } else {
  //     // If trans_date doesn't exist, just use the original record
  //     setSelectedRowKey(record.id);
  //     dispatch(setSelectedRecord(record));
  //   }
  // };

  // Load the columns from JSON and add the render function for the radio button column
  // useEffect(() => {
  //   dispatch(setSelectedForm(TransactionAddEditForm));
  // }, [dispatch]);
  const columns = columnsData.map((column) => {
    // if (column.dataIndex === "trans_date") {
    //   return {
    //     ...column,
    //     render: (text) => moment(text).format("DD MMM YYYY"), // Format date as DD MMM YYYY
    //   };
    // }
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
      {/* <TableComponent data={data} setData={setData} columns={columns} />
       */}
      {/* <HeaderComponent /> */}
      <ModelComponent
        data={data}
        columns={columns}
        FormCustomComponent={TransactionAddEditForm}
        deleteAction={delete_transaction}
        navigatePath="/transactions" // Path to navigate after delete
        refreshAction={() => dispatch(get_transactions())} // Action to refresh transactions
        moduleTitle={title}
      />
    </>
  );
};

export default Transactions;
