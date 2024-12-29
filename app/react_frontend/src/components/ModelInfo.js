import React from "react";
import { Modal } from "antd";

export const ModelInfo = ({ title, content, okText, onOkHandler = null }) => {
  Modal.info({
    title: title ? title : "",
    content: content ? content : "",
    okText: okText ? okText : "",
    onOk: () => {
      if (onOkHandler) {
        onOkHandler();
      } else {
        // modal.destroy();
        defaultOkClickHandler();
      }
    },
  });
};
const defaultOkClickHandler = () => {
  // console.log("defaultOkClickHandler")
};
