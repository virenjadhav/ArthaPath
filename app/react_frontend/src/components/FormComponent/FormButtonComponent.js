import React from "react";
import { Form, Button } from "antd";
import { useSelector } from "react-redux";

const FormButtonComponent = ({ type = "primary", editForm = false }) => {
  return (
    <>
      <Form.Item>
        <Button type={type} htmlType="submit">
          {editForm ? "Update" : "Add"}
        </Button>
      </Form.Item>
    </>
  );
};

export default FormButtonComponent;
