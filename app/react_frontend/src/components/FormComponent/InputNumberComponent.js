import React, { Component, useEffect, useRef } from "react";
import { Form, InputNumber, Input } from "antd";

const InputNumberComponent = ({
  name,
  label,
  placeholder = "",
  visible = true,
  includeInLayout = true,
  size = "default",
  type = null,
  onPressEnterHandler = null,
  autoFocus = null,
  defaultValue = "",
  onFocusHandler = null,
  onhandleFocusOut = null,
  loading = true,
  readOnly = false,
  handleSelect = null,
  disabled = false,
  addonBefore = null,
  addonAfter = null,
  prefix = null,
  suffix = null,
  allowClear = false,
  maxLength = null,
  removeFocus = null,
  inputFocus = null,
  rules = null,
  step = 0.01,
  max = null,
  min = 0,
  precision = 2,
  controls = false,
  stringMode = null,
  bordered = null,
  formComponentProps = null,
  onChangeHandler = null,
  handleFormPropsChange = null,
  customComponentProps = null,
  isBold = false,
}) => {
  const inputRef = useRef(null);
  // const handleComponentChange = (e) => {
  //   handleFormPropsChange(name, {
  //     ...customComponentProps,
  //   });
  // };
  // Handle change inside the component
  const handleComponentChange = (value) => {
    if (handleFormPropsChange) {
      handleFormPropsChange(name, {
        ...customComponentProps,
        value,
      });
    }
    if (onChangeHandler) {
      onChangeHandler(value);
    }
  };

  useEffect(() => {
    if (removeFocus) {
      inputRef.current.blur();
    }
    if (inputFocus) {
      inputRef.current.focus();
    }
    if (handleSelect) {
      inputRef.current.select();
    }
  }, [removeFocus, inputFocus, handleSelect]);

  // useEffect(() => {
  //   // Add this component to the formComponentProps on mount
  //   if (formComponentProps) {
  //     // formComponentProps.current[name] = { componentType: "formInput" }; // Add componentType
  //     handleFormPropsChange(name, {
  //       ...customComponentProps,
  //       componentType: "formInputDecimal",
  //     });
  //   }

  //   // Cleanup function to remove component on unmount
  //   return () => {
  //     if (formComponentProps) {
  //       delete formComponentProps.current[name];
  //     }
  //   };
  // }, [name, formComponentProps]);

  // useEffect(() => {
  //   if (formComponentProps) {
  //     handleFormPropsChange(name, { componentType: "formInputDecimal" });
  //   }
  //   return () => {
  //     if (formComponentProps) delete formComponentProps.current[name];
  //   };
  // }, [name, formComponentProps]);
  // Ensure the form field props are set up on mount
  useEffect(() => {
    if (formComponentProps) {
      handleFormPropsChange(name, {
        ...customComponentProps,
        componentType: "formInputNumber",
      });
    }

    // Cleanup function to remove component on unmount
    return () => {
      if (formComponentProps) {
        delete formComponentProps.current[name];
      }
    };
  }, [name, formComponentProps, customComponentProps, handleFormPropsChange]);
  // Handler to restrict input length
  const handleInputChange = (value) => {
    if (value && maxLength && value.toString().length > maxLength) {
      return;
    }
    // if (onChange) {
    handleComponentChange(value);
    // }
  };
  // Prevent non-numeric keys except navigation keys
  const handleKeyDown = (e) => {
    if (
      !(
        (
          e.key.match(/^[0-9]$/) || // Allow numeric keys
          ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Enter"].includes(
            e.key
          )
        ) // Allow navigation keys
      )
    ) {
      e.preventDefault();
    }
  };

  return (
    <>
      {includeInLayout && (
        <Form.Item name={name} label={label} rules={rules}>
          {visible && (
            <InputNumber
              ref={inputRef} // This allows us to control the input programmatically
              onBlur={onhandleFocusOut}
              disabled={disabled}
              readOnly={readOnly}
              placeholder={placeholder}
              type={type}
              onPressEnter={onPressEnterHandler}
              autoFocus={autoFocus}
              defaultValue={defaultValue}
              onFocus={onFocusHandler}
              loading={loading}
              addonBefore={addonBefore}
              addonAfter={addonAfter}
              prefix={prefix}
              suffix={suffix}
              allowClear={allowClear}
              maxLength={maxLength}
              bordered={bordered}
              stringMode={stringMode}
              controls={controls}
              step={step}
              precision={0}
              min={0}
              max={max}
              onChange={handleInputChange}
              style={{
                width: "100%",
                fontWeight: isBold ? "bold" : "normal", // Bold when isBold is true
                // fontSize: "24px", // Adjust font size as needed
              }}
              onKeyDown={handleKeyDown}
            />
          )}
        </Form.Item>
      )}
    </>
  );
};

export default InputNumberComponent;
