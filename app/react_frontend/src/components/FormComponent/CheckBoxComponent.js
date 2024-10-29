import React, { useEffect, useRef } from "react";
import { Form, Checkbox } from "antd";

const CheckBoxComponent = ({
  name,
  label,
  options = [], // For multiple checkboxes
  visible = true,
  includeInLayout = true,
  onChangeHandler = null,
  defaultValue = [], // Default checked values
  disabled = false,
  indeterminate = false, // To indicate partially checked state
  autoFocus = null,
  inputFocus = null,
  removeFocus = null,
  onFocusHandler = null,
  onBlurHandler = null,
  rules = null,
  layout = "vertical", // Layout control for horizontal or vertical alignment,
  formComponentProps = null,
  handleFormPropsChange = null,
  customComponentProps = null,
}) => {
  const checkboxRef = useRef(null);
  // Conditional styles based on layout prop
  const checkboxLayoutStyle =
    layout === "horizontal" ? { display: "flex", flexDirection: "row" } : {};

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
        componentType: "formCheckbox",
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
        <Form.Item name={name} label={label} rules={rules}>
          {visible && (
            <Checkbox.Group
              ref={checkboxRef}
              options={options}
              defaultValue={defaultValue}
              onChange={handleComponentChange}
              disabled={disabled}
              style={checkboxLayoutStyle} // Apply layout styling
            />
          )}
        </Form.Item>
      )}
    </>
  );
};

export default CheckBoxComponent;

// Explanation of Properties:
// options: Array of checkbox options, each having a label and value.
// defaultValue: Default values that should be checked when the component is first rendered.
// disabled: Disable all checkboxes in the group.
// indeterminate: Indicates a partially checked state.
// onChangeHandler: Event handler for when the checked state changes.
// onFocusHandler, onBlurHandler: Handlers for focus and blur events.
// autoFocus: Automatically focuses the checkbox on mount.
// inputFocus and removeFocus: These control programmatic focus/blur for the checkbox group.
