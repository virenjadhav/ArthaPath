import React, { useState } from "react";
import { Form, Input } from "antd";
import { ReadOutlined } from "@ant-design/icons";
import LookupModel from "./LookupModel";

const Lookup = ({ id, label, required, requiredMsg }) => {
  const [isLookupModelVisible, setIsLookupModelVisible] = useState(false);
  const handleLookupClick = (e) => {
    setIsLookupModelVisible(true);
  };

  return (
    <Form.Item
      name={id}
      label={label}
      rules={[{ required: required, message: requiredMsg }]}
    >
      {/* <Input suffix={<SearchOutlined onClick={handleLookupClick} />} /> */}
      <Input addonAfter={<ReadOutlined onClick={handleLookupClick} />} />
      <LookupModel
        isLookupModalVisible={isLookupModelVisible}
        setIsLookupModalVisible={setIsLookupModelVisible}
      />
    </Form.Item>
  );
};

export default Lookup;
