import React, { useState } from "react";
import ModelComponent from "../../components/ModelComponent";
import HeaderComponent from "../../components/Header";
import columnsData from "./TransactionColumns.json";
// import './styles.css'; // Import the custom CSS

const Transactions = () => {
  const [data, setData] = useState([
    {
      key: "1",
      name: "Transaction 1",
      amount: "$100",
      date: "2024-08-27",
    },
    {
      key: "2",
      name: "Transaction 2",
      amount: "$200",
      date: "2024-08-26",
    },
    {
      key: "3",
      name: "Transaction 3",
      amount: "$300",
      date: "2024-08-25",
    },
  ]);
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
  const handleSelectRow = (record) => {
    setSelectedRowKey(record.key);
  };
  // Load the columns from JSON and add the render function for the radio button column
  const columns = columnsData.map(column => {
    if (column.dataIndex === 'radio') {
      return {
        ...column,
        className: 'radio-button-column', // Apply the CSS class
        render: (_, record) => (
          <input
            type="radio"
            checked={record.key === selectedRowKey}
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
       <HeaderComponent />
       <ModelComponent data={data} setData={setData} columns={columns} />
    </>
  );
};

export default Transactions;
