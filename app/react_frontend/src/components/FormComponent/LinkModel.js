import React, { useEffect, useState } from "react";
import ButtonComponent from "./ButtonComponent";
import LinkModelAddEdit from "./LinkModelAddEdit";
import { Tag } from "antd";
import FormItemLabel from "antd/es/form/FormItemLabel";

const LinkModel = ({ label }) => {
  const [isModelVisible, setIsModelVisible] = useState(false);

  const handleButtonClick = () => {
    setIsModelVisible(!isModelVisible);
  };
  return (
    <>
      <a onClick={handleButtonClick}>{label}</a>
      <LinkModelAddEdit
        isModelVisible={isModelVisible}
        setIsModelVisible={setIsModelVisible}
      />
    </>
  );
};

export default LinkModel;
