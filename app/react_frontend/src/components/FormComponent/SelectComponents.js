import React, { useEffect, useRef } from "react";
import { Form, Select } from "antd";

const { Option } = Select;

const SelectComponent = ({
  name, 
  label, 
  options = [],  // Array of options
  placeholder = "", 
  visible = true, 
  includeInLayout = true,
  size = "default", 
  onChangeHandler = null, 
  onFocusHandler = null, 
  onBlurHandler = null, 
  autoFocus = null, 
  defaultValue = "", 
  disabled = false, 
  allowClear = false, 
  loading = false, 
  mode = null, // single or multiple select
  maxTagCount = null, // Limit tags display in multiple mode
  dropdownClassName = "", // Custom class for dropdown
  bordered = true,
  inputFocus = null, 
  removeFocus = null, 
  handleSelect = null, 
  rules = null 
}) => {
  const selectRef = useRef(null);

  useEffect(() => {
    if (removeFocus) {
      selectRef.current.blur();
    }
    if (inputFocus) {
      selectRef.current.focus();
    }
    if (handleSelect) {
      selectRef.current.select();
    }
  }, [removeFocus, inputFocus, handleSelect]);

  return (
    <>
      {includeInLayout && (
        <Form.Item name={name} label={label} rules={rules}>
          {visible && (
            <Select
              ref={selectRef}
              disabled={disabled}
              placeholder={placeholder}
              size={size}
              autoFocus={autoFocus}
              defaultValue={defaultValue}
              onChange={onChangeHandler}
              onFocus={onFocusHandler}
              onBlur={onBlurHandler}
              allowClear={allowClear}
              loading={loading}
              mode={mode} // Supports 'multiple' or 'tags'
              maxTagCount={maxTagCount}
              dropdownClassName={dropdownClassName}
              bordered={bordered}
              componentType="formSelect"
            >
              {options.map((option, index) => (
                <Option key={index} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
      )}
    </>
  );
};

export default SelectComponent;
// Explanation of Properties:
// options: An array of objects representing the dropdown options, where each option has value and label keys.
// placeholder: Text displayed when nothing is selected.
// disabled: Disable the dropdown selection.
// allowClear: Whether to allow clearing the selected value(s).
// loading: Show a loading spinner while options are being fetched.
// mode: Can be multiple for multi-selection or tags for tag input.
// maxTagCount: Limits the number of visible tags in multiple or tags mode.
// dropdownClassName: A custom class for styling the dropdown list.
// bordered: Whether the select input should have a border.
// onChangeHandler, onFocusHandler, onBlurHandler: Event handlers for changing, focusing, and blurring the select input.
// autoFocus: Automatically focus the select input when mounted.