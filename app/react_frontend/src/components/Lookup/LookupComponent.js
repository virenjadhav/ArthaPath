import React, { Component, useEffect, useRef, useState } from "react";
import { Form, InputNumber, Input } from "antd";
import LookupModel from "./LookupModel";
import { ReadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { validate_lookup_value } from "../../redux/features/generic/LookupApiThunk";
import {
  setErrorMsg,
  setResult,
} from "../../redux/features/generic/messageSlice";
import { setMessageState } from "../../redux/features/generic/genericSlice";
import { useValidateLookupRecordAction } from "../Services/CommonServices";
import { get_form } from "../FormComponent/FormAddEdit";
// import { form } from "../FormComponent/FormAddEdit";

const LookupComponent = ({
  name,
  label,
  dataField,
  labelField,
  dataSourceName,
  dataTag,
  labelTag,
  lookupFormatUrl,
  lookupService,
  filterKeyLabelName,
  filterKeyDataName,
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
  onChange = null,
  handleFormPropsChange = null,
  customComponentProps = null,
  validationFlag = false,
}) => {
  const inputRef = useRef(null);
  const [isLookupModelVisible, setIsLookupModelVisible] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const dispatch = useDispatch();
  const { validateLookupRecordAction } = useValidateLookupRecordAction();
  // const [dataValue, setDataValue] = useState(null);
  // const [labelValue, setLabelValue] = useState(null);
  const selectedRecord = useSelector((state) => state.model.selectedRecord);
  const isEditing = useSelector((state) => state.model.isEditing);
  const [savedInputValue, setSavedInputValue] = useState({});
  // const form = get_form();

  const handleLookupClick = (e) => {
    setIsLookupModelVisible(true);
  };

  const handleComponentChange = (value) => {
    const upperValue = value.target?.value?.toUpperCase();
    // if (handleFormPropsChange) {
    //   handleFormPropsChange(name, {
    //     ...customComponentProps,
    //     componentType: "formLookup",
    //     dataField: dataField,
    //     labelField: labelField,
    //     dataTag: dataTag,
    //     labelTag: labelTag,
    //     // value,
    //     upperValue,
    //   });
    // }
    // if (value) {
    // setInputValue(value.target.value);
    setInputValue(upperValue);
    // form.setFieldsValue({ [name]: upperValue });
    // }
    if (onChange) {
      onChange(upperValue);
    }
  };

  const handleOnBlur = (e, targetValue = null) => {
    let upperValue = null;
    if (e) {
      upperValue = e.target?.value?.toUpperCase();
    } else {
      upperValue = targetValue;
    }
    if (upperValue == null || upperValue === undefined || upperValue === "") {
      setSavedInputValue({ [dataTag]: null, [labelTag]: null });
    } else if (validationFlag && upperValue !== savedInputValue[labelTag]) {
      // handle validation
      validateLookup(upperValue);
    }
    // else if (

    // ) {

    //   // const customEvent = new CustomEvent("mainLookupChange", {
    //   //   detail: {
    //   //     lookupName: name,
    //   //     lookupDataValue: null,
    //   //     lookupLabelValue: null,
    //   //   },
    //   // });
    //   // window.dispatchEvent(customEvent);
    // }
    if (onhandleFocusOut) {
      onhandleFocusOut();
    }
  };
  const validateLookup = async (value) => {
    if (value) {
      try {
        // const response = await dispatch(
        //   validate_lookup_value({
        //     data: {
        //       value: value,
        //       filterKeyLabelName: filterKeyLabelName,
        //       filterKeyDataName: filterKeyDataName,
        //       lookupType: dataSourceName,
        //     },
        //   })
        // ).unwrap();
        const payload = {
          data: {
            value: value,
            filterKeyLabelName: filterKeyLabelName,
            filterKeyDataName: filterKeyDataName,
            lookupType: dataSourceName,
          },
        };
        await validateLookupRecordAction(
          payload,
          handleValidateLookupRecordHandler
        );
      } catch (error) {
        dispatch(setMessageState(setResult("error")));
        dispatch(setMessageState(setErrorMsg(`Error : ${error?.error}`)));
      }
    }
  };
  const handleValidateLookupRecordHandler = (response) => {
    let result = response?.result;
    let dataValue = response?.record?.[filterKeyDataName];
    let labelValue = response?.record?.[filterKeyLabelName];
    if (result == "error") {
      dispatch(setMessageState(setResult("error")));
      dispatch(setMessageState(setErrorMsg(`Error : ${response?.message}`)));
      setSavedInputValue({ [dataTag]: null, [labelTag]: null });
    } else {
      // handleFormPropsChange(name, {
      //   ...customComponentProps,
      //   dataValue: dataValue,
      //   labelValue: labelValue,
      // });
      setSavedInputValue({ [dataTag]: dataValue, [labelTag]: labelValue });
      // const customEvent = new CustomEvent("mainLookupChange", {
      //   detail: {
      //     lookupName: name,
      //     lookupDataValue: dataValue,
      //     lookupLabelValue: labelValue,
      //   },
      // });
      // window.dispatchEvent(customEvent);
    }
  };
  const handelSaveClickHandler = (record) => {
    // record
    let labelValue = null;
    let dataValue = null;
    if (labelField && record[labelField] !== undefined) {
      labelValue = record[labelField];
      // setLabelValue(labelValue);
      // setInputValue(labelValue);
    }
    if (dataField && record[dataField] !== undefined) {
      dataValue = record[dataField];
      // setDataValue(dataValue);
    }
    // setInputValue(labelValue);
    // form.setFieldsValue({ [name]: labelValue });

    if (validationFlag) {
      // check current value are valid or not
      // validateLookup(labelValue);
      handleOnBlur(null, labelValue);
    } else {
      // handleFormPropsChange(name, {
      //   ...customComponentProps,
      //   dataValue: dataValue,
      //   labelValue: labelValue,
      // });
      setSavedInputValue({ [dataTag]: dataValue, [labelTag]: labelValue });
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
  useEffect(() => {
    if (formComponentProps) {
      handleFormPropsChange(name, {
        ...customComponentProps,
        componentType: "formLookup",
        dataField: dataField,
        labelField: labelField,
        dataTag: dataTag,
        labelTag: labelTag,
        dataValue: null,
        labelValue: null,
      });
    }
    // Cleanup function to remove component on unmount
    return () => {
      if (formComponentProps) {
        delete formComponentProps.current[name];
      }
    };
  }, [name, formComponentProps, customComponentProps]);
  useEffect(() => {
    if (isEditing && selectedRecord) {
      const value = selectedRecord?.[labelTag];
      let labelValue = null;
      let dataValue = null;
      if (labelTag && selectedRecord[labelTag] !== undefined) {
        labelValue = selectedRecord[labelTag];
        // setLabelValue(labelValue);
        // setInputValue(labelValue);
      }
      if (dataTag && selectedRecord[dataTag] !== undefined) {
        dataValue = selectedRecord[dataTag];
        // setDataValue(dataValue);
      }
      if (inputValue !== value) {
        setSavedInputValue({
          [dataTag]: dataValue,
          [labelTag]: labelValue,
          formSaved: true,
        });
        // setInputValue(value);
        // form.setFieldsValue({ [name]: value });
        // handleFormPropsChange(name, {
        //   ...customComponentProps,
        //   dataValue: dataValue,
        //   labelValue: labelValue,
        // });
      }
    } else {
      // setInputValue(null);
      setSavedInputValue({
        [dataTag]: null,
        [labelTag]: null,
        formSaved: true,
      });
      // form.setFieldsValue({ [name]: null });
      // handleFormPropsChange(name, {
      //   ...customComponentProps,
      //   dataValue: null,
      //   labelValue: null,
      // });
    }
  }, [isEditing, selectedRecord]);
  // useEffect(() => {
  //   let error = [];
  //   if (form) {
  //     if (rules) {
  //       const [{ required, message }] = rules;
  //       if (required && !inputValue) {
  //         error = [message];
  //       } else {
  //         error = [];
  //       }
  //     }
  //     // form.setFieldsValue({ [name]: inputValue });
  //     form.setFields([
  //       {
  //         name: name,
  //         value: inputValue, // you can set a value or keep it the same
  //         // errors: [error], // clear any existing errors
  //         errors: error?.length > 0 ? error : null,
  //         // rules: [{ required: true, message: 'Updated: This field is now required!' }],
  //         rules: error?.length > 0 ? rules : null,
  //       },
  //     ]);
  //   }
  // }, [inputValue, form, rules]);

  useEffect(() => {
    if (savedInputValue) {
      let labelValue = savedInputValue[labelTag];
      let dataValue = savedInputValue[dataTag];
      let formSaved = savedInputValue?.formSaved;
      setInputValue(labelValue);
      if (handleFormPropsChange) {
        handleFormPropsChange(name, {
          ...customComponentProps,
          componentType: "formLookup",
          dataField: dataField,
          labelField: labelField,
          dataTag: dataTag,
          labelTag: labelTag,
          dataValue: dataValue,
          labelValue: labelValue,
        });
      }
      if (formSaved == undefined || formSaved == null) {
        const customEvent = new CustomEvent("mainLookupChange", {
          detail: {
            lookupName: name,
            lookupDataValue: dataValue,
            lookupLabelValue: labelValue,
          },
        });
        window.dispatchEvent(customEvent);
      }
    } else {
      setInputValue(null);
      if (handleFormPropsChange) {
        handleFormPropsChange(name, {
          ...customComponentProps,
          componentType: "formLookup",
          dataField: dataField,
          labelField: labelField,
          dataTag: dataTag,
          labelTag: labelTag,
          dataValue: null,
          labelValue: null,
        });
      }
      const customEvent = new CustomEvent("mainLookupChange", {
        detail: {
          lookupName: name,
          lookupDataValue: null,
          lookupLabelValue: null,
        },
      });
      window.dispatchEvent(customEvent);
    }
  }, [savedInputValue]);

  return (
    <>
      {includeInLayout && (
        <Form.Item name={name} label={label}>
          {visible && (
            <div>
              {/* <Input
                addonAfter={<ReadOutlined onClick={handleLookupClick} />}
              /> */}
              <LookupModel
                isLookupModalVisible={isLookupModelVisible}
                setIsLookupModalVisible={setIsLookupModelVisible}
                lookupService={lookupService}
                lookupFormatUrl={lookupFormatUrl}
                handelSaveClickHandler={handelSaveClickHandler}
                dataSourceName={dataSourceName}
                labelField={labelField}
                dataField={dataField}
                initialSearchValue={inputValue}
                filterKeyLabelName={filterKeyLabelName}
              />
              <Input
                ref={inputRef} // This allows us to control the input programmatically
                value={inputValue}
                onBlur={handleOnBlur}
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
                addonAfter={<ReadOutlined onClick={handleLookupClick} />}
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
              />
            </div>
          )}
        </Form.Item>
      )}
    </>
  );
  // return (
  //   <>
  //     {includeInLayout && (
  //       <Form.Item name={name} label={label} rules={rules}>
  //         {visible && (
  //           <Input
  //             ref={inputRef} // This allows us to control the input programmatically
  //             value={inputValue}
  //             onBlur={handleOnBlur}
  //             disabled={disabled}
  //             readOnly={readOnly}
  //             placeholder={placeholder}
  //             type={type}
  //             onPressEnter={onPressEnterHandler}
  //             autoFocus={autoFocus}
  //             defaultValue={defaultValue}
  //             onFocus={onFocusHandler}
  //             loading={loading}
  //             addonBefore={addonBefore}
  //             addonAfter={<ReadOutlined onClick={handleLookupClick} />}
  //             prefix={prefix}
  //             suffix={suffix}
  //             allowClear={allowClear}
  //             maxLength={maxLength}
  //             bordered={bordered}
  //             stringMode={stringMode}
  //             controls={controls}
  //             step={step}
  //             precision={precision}
  //             min={min}
  //             max={max}
  //             onChange={handleComponentChange}
  //           />
  //         )}
  //       </Form.Item>
  //     )}
  //   </>
  // );
};

export default LookupComponent;
