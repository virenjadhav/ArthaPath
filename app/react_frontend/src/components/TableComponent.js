import React, { useState } from "react";
import { Table, Button, Space, Modal, Form, Input, Pagination } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

import ButtonComponent from "./ButtonComponent";

const TableComponent = ({ data, columns, setData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [form] = Form.useForm(); // Initialize form instance
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleChangePage = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

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
    setData(data.filter((item) => item.key !== key));
  };

  const handleModalOk = (values) => {
    if (editingTransaction) {
      setData(
        data.map((item) =>
          item.key === editingTransaction.key ? { ...item, ...values } : item
        )
      );
    } else {
      setData([
        ...data,
        { ...values, key: Date.now().toString() }, // Generating a unique key
      ]);
    }
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const showDeleteTransactionModal = () => {};

  return (
    <div>
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
      <div className="buttons">
        <ButtonComponent />
      </div>

      <Table columns={columns} dataSource={data} pagination={false} />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={data.length} // Update this if you have a large dataset
        onChange={handleChangePage}
        showSizeChanger
        onShowSizeChange={(current, size) => setPageSize(size)}
      />

      <Modal
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
      </Modal>
    </div>
  );
};

export default TableComponent;
