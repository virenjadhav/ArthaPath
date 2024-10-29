import React, { useEffect, useState } from "react";
import { DatePicker, Form, Select, Space, TimePicker } from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;

const DateTimeComponent = ({
  name,
  label,
  form,
  rules = null,
  includeInLayout = true,
  visible = true,
}) => {
  const [type, setType] = useState("date");
  const onOkHandler = () => {};
  const PickerWithType = ({ type }) => {
    // if (type === "time") return <TimePicker />;
    if (type === "date") return <DatePicker />;
    if (type === "range") return <RangePicker format="YYYY-MM-DD HH:mm" />;
    return <DatePicker picker={type} />;
  };

  const handleTypeChange = (value) => {
    setType(value);
    // Reset the fields when the type changes
    form.setFieldsValue({ [name]: undefined });
  };
  useEffect(() => {
    // Set default "date" type in the form when the component mounts
    form.setFieldsValue({ [name + "-type"]: "date" });
    setType("date");
  }, [form, name]);

  return (
    <>
      {includeInLayout && (
        <div style={{ display: "flex" }}>
          <Form.Item name={name} label={label} rules={rules}>
            {visible && (
              // <Space>
              //   {/* <Select value={type} onChange={setType}>
              //     <Option value="time">Time</Option>
              //     <Option value="date">Date</Option>
              //     <Option value="week">Week</Option>
              //     <Option value="month">Month</Option>
              //     <Option value="quarter">Quarter</Option>
              //     <Option value="year">Year</Option>
              //   </Select> */}

              //   <RangePicker format="YYYY-MM-DD HH:mm" />
              // </Space>
              // <>
              //   <RangePicker
              //     format="YYYY-MM-DD HH:mm"
              //     suffixIcon={suffixHandler}
              //   ></RangePicker>
              <>{PickerWithType({ type })}</>
            )}
          </Form.Item>
          <Form.Item
            name={name + "-type"}
            label={""}
            style={{ width: "100px", marginLeft: "10px" }}
          >
            <Select value={type} onChange={handleTypeChange}>
              {/* <Option value="time">Time</Option> */}
              <Option value="date">Date</Option>
              <Option value="week">Week</Option>
              <Option value="month">Month</Option>
              <Option value="quarter">Quarter</Option>
              <Option value="year">Year</Option>
              <Option value="range">Range</Option>
            </Select>

            {/* <RangePicker format="YYYY-MM-DD HH:mm" /> */}
          </Form.Item>
        </div>
      )}

      {/* <Form.Item name="trans_date" label="Trans Date">
        <RangePicker format="YYYY-MM-DD HH:mm" />
      </Form.Item> */}
    </>
  );
};

export default DateTimeComponent;

// import React, { useState } from "react";
// import { DatePicker, Form, Select, Space, TimePicker } from "antd";
// const { Option } = Select;
// const { RangePicker } = DatePicker;
// const PickerWithType = ({ type, onChange }) => {
//   if (type === "time") return <TimePicker onChange={onChange} />;
//   if (type === "date") return <DatePicker onChange={onChange} />;
//   return <DatePicker picker={type} onChange={onChange} />;
// };

// const DateTimeComponent = ({
//   name,
//   label,
//   rules = null,
//   includeInLayout = true,
//   visible = true,
//   format = null,
//   allowClear = true,
// }) => {
//   const [type, setType] = useState("date");
//   const onOkHandler = () => {};
//   return (
//     <>
//       {includeInLayout && (
//         <Form.Item name={name} label={label} rules={rules}>
//           {visible && (
//             <Space>
//               <Select value={type} onChange={setType}>
//                 <Option value="time">Time</Option>
//                 <Option value="date">Date</Option>
//                 <Option value="week">Week</Option>
//                 <Option value="month">Month</Option>
//                 <Option value="quarter">Quarter</Option>
//                 <Option value="year">Year</Option>
//               </Select>

//               {/* <PickerWithType
//                 type={type}
//               /> */}
//               <RangePicker
//                 // showTime={{
//                 //     format: 'HH:mm',
//                 // }}
//                 format="YYYY-MM-DD HH:mm"
//                 onChange={(value, dateString) => {
//                 }}
//                 onOk={onOkHandler}
//                 style={{ maxWidth: "500px" }}
//               />
//             </Space>
//           )}
//         </Form.Item>
//       )}
//     </>
//   );
// };

// export default DateTimeComponent;
