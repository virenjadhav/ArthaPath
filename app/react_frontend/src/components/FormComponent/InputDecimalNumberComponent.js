import React, { Component, useEffect, useRef } from "react";
import { Form, InputNumber, Input } from "antd";

const InputDecimalNumberComponent = ({
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
        value, // Pass the updated value back
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
        componentType: "formInputDecimal",
      });
    }

    // Cleanup function to remove component on unmount
    return () => {
      if (formComponentProps) {
        delete formComponentProps.current[name];
      }
    };
  }, [name, formComponentProps, customComponentProps, handleFormPropsChange]);

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
              precision={precision}
              min={min}
              max={max}
              onChange={handleComponentChange}
              style={{
                fontWeight: isBold ? "bold" : "normal", // Bold when isBold is true
                // fontSize: "24px", // Adjust font size as needed
              }}
            />
          )}
        </Form.Item>
      )}
    </>
  );
};

export default InputDecimalNumberComponent;

// import React, { useEffect, useRef } from "react";
// import { Form, InputNumber, Input } from "antd";

// const InputDecimalNumberComponent = ({
//   name,
//   label,
//   placeholder = "",
//   visible = true,
//   includeInLayout = true,
//   size = "default",
//   type = null,
//   onChangeHandler = null,
//   onPressEnterHandler = null,
//   autoFocus = null,
//   defaultValue = "",
//   onFocusHandler = null,
//   onhandleFocusOut = null,
//   loading = true,
//   readOnly = false,
//   handleSelect = null,
//   disabled = false,
//   addonBefore = null,
//   addonAfter = null,
//   prefix = null,
//   suffix = null,
//   allowClear = false,
//   maxLength = null,
//   removeFocus = null,
//   inputFocus = null,
//   rules = null,
//   step = 0.01,
//   max = null,
//   min = 0,
//   precision = 2,
//   controls = false,
//   stringMode = null,
//   bordered = null,
//   updateFlag = null,
//   componentType = "inputDecimalNumber", // Add componentType here
// }) => {
//   const inputRef = useRef(null);
//   useEffect(() => {
//     if (removeFocus) {
//       inputRef.current.blur();
//     }
//     if (inputFocus) {
//       inputRef.current.focus();
//     }
//     if (handleSelect) {
//       inputRef.current.select();
//     }
//   }, [removeFocus, inputFocus, handleSelect]);
//   return (
//     <>
//       {includeInLayout && (
//         <Form.Item
//           name={name}
//           label={label}
//           rules={rules}
//           data-component-type="decimalType" // Custom attribute
//         >
//           {visible && (
//             <InputNumber
//               ref={inputRef} // This allows us to control the input programmatically
//               onBlur={onhandleFocusOut}
//               disabled={disabled}
//               readOnly={readOnly}
//               placeholder={placeholder}
//               type={type}
//               onChange={onChangeHandler}
//               onPressEnter={onPressEnterHandler}
//               autoFocus={autoFocus}
//               defaultValue={defaultValue}
//               onFocus={onFocusHandler}
//               loading={loading}
//               addonBefore={addonBefore}
//               addonAfter={addonAfter}
//               prefix={prefix}
//               suffix={suffix}
//               allowClear={allowClear}
//               maxLength={maxLength}
//               // formatter={value => `¥ ${value}`}
//               // parser={value => value.replace('¥ ', '')}
//               bordered={bordered}
//               stringMode={stringMode}
//               controls={controls}
//               step={step}
//               precision={precision}
//               min={min}
//               max={max}
//               updateFlag={updateFlag}
//             />
//           )}
//           {/* <Input.Group compact>
//   <Input style={{ width: '20%' }} defaultValue="Prefix" />
//   <Input style={{ width: '80%' }} placeholder="Enter text" />
// </Input.Group> */}
//           {/* <Input.Search
//   placeholder="Search something"
//   enterButton
// /> */}
//           {/* Hidden input to store the component type */}
//         </Form.Item>
//       )}
//       <Form.Item
//         name={`${name}__componentType`} // Unique name to avoid conflicts
//         noStyle
//         rules={[]}
//       >
//         <Input type="hidden" value="decimalType" />
//       </Form.Item>
//     </>
//   );
// };

// export default InputDecimalNumberComponent;
