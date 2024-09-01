import React from "react";
import { Table, Button, Space, Modal, Form, Input, Pagination } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setIsModelVisible } from "../redux/features/generic/modelSlice";

const ButtonComponent = () => {
  const dispatch = useDispatch();
  const handleDeleteButtonClick = () => {};
  const handleAddButtonClick = () => {
    dispatch(setIsModelVisible(true));
  };
  const handleEditButtonClick = () => {};
  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={handleAddButtonClick}
          icon={<PlusOutlined />}
          shape="circle"
          title="Add Transaction"
        />
        <Button
          danger
          onClick={handleDeleteButtonClick}
          icon={<DeleteOutlined />}
          shape="circle"
          title="Delete Transaction"
        />
        <Button
          onClick={handleEditButtonClick}
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
