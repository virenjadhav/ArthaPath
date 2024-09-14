import React from "react";
import { Modal } from "antd";

export const ModelInfo = ({ title, content, okText, onOkHandler }) => {
  Modal.info({
    title: title ? title : "",
    content: content ? content : "",
    okText: okText ? okText : "",
    onOk: () => {
      console.log("Closed");
      onOkHandler();
    },
  });
};
