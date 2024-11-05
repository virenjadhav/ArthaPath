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

const LookupComponent = ({
  name,
  label,
  dataField,
  labelField,
  dataSourceName,
  dataTag,
  labelTag,
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

  const handleLookupClick = (e) => {
    setIsLookupModelVisible(true);
  };

  const handleComponentChange = (value) => {
    const upperValue = value.target?.value?.toUpperCase();
    if (handleFormPropsChange) {
      handleFormPropsChange(name, {
        ...customComponentProps,
        // value,
        upperValue,
      });
    }
    if (value) {
      // setInputValue(value.target.value);
      setInputValue(upperValue);
    }
  };

  const handleOnBlur = () => {
    if (validationFlag) {
      // handle validation
      validateLookup(inputValue);
    }
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
    if (result == "success") {
      handleFormPropsChange(name, {
        ...customComponentProps,
        dataValue: dataValue,
        labelValue: labelValue,
      });
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
    setInputValue(labelValue);

    if (validationFlag) {
      // check current value are valid or not
      validateLookup(labelValue);
    } else {
      handleFormPropsChange(name, {
        ...customComponentProps,
        dataValue: dataValue,
        labelValue: labelValue,
      });
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
        dataValue: null,
        labelValue: null,
        dataTag: dataTag,
        labelTag: labelTag,
      });
    }
    // Cleanup function to remove component on unmount
    return () => {
      if (formComponentProps) {
        delete formComponentProps.current[name];
      }
    };
  }, [name, formComponentProps, customComponentProps, handleFormPropsChange]);
  useEffect(() => {
    if (selectedRecord) {
      const value = selectedRecord?.[labelTag];
      setInputValue(value);
    } else {
      setInputValue(null);
    }
  }, [name, customComponentProps, handleFormPropsChange]);

  return (
    <>
      {includeInLayout && (
        <Form.Item name={name} label={label} rules={rules}>
          {visible && (
            <div>
              {/* <Input
                addonAfter={<ReadOutlined onClick={handleLookupClick} />}
              /> */}
              <LookupModel
                isLookupModalVisible={isLookupModelVisible}
                setIsLookupModalVisible={setIsLookupModelVisible}
                lookupService="get_main_categories"
                lookupFormatUrl="main_categories"
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
};

export default LookupComponent;
