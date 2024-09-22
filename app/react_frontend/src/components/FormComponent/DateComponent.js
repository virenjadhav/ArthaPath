import React, { useRef, useEffect } from "react";
import { Calendar, DatePicker, Form } from "antd";
import {
  
  CalendarOutlined,
} from "@ant-design/icons";

import moment from "moment";

const DateComponent = ({
  name, label, rules = null, includeInLayout = true, visible=true, format=null,
  allowClear = true, autoFocus= false, disabled=false, disabledDate=null, placeholder=null, size=null,
  showTime=false, handleOnChange= null, handleOpenChange=null, picker=null, defaultValue=null, disabledTime=null,
  openDatePicker=false,  inputReadOnly=null, suffixIcon=null, popupStyle=null, handleFocusOut=null, handleOnFocus=null,
  removeFocus=null, inputFocus=null, handleSelect=null, handleOkClickHandler=null
}) => {
  const datePickerRef = useRef(null);
  // Type of picker ('date', 'week', 'month', 'quarter', 'year').
// Type: 'date' | 'week' | 'month' | 'quarter' | 'year'

useEffect(() => {
  
  if (removeFocus){
    datePickerRef.current.blur();
  }
  if(inputFocus){
    datePickerRef.current.focus();
  }
  if(handleSelect){
    datePickerRef.current.select();
  }
}, [removeFocus, inputFocus, handleSelect]);

  return <>
     {includeInLayout && <Form.Item name={name} label={label} rules={rules}>
     {visible &&
      <DatePicker 
      ref={datePickerRef}
      format={format}
       allowClear = {allowClear}
       autoFocus={autoFocus}
       disabled={disabled}
      //  disabledDate={current => current && current < moment().endOf('day')}
      disabledDate={disabledDate}
      placeholder={placeholder}
      size={size}
      showTime={showTime}
      onChange={handleOnChange}
      onOpenChange = {handleOpenChange}
      // picker={picker}
      // value={moment('2022-05-15', 'MM-DD-YYYY')}
      // defaultValue={moment(defaultValue, format)}
      // disabledTime={() => ({
      //   disabledHours: () => [0, 1, 2, 3],
      //   disabledMinutes: () => [30, 31, 32],
      // })} 
      onOk={handleOkClickHandler}
      // open={openDatePicker}
      // dropdownClassName="customDropdown"  // here we give css file class name if we want to custom styling for date picker
      inputReadOnly={inputReadOnly}
      // suffixIcon={suffixIcon}
      suffixIcon={suffixIcon ? suffixIcon : <CalendarOutlined />} 
      // popupStyle={{ backgroundColor: '#000' }}
      // popupStyle={popupStyle}
      onBlur={handleFocusOut}
      onFocus={handleOnFocus}
      componentType="formDate"
      />
      }
     </Form.Item>}
  </>
};

export default DateComponent;


