import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal, Form, Input, Pagination } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

import ButtonComponent from "./ButtonsAddEditComponent";
import "./styles.css";
import { useSelector } from "react-redux";

const TableComponent = ({ data, columns }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [form] = Form.useForm(); // Initialize form instance
  const [selectedRowKey, setSelectedRowKey] = useState(1);
  // State for paginated data
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
  const [pageSize, setPageSize] = useState(5); // Rows per page
  // const [currentData, setCurrentData] = useState(data.slice(0, pageSize)); // Initial data to show
  const [currentData, setCurrentData] = useState(null); // Initial data to show
  const [tableHeight, setTableHeight] = useState(200);

  useEffect(() => {
    if (data) {
      setCurrentData(data.slice(0, pageSize));
    }
  }, [data]);

  useEffect(() => {
    setTableHeight(pageSize * 80);
  }, [pageSize]);

  // Handle pagination change
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    setCurrentData(data.slice(start, end)); // Slice the data for the current page
  };

  // const handleChangePage = (page, pageSize) => {
  //   setCurrentPage(page);
  //   setPageSize(pageSize);
  // };

  // const fetchData = async (page, pageSize) => {
  //   const response = await fetch(`/api/data?page=${page}&pageSize=${pageSize}`);
  //   const result = await response.json();
  //   setData(result.data);
  // };

  // const handleChangePage = (page, pageSize) => {
  //   setCurrentPage(page);
  //   setPageSize(pageSize);
  //   fetchData(page, pageSize);
  // };

  const showAddTransactionModal = () => {
    setEditingTransaction(null);
    form.resetFields(); // Clear the form fields
    setIsModalVisible(true);
  };

  const showEditTransactionModal = (record) => {
    setEditingTransaction(record);
    form.setFieldsValue(record); // Populate the form with the record's data
    setIsModalVisible(true);
  };

  const handleDeleteTransaction = (key) => {
    // setData(data.filter((item) => item.key !== key));
  };

  const handleModalOk = (values) => {
    if (editingTransaction) {
      // setData(
      //   data.map((item) =>
      //     item.key === editingTransaction.key ? { ...item, ...values } : item
      //   )
      // );
    } else {
      // setData([
      //   ...data,
      //   { ...values, key: Date.now().toString() }, // Generating a unique key
      // ]);
    }
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const showDeleteTransactionModal = () => {};
  const handleSelectRow = (record) => {
    setSelectedRowKey(record.key);
  };

  return (
    <div
      style={{
        border: "1px solid lightgray", // Light gray border
        // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Shadow effect
        borderRadius: "4px", // Optional: rounded corners
        backgroundColor: "#fff", // Optional: background color to ensure table visibility
      }}
    >
      {/* <Space style={{ marginBottom: 16 }}>
        
        <Button
          type="primary"
          onClick={showAddTransactionModal}
          icon={<PlusOutlined />}
          shape="circle"
          title="Add Transaction"
        />
        <Button
          danger
          onClick={showDeleteTransactionModal}
          icon={<DeleteOutlined />}
          shape="circle"
          title="Delete Transaction"
        />
        <Button
          onClick={showEditTransactionModal}
          icon={<EditOutlined />}
          shape="circle"
          title="Edit Transaction"
        />
      </Space> */}
      {/* <div className="buttons">
        <ButtonComponent />
      </div> */}

      {/* <Table columns={columns} dataSource={data} pagination={false} /> */}
      {/* <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowClassName={(record) =>
          record.key === selectedRowKey ? "selected-row" : ""
        }
      /> */}

      {/* Display paginated data in the table */}
      <Table
        columns={columns}
        dataSource={currentData}
        pagination={false} // Disable internal pagination of the Table component
        rowKey="id" // Unique key for each row
        // scroll={{ y: tableHeight }} // Set fixed height for the table's body (adjust height as needed)
        style={{
          minHeight: tableHeight - pageSize * 20,
          overflowY: "auto", // Allow scrolling if the content exceeds maxHeight
        }}
      />
      {/* Pagination component */}
      {/* <Pagination
        current={currentPage} // Current page
        pageSize={pageSize} // Rows per page
        total={data?.length} // Total number of items
        showSizeChanger // Option to change the page size
        onChange={handlePageChange} // Handle page change
        pageSizeOptions={["5", "10"]} // Custom options for page size
      /> */}
      {/* Pagination and total records footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px",
        }}
      >
        <span>{`Total Records: ${data ? data.length : 0}`}</span>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data?.length}
          showSizeChanger
          onChange={handlePageChange}
          pageSizeOptions={["5", "10"]}
        />
      </div>
      {/* <Modal
        title={editingTransaction ? "Edit Transaction" : "Add Transaction"}
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form
          form={form}
          initialValues={editingTransaction || {}}
          onFinish={handleModalOk}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Please input the amount!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please input the date!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingTransaction ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal> */}
    </div>
  );
};

export default TableComponent;

// ALL Column Field
// const columns = [
//   {
//     title: "Name",
//     dataIndex: "name",
//     key: "name",
//     width: 200,
//     align: "left",
//     ellipsis: true,
//     sorter: (a, b) => a.name.localeCompare(b.name),
//     className: "name-column",
//     onCell: (record) => ({
//       style: { color: record.name === "Transaction 1" ? "red" : "black" }
//     }),
//   },
//   {
//     title: "Amount",
//     dataIndex: "amount",
//     key: "amount",
//     width: 150,
//     align: "right",
//     filters: [
//       { text: '$100', value: 100 },
//       { text: '$200', value: 200 }
//     ],
//     onFilter: (value, record) => record.amount.indexOf(value) === 0,
//     render: (text, record) => <b>{text}</b>,
//   },
//   {
//     title: "Date",
//     dataIndex: "date",
//     key: "date",
//     width: 150,
//     align: "center",
//     sorter: (a, b) => new Date(a.date) - new Date(b.date),
//     defaultSortOrder: 'descend',
//   },
//   {
//     title: "Action",
//     key: "action",
//     fixed: "right",
//     width: 150,
//     render: (text, record) => (
//       <Space size="middle">
//         <Button>Edit</Button>
//         <Button danger>Delete</Button>
//       </Space>
//     ),
//   },
// ];
