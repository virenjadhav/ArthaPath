

import React, { useEffect, useRef } from "react";
import { Form, Input } from "antd";
const {TextArea} = Input;

const InputTextAreaComponent = ({ name, label,placeholder= "", visible= true, includeInLayout = true,size= "default",type=null,onChangeHandler=null, onPressEnterHandler=null,autoFocus=null,defaultValue="",onFocusHandler=null,onhandleFocusOut=null,loading=true,readOnly=false,handleSelect=null,  disabled=false, addonBefore = null, addonAfter = null, prefix = null, suffix= null,
  allowClear = false, maxLength= null, removeFocus= null, inputFocus=null, rules=null, stringMode=null, bordered=true,
  rows=3, showCount=false, autoSize=null
 }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (removeFocus){
      inputRef.current.blur();
    }
    if(inputFocus){
      inputRef.current.focus();
    }
    if(handleSelect){
      inputRef.current.select();
    }
  }, [removeFocus, inputFocus, handleSelect]);
  return (
    <>
      {includeInLayout && <Form.Item name={name} label={label} rules={rules}>
        {visible && <TextArea
         ref={inputRef}  // This allows us to control the input programmatically
          onBlur={onhandleFocusOut}
          disabled={ disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        type={type}
        onChange={onChangeHandler}
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
          
          stringMode={stringMode}
          bordered={bordered}
          rows={rows}
          showCount={showCount}
          autoSize={autoSize ? autoSize : { minRows: 3, maxRows: 5 }}
          // autoSize={autoSize}
          componentType="formInputTextArea"
        />  }
        {/* <Input.Group compact>
  <Input style={{ width: '20%' }} defaultValue="Prefix" />
  <Input style={{ width: '80%' }} placeholder="Enter text" />
</Input.Group> */}
{/* <Input.Search
  placeholder="Search something"
  onSearch={value => console.log(value)}
  enterButton
/> */}

      </Form.Item>}
      
    </>
  );
};

export default InputTextAreaComponent;

