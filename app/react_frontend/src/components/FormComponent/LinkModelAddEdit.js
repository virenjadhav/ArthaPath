import { Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import DependentLookupComponent from "../Lookup/DependentLookupComponent";
import LookupComponent from "../Lookup/LookupComponent";
import { useForm } from "antd/es/form/Form";

const LinkModelAddEdit = ({ isModelVisible, setIsModelVisible }) => {
  const [form] = useForm();
  const handleCancelModelClickHandler = () => {
    setIsModelVisible(false);
  };
  const addModules = () => {
    return (
      <>
        ------------------------------------------------------------------------------------
        <Form.Item>
          <Input></Input>
        </Form.Item>
        ------------------------------------------------------------------------------------
      </>
    );
  };
  return (
    <>
      <Modal
        title="Model"
        visible={isModelVisible}
        onCancel={handleCancelModelClickHandler}
        footer={null}
      >
        {addModules()}
        <Input />
      </Modal>
    </>
  );
};

export default LinkModelAddEdit;
