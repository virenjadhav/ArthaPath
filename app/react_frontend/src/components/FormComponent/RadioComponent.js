import React, { useEffect } from "react";
import { Radio, Form } from "antd";

export const handleRadioItemClickHandler = (value) => {
  return value;
};

const RadioComponent = ({
  name,
  label,
  options,
  includeInLayout = true,
  visible = true,
  rules = [],
  defaultValue = "",
  buttonStyle = "outline",
  disableRadioGroup = null,
  onRadioGroupChangeHandler = null,

  handelRadioGroupChangeHandler = null,
  optionType = null,
  direction = "vertical",
  valuePropName = "value",
  formComponentProps = null,
  handleFormPropsChange = null,
  customComponentProps = null,
}) => {
  // const options = [
  //   { label: 'Option A', value: 'a' },
  //   { label: 'Option B', value: 'b' },
  //   { label: 'Option C', value: 'c'},
  // ];
  useEffect(() => {
    // Add this component to the formComponentProps on mount
    if (formComponentProps) {
      // formComponentProps.current[name] = { componentType: "formInput" }; // Add componentType
      handleFormPropsChange(name, {
        ...customComponentProps,
        componentType: "formRadio",
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
        <Form.Item
          name={name}
          label={label}
          rules={rules}
          valuePropName={valuePropName} // Set this to bind the form value with the radio component
        >
          <Radio.Group
            defaultValue={defaultValue}
            buttonStyle={buttonStyle}
            disabled={disableRadioGroup}
            onClick={onRadioGroupChangeHandler}
            onChange={handleComponentChange}
            //  direction="horizontal" // Use 'direction' for vertical alignment
            //  optionType="button" // Optional: Makes buttons look like actual buttons
            style={
              direction == "horizontal"
                ? { display: "flex", flexDirection: "row" }
                : null
            }
            optionType={optionType}
            componentType="formRadio"
          >
            {visible &&
              options?.map((option) => (
                <Radio
                  key={option.key ? option.key : option.value}
                  value={option.value}
                  disabled={option.disabled}
                  onClick={() => handleRadioItemClickHandler(option.value)}
                  data-custom={option.customProp} // Custom data attribute
                  // const customData = e.target.getAttribute('data-custom');
                >
                  {option.label}
                </Radio>
              ))}
          </Radio.Group>
        </Form.Item>
      )}
    </>
  );
};

export default RadioComponent;
