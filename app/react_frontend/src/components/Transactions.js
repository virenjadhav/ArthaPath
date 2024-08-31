import React, { useState } from "react";
import { Table, Button, Space, Modal, Form, Input } from "antd";
import TableComponent from "./TableComponent";

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
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      //   title: "Action",
      //   key: "action",
      //   render: (text, record) => (
      //     <Space size="middle">
      //       <Button onClick={() => showEditTransactionModal(record)}>Edit</Button>
      //       <Button danger onClick={() => handleDeleteTransaction(record.key)}>
      //         Delete
      //       </Button>
      //     </Space>
      //   ),
    },
  ];
  return (
    <>
      <TableComponent data={data} setData={setData} columns={columns} />
    </>
  );
};

export default Transactions;
