import React from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "../assets/css/ModelConfirm.css"; // Import CSS for custom styling

export const ModelConfirm = ({
  title,
  okText,
  okType,
  cancelText,
  onOkHandler,
  onCancelHandler,
  content,
}) => {
  Modal.confirm({
    title: title ? title : "",
    okText: okText ? okText : "Yes",
    okType: okType ? okType : "danger",
    content: content ? content : "",
    cancelText: cancelText ? cancelText : "No",
    icon: <ExclamationCircleOutlined />,
    onOk: onOkHandler,
    onCancel: onCancelHandler,
    okButtonProps: {
      style: { marginRight: "16px" }, // Add some margin to the right of the OK button
    },
    cancelButtonProps: {
      style: { marginLeft: "16px" }, // Add margin to the left of the Cancel button
    },
    className: "custom-confirm-modal", // Custom class for further styling
    // okCancel: true,
    // okButtonProps: {
    //   disabled: false, // Enable or disable the OK button
    //   loading: true, // Show loading spinner on the OK button
    //   type: "primary", // Set button type to 'primary'
    // },
    // cancelButtonProps: {
    //   disabled: true, // Disable the Cancel button
    //   type: "default", // Set button type to 'default'
    // },
  });
};

// Common Properties for Modal.confirm() and Modal.info()
// title: ReactNode
// The title of the modal.

// content: ReactNode
// The content displayed inside the modal.

// okText: string
// The text for the "OK" button.

// okType: string
// The type of the "OK" button. Default is primary, but it can be changed to other button types like danger.

// cancelText: string
// The text for the "Cancel" button.

// icon: ReactNode
// Custom icon for the modal (e.g., <ExclamationCircleOutlined />).

// onOk: function
// Callback function triggered when the "OK" button is clicked.

// onCancel: function
// Callback function triggered when the "Cancel" button is clicked or the modal is closed.

// closable: boolean
// Whether the modal can be closed by clicking the close icon. Default is true.

// okButtonProps: ButtonProps
// Props for the "OK" button.

// cancelButtonProps: ButtonProps
// Props for the "Cancel" button.

// className: string
// Custom class name for the modal.

// width: number | string
// Width of the modal dialog.

// zIndex: number
// The z-index of the modal.

// mask: boolean
// Whether to show the mask behind the modal. Default is true.

// maskClosable: boolean
// Whether the modal can be closed by clicking the mask. Default is false.

// keyboard: boolean
// Whether to close the modal when pressing the Esc key. Default is true.

// getContainer: HTMLElement | () => HTMLElement | false
// Specifies the DOM node where the modal will be rendered. If false, it will be rendered directly into the body.

// afterClose: function
// A function that will be executed after the modal is completely closed.

// centered: boolean
// Whether the modal should be centered vertically on the screen. Default is false.

// style: React.CSSProperties
// Custom style for the modal.

// maskStyle: React.CSSProperties
// Custom style for the mask layer.

// bodyStyle: React.CSSProperties
// Custom style for the modal body.

// destroyOnClose: boolean
// Whether the modal content should be destroyed when it is closed. Default is false.

// Additional Properties for Modal.confirm()
// okCancel: boolean
// If set to false, the Cancel button will not be shown. Default is true.

// type: string
// The type of modal. Can be set to 'confirm', 'info', 'success', 'error', or 'warning'.

// Example Properties for okButtonProps and cancelButtonProps
// Here are some common props you can pass into okButtonProps and cancelButtonProps:

// disabled: boolean
// Disable the button when set to true.

// loading: boolean
// Show a loading spinner on the button when set to true.

// type: string
// Set the type of the button. Common values are primary, danger, default, etc.

// size: string
// Set the size of the button. Common values are small, middle, and large.

// className: string
// Add custom CSS classes to the button.

// style: React.CSSProperties
// Add custom inline styles to the button.

// icon: ReactNode
// Add an icon to the button.

// onClick: function
// Handle a custom click event for the button.
