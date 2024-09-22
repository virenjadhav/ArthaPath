import React from "react";
import { Radio } from 'antd';

const RadioComponent = ({options, includeInLayout=true, visible=true, defaultValue="", buttonStyle="outline", disableRadioGroup=null, onRadioGroupChangeHandler=null, handleRadioItemClickHandler=null, handelRadioGroupChangeHandler=null, optionType=null, direction="vertical" }) => {
  // const options = [
  //   { label: 'Option A', value: 'a' },
  //   { label: 'Option B', value: 'b' },
  //   { label: 'Option C', value: 'c'},
  // ];
  return <>
          {
            includeInLayout && <Radio.Group  defaultValue = {defaultValue} buttonStyle={buttonStyle} disabled={disableRadioGroup} onClick={onRadioGroupChangeHandler} onChange={handelRadioGroupChangeHandler}
            //  direction="horizontal" // Use 'direction' for vertical alignment
            //  optionType="button" // Optional: Makes buttons look like actual buttons
            style={direction == 'horizontal' ? {display: "flex", flexDirection: "row"}: null}
            optionType={optionType}
            componentType="formRadio"
            >
              {visible && (
                options?.map(option => (
                  <Radio key={option.key ? option.key : option.value} value={option.value} disabled={option.disabled} onClick={() => handleRadioItemClickHandler(option.value)}
                    data-custom={option.customProp} // Custom data attribute
                    // const customData = e.target.getAttribute('data-custom');
                  >
                  {option.label}
                  </Radio>
                ))
              )}
            </Radio.Group>
          } 
  </>;
};

export default RadioComponent;
