import React, { useEffect, useRef } from "react";
import { Form, Input } from "antd";

const InputComponent = ({
  name,
  label,
  placeholder = "",
  visible = true,
  includeInLayout = true,
  size = "default",
  type = null,
  onChangeHandler = null,
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
  stringMode = null,
  bordered = false,
  formComponentProps = null,
  handleFormPropsChange = null,
  customComponentProps = null,
  formStyle = null,
  style = null,
}) => {
  const inputRef = useRef(null);
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
  useEffect(() => {
    if (formComponentProps) {
      handleFormPropsChange(name, {
        ...customComponentProps,
        componentType: "formInput",
      });
    }

    // Cleanup function to remove component on unmount
    return () => {
      if (formComponentProps) {
        delete formComponentProps.current[name];
      }
    };
  }, [name, formComponentProps, customComponentProps, handleFormPropsChange]);
  const handleComponentChange = (value) => {
    if (handleFormPropsChange) {
      handleFormPropsChange(name, {
        ...customComponentProps,
        value, // Pass the updated value back
      });
    }
  };
  return (
    <>
      {includeInLayout && (
        <Form.Item name={name} label={label} rules={rules} style={formStyle}>
          {visible && (
            <Input
              ref={inputRef} // This allows us to control the input programmatically
              onBlur={onhandleFocusOut}
              disabled={disabled}
              readOnly={readOnly}
              placeholder={placeholder}
              type={type}
              onChange={handleComponentChange}
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
              stringMode={stringMode}
              style={style}
            />
          )}
          {/* <Input.Group compact>
  <Input style={{ width: '20%' }} defaultValue="Prefix" />
  <Input style={{ width: '80%' }} placeholder="Enter text" />
</Input.Group> */}
          {/* <Input.Search
  placeholder="Search something"
  enterButton
/> */}
        </Form.Item>
      )}
    </>
  );
};

export default InputComponent;
