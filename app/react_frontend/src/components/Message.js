import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message as antdMessage } from "antd";
// import { clearMessage } from "../redux/features/generic/messageSlice"; // Adjust the path as needed
import {
  setMessageClearMsg,
  setMessageState,
} from "../redux/features/generic/genericSlice";
import { clearMessage } from "../redux/features/generic/messageSlice";

const Message = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.generic); // Access nested message state

  const { result, successMsg, errorMsg, warningMsg, time } = message || {};

  useEffect(() => {
    if (!message) return; // If there's no message, do nothing

    const { result, successMsg, errorMsg, warningMsg, time } = message;

    if (result === "success") {
      antdMessage.success(successMsg, time);
    } else if (result === "error") {
      antdMessage.error(errorMsg, time);
    } else if (result === "warning") {
      antdMessage.warning(warningMsg, time);
    }

    const timer = setTimeout(() => {
      //   dispatch(clearMessage()); // Clear the message after the specified time
      //   dispatch(setMessageClearMsg());
      dispatch(setMessageState(clearMessage())); // Clear message after displaying
    }, time * 1000); // Convert seconds to milliseconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [message, dispatch]);

  return null; // This component does not render anything directly
};

export default Message;
