import React from "react";
import { Table, Button, Space, Modal, Form, Input, Pagination } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

const ButtonComponent = () => {
  const showDeleteTransactionModal = () => {};
  const showAddTransactionModal = () => {};
  const showEditTransactionModal = () => {};
  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        {/* <Button type="primary" onClick={showAddTransactionModal}>
          Add Transaction
        </Button> */}
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
        {/* Add more buttons if needed */}
      </Space>
    </>
  );
};

export default ButtonComponent;
