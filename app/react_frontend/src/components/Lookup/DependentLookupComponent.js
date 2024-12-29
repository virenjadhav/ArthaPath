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
// import { get_form } from "../FormComponent/FormAddEdit";
// import { form } from "../FormComponent/FormAddEdit";

const DependentLookupComponent = ({
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
  mainLookupValueProp,
  mainLookupName,
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
  form = null,
}) => {
  const inputRef = useRef(null);
  const [isLookupModelVisible, setIsLookupModelVisible] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const dispatch = useDispatch();
  const { validateLookupRecordAction } = useValidateLookupRecordAction();
  // const [dataValue, setDataValue] = useState(null);
  // const [labelValue, setLabelValue] = useState(null);
  const selectedRecord = useSelector((state) => state.model.selectedRecord);
  const [mainLookupValue, setMainLookupValue] = useState(mainLookupValueProp); // Define state
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
    //     // value,
    //     upperValue,
    //   });
    // }
    if (value) {
      // setInputValue(value.target.value);
      setInputValue(upperValue);
      // form.setFieldsValue({ [name]: upperValue });
    }
  };

  // const handleOnBlur = () => {
  //   if (validationFlag) {
  //     // handle validation
  //     validateLookup(inputValue);
  //   }
  //   if (onhandleFocusOut) {
  //     onhandleFocusOut();
  //   }
  // };
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
    // if (validationFlag && upperValue !== savedInputValue[labelTag]) {
    //   // handle validation
    //   validateLookup(upperValue);
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
        if (mainLookupName) {
          if (mainLookupValue) {
            // #nothing
          } else {
            dispatch(setResult("Error"));
            dispatch(
              setErrorMsg(
                "Please Select Value of main Lookup for Dependent Lookup!"
              )
            );
          }
        } else {
          dispatch(setResult("Error"));
          dispatch(setErrorMsg("Main Lookup not found!"));
        }
        const payload = {
          data: {
            value: value,
            filterKeyLabelName: filterKeyLabelName,
            filterKeyDataName: filterKeyDataName,
            lookupType: dataSourceName,
            dependentLookup: true,
            mainLookupName: mainLookupName,
            mainLookupValue: mainLookupValue,
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
    }
  };
  const handelSaveClickHandler = (record) => {
    // record
    let labelValue = null;
    let dataValue = null;
    if (labelField && record[labelField] !== undefined) {
      labelValue = record[labelField];
      // setLabelValue(labelValue);
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
    // When the main lookup value changes, reset the dependent lookup to null
    // if (
    //   mainLookupName == undefined ||
    //   mainLookupName == null ||
    //   mainLookupValue === null ||
    //   mainLookupValue === undefined ||
    //   mainLookupValue === ""
    // ) {
    setInputValue(null);
    // form.setFieldsValue({ [name]: null });
    // }
  }, [mainLookupValue, mainLookupName]);
  const handleMainLookupChange = (event) => {
    const { lookupName, lookupDataValue, lookupLabelValue } = event?.detail;
    if (mainLookupName === lookupName && lookupDataValue !== mainLookupValue) {
      // mainLookupValue = lookupLabelValue;
      setMainLookupValue(lookupLabelValue);
      setSavedInputValue({ [dataTag]: null, [labelTag]: null });
    }
  };
  useEffect(() => {
    window.addEventListener("mainLookupChange", handleMainLookupChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      // window.removeEventListener("mainLookupChange", handleMainLookupChange);
    };
  }, [mainLookupValue]);
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
        // setInputValue(value);
        // form.setFieldsValue({ [name]: value });
        // handleFormPropsChange(name, {
        //   ...customComponentProps,
        //   dataValue: dataValue,
        //   labelValue: labelValue,
        // });
        setSavedInputValue({
          [dataTag]: dataValue,
          [labelTag]: labelValue,
          formSaved: true,
        });
      }
    } else {
      // setInputValue(null);
      // form.setFieldsValue({ [name]: null });
      // handleFormPropsChange(name, {
      //   ...customComponentProps,
      //   dataValue: null,
      //   labelValue: null,
      // });
      setSavedInputValue({
        [dataTag]: null,
        [labelTag]: null,
        formSaved: true,
      });
    }
  }, [isEditing, selectedRecord]);
  useEffect(() => {
    if (form) {
      let errors = [];
      if (rules) {
        const [{ required, message }] = rules;
        if (required && !inputValue) {
          errors = [message];
        } else {
          errors = [];
        }
      }
      // form.setFieldsValue({ [name]: inputValue });
      form.setFields([
        {
          name: name,
          value: inputValue, // you can set a value or keep it the same
          // errors: [error], // clear any existing errors
          errors: errors?.length > 0 ? errors : [],
          // rules: [{ required: true, message: 'Updated: This field is now required!' }],
          rules: errors?.length > 0 ? rules : [],
        },
      ]);
    }
  }, [inputValue, form, rules]);
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
                dependentLookup={true}
                mainLookupName={mainLookupName}
                mainLookupValue={mainLookupValue}
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
};

export default DependentLookupComponent;
