import React, { useEffect, useRef } from "react";
import { Form, Checkbox } from "antd";

const SingleCheckboxComponent = ({
  name,
  label,
  checked = false,
  visible = true,
  includeInLayout = true,
  onChangeHandler = null,
  disabled = false,
  autoFocus = null,
  inputFocus = null,
  removeFocus = null,
  onFocusHandler = null,
  onBlurHandler = null,
  rules = null,
  formComponentProps = null,
  handleFormPropsChange = null,
  customComponentProps = null,
}) => {
  const checkboxRef = useRef(null);

  useEffect(() => {
    if (removeFocus) {
      checkboxRef.current.blur();
    }
    if (inputFocus) {
      checkboxRef.current.focus();
    }
  }, [removeFocus, inputFocus]);
  useEffect(() => {
    // Add this component to the formComponentProps on mount
    if (formComponentProps) {
      // formComponentProps.current[name] = { componentType: "formInput" }; // Add componentType
      handleFormPropsChange(name, {
        ...customComponentProps,
        componentType: "formSingleCheckbox",
      });
    }

    // Cleanup function to remove component on unmount
    return () => {
      if (formComponentProps) {
        delete formComponentProps.current[name];
      }
    };
  }, [name, formComponentProps]);
  const handleComponentChange = (e) => {
    handleFormPropsChange(name, {
      ...customComponentProps,
    });
  };

  return (
    <>
      {includeInLayout && (
        <Form.Item name={name} rules={rules}>
          {visible && (
            <Checkbox
              ref={checkboxRef}
              checked={checked}
              onChange={handleComponentChange}
              disabled={disabled}
              autoFocus={autoFocus}
            >
              {label}
            </Checkbox>
          )}
        </Form.Item>
      )}
    </>
  );
};

export default SingleCheckboxComponent;
