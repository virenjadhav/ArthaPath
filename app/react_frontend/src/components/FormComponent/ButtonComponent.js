import React from "react";
import { Form, Button } from "antd";
import { useSelector } from "react-redux";

const ButtonComponent = ({ label, type = "primary" }) => {
  return (
    <>
      <Form.Item>
        <Button type={type} htmlType="submit">
          {label}
        </Button>
      </Form.Item>
    </>
  );
};

export default ButtonComponent;
