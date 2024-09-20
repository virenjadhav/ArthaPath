import React from "react";
import { Form, Input } from "antd";

const InputComponent = ({ name, label, disabled }) => {
  return (
    <>
      <Form.Item name={name} label={label}>
        <Input />
      </Form.Item>
    </>
  );
};

export default InputComponent;
