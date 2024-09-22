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

  return (
    <>
      {includeInLayout && (
        <Form.Item name={name} rules={rules}>
          {visible && (
            <Checkbox
              ref={checkboxRef}
              checked={checked}
              onChange={onChangeHandler}
              disabled={disabled}
              autoFocus={autoFocus}
              componentType="formSingleCheckbox"
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
