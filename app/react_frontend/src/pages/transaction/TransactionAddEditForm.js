import React, { useEffect } from "react";
import { message } from "antd";
import InputComponenet from "../../components/FormComponent/InputComponent";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Pagination,
  DatePicker,
  InputNumber,
  AutoComplete,
  Select,
} from "antd";
import {
  setIsEditing,
  setSelectedForm,
  setSelectedRecord,
} from "../../redux/features/generic/modelSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import dayjs from "dayjs";
import {
  create_transaction,
  get_transactions,
  update_transaction,
} from "../../redux/features/transaction/transactionApiThunk";
import {
  setErrorMsg,
  setResult,
  setSuccessMsg,
} from "../../redux/features/generic/messageSlice";
import Lookup from "../../components/Lookup";
import { setMessageState } from "../../redux/features/generic/genericSlice";
import ButtonComponent from "../../components/FormComponent/ButtonComponent";

const { TextArea } = Input;

const TransactionAddEditForm = () => {
  const user_id = useSelector((state) => state.generic.user?.user_id);
  const dispatch = useDispatch();
  const [form] = Form.useForm(); // Initialize form instance

  // Handle form submission
  const handleModelOk = async (values) => {
    // Example: Get form values and check their types
    const { amount, description, is_active, trans_date, price, notes } = values;

    // Switch case to handle different types
    Object.entries(values).forEach(([key, value]) => {
      switch (typeof value) {
        case "number":
          console.log(`${key} is a number:`, value);
          // Perform specific operations for numbers
          break;

        case "string":
          console.log(`${key} is a string:`, value);
          // Perform specific operations for strings
          break;

        case "boolean":
          console.log(`${key} is a boolean:`, value);
          // Perform specific operations for boolean
          break;

        case "object":
          // If the object is a date (Moment or DayJS object), handle it as a date
          if (dayjs(value).isValid()) {
            console.log(`${key} is a date:`, dayjs(value).format("YYYY-MM-DD"));
            // Perform specific operations for dates
          }
          break;

        default:
          console.log(`${key} has an unknown type:`, value);
      }
    });

    // let { id, trans_date, main_category, user_category, description, amount } =
    //   values;
    // console.log("main_category");
    // console.log(main_category);

    // try {
    //   const formattedDate = trans_date
    //     ? dayjs(trans_date).format("YYYY-MM-DD HH:mm:ss.SSS")
    //     : null;

    //   const transactionData = {
    //     amount,
    //     main_category,
    //     user_category,
    //     description,
    //     trans_date: formattedDate,
    //     user_id,
    //     active: 1,
    //   };

    //   if (isEditing) {
    //     // Edit existing transaction
    //     const response = await dispatch(
    //       update_transaction({ id, data: transactionData })
    //     ).unwrap();
    //     dispatch(setSelectedRecord(response.transaction));
    //     // message.success({
    //     //   content: response.message,
    //     //   duration: 5, // Duration in seconds
    //     //   style: {
    //     //     fontSize: "18px", // Larger font size
    //     //   },
    //     // });
    //     // dispatch(setResult("success"));
    //     dispatch(setMessageState(setResult("success")));
    //     // dispatch(setSuccessMsg(response?.message));
    //     dispatch(setMessageState(setSuccessMsg(response?.message)));
    //   } else {
    //     // Create new transaction
    //     const response = await dispatch(
    //       create_transaction({ data: transactionData })
    //     ).unwrap();
    //     dispatch(setSelectedRecord(response?.transaction));
    //     dispatch(setIsEditing(true));
    //     dispatch(get_transactions());
    //     // message.success({
    //     //   content: response.message,
    //     //   duration: 5, // Duration in seconds
    //     //   style: {
    //     //     fontSize: "18px", // Larger font size
    //     //   },
    //     // });
    //     // dispatch(setResult("success"));
    //     dispatch(setMessageState(setResult("success")));
    //     // dispatch(setSuccessMsg(response?.message));
    //     dispatch(setMessageState(setSuccessMsg(response?.message)));
    //   }
    //   dispatch(get_transactions());
    // } catch (error) {
    //   // message.error({
    //   //   content: `Error : ${error?.error?.join(",")}`,
    //   //   duration: 5, // Duration in seconds
    //   //   style: {
    //   //     fontSize: "18px", // Larger font size
    //   //   },
    //   // });
    //   dispatch(setMessageState(setResult("error")));
    //   dispatch(setMessageState(setErrorMsg(error?.error?.join(","))));
    // }
  };

  const selectedRecord = useSelector((state) => state.model.selectedRecord);
  const isEditing = useSelector((state) => state.model.isEditing);

  useEffect(() => {
    // if (selectedRecord && isEditing) {
    //   // Convert trans_date from string to dayjs object
    //   const formattedDate = selectedRecord.trans_date
    //     ? dayjs(selectedRecord.trans_date, "YYYY-MM-DD HH:mm:ss.SSS")
    //     : null;
    //   form.setFieldsValue({ ...selectedRecord, trans_date: formattedDate });
    if (selectedRecord && isEditing) {
      const formattedDate = selectedRecord.trans_date
        ? dayjs(selectedRecord.trans_date, "YYYY-MM-DD HH:mm:ss.SSS")
        : null;

      form.setFieldsValue({
        ...selectedRecord,
        trans_date: formattedDate,
      });
    } else {
      form.resetFields();
    }
  }, [selectedRecord, isEditing, form]);
  // const options = [
  //   { value: "value1", label: "Label 1" },
  //   { value: "value2", label: "Label 2" },
  //   { value: "value3", label: "Label 3" },
  // ];
  const { Option } = Select;
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(`Input Name: ${name}, Input Value: ${value}`);
  //   // setInputValue(value); // Update the input value
  // };

  return (
    <Form
      form={form}
      // initialValues={selectedRecord || {}}
      onFinish={handleModelOk}
      layout="horizontal"
    >
      {/* <Form.Item label="main ID" name="main_category">
        <Input /> 
      </Form.Item> */}
      {/* <Form.Item
        label="AutoComplete Field"
        name="autocompleteField"
        rules={[{ required: true, message: "Please select or enter a value!" }]}
      >
        <AutoComplete
          placeholder="Start typing..."
          options={options} // Use predefined value and label pairs
          filterOption={(inputValue, option) =>
            option.label.toLowerCase().includes(inputValue.toLowerCase())
          }
        />
      </Form.Item> */}
      {isEditing && (
        <Form.Item name="id" label="ID">
          <Input disabled />
        </Form.Item>
      )}
      <InputComponenet
        name="id"
        label="ID"
        disabled={isEditing ? false : true}
      />

      <Form.Item
        name="amount"
        label="Amount"
        rules={[{ required: true, message: "Please input the amount!" }]}
      >
        <InputNumber step={0.01} min={0} />
        {/* <InputNumber step={0.01} min={0} /> */}
        {/* <Lookup /> */}
        {/* <Select>
          <Option value="store_1">Store 1</Option>
        </Select> */}
        {/* <InputNumber step={0.01} min={0} addonAfter="USD" /> */}
        {/* <Input
          allowClear
          autoComplete="off"
          bordered={true}
          defaultValue="Hello"
          size="large"
          status="warning"
          showCount
          maxLength={100}
          name="username"
          onChange={handleChange}
        /> */}
      </Form.Item>

      <Form.Item
        name="trans_date"
        label="Transaction Date"
        rules={[
          { required: true, message: "Please select the transaction date!" },
        ]}
      >
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item
        name="main_category"
        label="Main Category"
        rules={[{ required: true, message: "Please select a main category!" }]}
      >
        <Input />
      </Form.Item>
      {/* <Lookup
        id={"main_category"}
        label={"Main Category"}
        required={true}
        requiredMsg={"Please select a main category!"}
      /> */}
      <Form.Item
        name="user_category"
        label="User Category"
        rules={[{ required: true, message: "Please select a user category!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <TextArea rows={4} />
      </Form.Item>
      {isEditing && (
        <Form.Item name="active" label="Status">
          <Input disabled />
          {/* <Switch /> */}
        </Form.Item>
      )}

      <ButtonComponent editForm={isEditing ? true : false} />
    </Form>
  );
};

export default TransactionAddEditForm;

// import React, { useEffect } from "react";
// import {
//   Table,
//   Button,
//   Space,
//   Modal,
//   Form,
//   Input,
//   Pagination,
//   DatePicker,
//   InputNumber,
// } from "antd";
// import { setSelectedForm } from "../../redux/features/generic/modelSlice";
// import { useDispatch, useSelector } from "react-redux";
// import moment from "moment";
// import dayjs from "dayjs"; // Import dayjs
// import {
//   create_transaction,
//   update_transaction,
// } from "../../redux/features/transaction/transactionApiThunk";
// const { TextArea } = Input;
// const TransactionAddEditForm = () => {
//   //   const editingTransaction = null;
//   // const selectedModelCode = useSelector((state) => state.generic.selectedModelCode);
//   const user_id = useSelector((state) => state.generic.user?.user_id);
//   const handleModelOk = async (values) => {
//     let { id, trans_date, main_category, user_category, description, amount } =
//       values;

//     try {
//       if (isEditing) {
//         // editing code
//         // const data = useSelector(state => state.transaction.data);
//         const updateTransaction = {
//           amount: amount,
//           main_category: main_category,
//           user_category: user_category,
//           description: description,
//           trans_date: trans_date
//             ? dayjs(trans_date).format("YYYY-MM-DD HH:mm:ss.SSS")
//             : null, // Use dayjs to format
//           id: id,
//           user_id: user_id,
//           active: 1,
//         };
//         // const response = dispatch(
//         //   create_transaction("/transaction/id", {
//         //     data: {
//         //       transaction,
//         //     },
//         //   })
//         // );
//         const response = await dispatch(
//           update_transaction({ id, data: updateTransaction })
//         ).unwrap();
//       } else {
//         // add code
//         const createTransaction = {
//           amount: amount,
//           main_category: main_category,
//           user_category: user_category,
//           description: description,
//           trans_date: trans_date
//             ? dayjs(trans_date).format("YYYY-MM-DD HH:mm:ss.SSS")
//             : null, // Use dayjs to format
//           user_id: user_id,
//           active: 1,
//         };
//         // /transactions
//         const response = await dispatch(
//           create_transaction({ data: createTransaction })
//         ).unwrap();
//       }
//     } catch (error) {
//     }
//   };
//   const [form] = Form.useForm(); // Initialize form instance
//   const dispatch = useDispatch();
//   //   useEffect(() => {
//   //     dispatch(setSelectedForm(form));
//   //   }, [form]);

//   const selectedRecord = useSelector((state) => state.model.selectedRecord);
//   const isEditing = useSelector((state) => state.model.isEditing);
//   useEffect(() => {
//     if (selectedRecord && isEditing) {
//       form.setFieldValue(selectedRecord);
//     } else {
//       form.resetFields();
//     }
//   }, [selectedRecord, isEditing, form]);
//   // useEffect(() => {
//   //   if (selectedRecord && isEditing) {
//   //     // Create a copy of selectedRecord to avoid mutating the original object
//   //     const recordToSet = { ...selectedRecord };

//   //     // Check if trans_date exists and is valid before formatting
//   //     if (recordToSet.trans_date) {
//   //       const date = dayjs(recordToSet.trans_date);
//   //       if (date.isValid()) {
//   //         recordToSet.trans_date = date.format("YYYY-MM-DD");
//   //       } else {
//   //         // Optionally handle invalid date scenario
//   //         recordToSet.trans_date = null;
//   //       }
//   //     }

//   //     // Set the form fields with the updated record
//   //     form.setFieldsValue(recordToSet);
//   //   } else {
//   //     form.resetFields();
//   //   }
//   // }, [selectedRecord, isEditing, form]);
//   return (
//     <Form
//       form={form}
//       initialValues={selectedRecord || {}}
//       onFinish={handleModelOk}
//       layout="vertical" // Set the layout to horizontal
//       //   labelCol={{ span: 4 }} // Adjust label width
//       //   wrapperCol={{ span: 8 }} // Adjust input field width
//     >
//       {isEditing && (
//         <Form.Item label="ID" name="id">
//           <Input disabled /> {/* Disable the ID field */}
//         </Form.Item>
//       )}
//       <Form.Item
//         name="amount"
//         label="Amount"
//         rules={[{ required: true, message: "Please input the amount!" }]}
//       >
//         <InputNumber step={0.01} min={0} />
//       </Form.Item>

//       <Form.Item
//         name="trans_date"
//         label="Transaction Date"
//         rules={[
//           { required: true, message: "Please select the transaction date!" },
//         ]}
//       >
//         <DatePicker />
//         {/* <Input /> */}
//       </Form.Item>
//       <Form.Item
//         name="main_category"
//         label="Main Category"
//         rules={[{ required: true, message: "Please select a main category!" }]}
//       >
//         {/* <Select placeholder="Select a category">
//           <Option value="category1">Category 1</Option>
//           <Option value="category2">Category 2</Option>
//         </Select> */}
//         <Input />
//       </Form.Item>
//       <Form.Item
//         name="user_category"
//         label="User Category"
//         rules={[{ required: true, message: "Please select a user category!" }]}
//       >
//         {/* <Select placeholder="Select a category">
//           <Option value="category1">Category 1</Option>
//           <Option value="category2">Category 2</Option>
//         </Select> */}
//         <Input />
//       </Form.Item>
//       <Form.Item name="description" label="Description">
//         <TextArea rows={4} />
//       </Form.Item>
//       {isEditing && (
//         <Form.Item label="Status" name="active">
//           <Input disabled /> {/* Disable the ID field */}
//         </Form.Item>
//       )}
//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           {isEditing ? "Update" : "Add"}
//         </Button>
//         {/* <Button type="primary" htmlType="submit" onClick={}>
//           Cancel
//         </Button> */}
//       </Form.Item>
//     </Form>
//   );
// };

// export default TransactionAddEditForm;

// // import React from 'react';
// // import { Form, Input, DatePicker, Select, Checkbox, Radio, InputNumber, Button } from 'antd';
// // import axios from 'axios';

// // const { TextArea } = Input;
// // const { Option } = Select;

// // const MyForm = () => {
// //   const [form] = Form.useForm();

// //   // Submit handler
// //   const onFinish = async (values) => {
// //     try {
// //       // Determine if it's an update or create
// //       if (values.id) {
// //         // Update existing data
// //         await axios.put(`/api/endpoint/${values.id}`, values);
// //       } else {
// //         // Create new data
// //         await axios.post('/api/endpoint', values);
// //       }
// //       // Reset form or redirect as needed
// //       form.resetFields();
// //       // Optionally handle success feedback
// //     } catch (error) {
// //       // Optionally handle error feedback
// //     }
// //   };

// //   return (
// //     <Form
// //       form={form}
// //       layout="vertical"
// //       onFinish={onFinish}
// //     >
// //       <Form.Item
// //         name="name"
// //         label="Name"
// //         rules={[{ required: true, message: 'Please input the name!' }]}
// //       >
// //         <Input />
// //       </Form.Item>

// //       <Form.Item
// //         name="trans_date"
// //         label="Transaction Date"
// //         rules={[{ required: true, message: 'Please select the transaction date!' }]}
// //       >
// //         <DatePicker />
// //       </Form.Item>

// //       <Form.Item
// //         name="main_category"
// //         label="Main Category"
// //         rules={[{ required: true, message: 'Please select a category!' }]}
// //       >
// //         <Select placeholder="Select a category">
// //           <Option value="category1">Category 1</Option>
// //           <Option value="category2">Category 2</Option>
// //           {/* Add more options as needed */}
// //         </Select>
// //       </Form.Item>

// //       <Form.Item
// //         name="isSelected"
// //         valuePropName="checked"
// //       >
// //         <Checkbox>Is Selected</Checkbox>
// //       </Form.Item>

// //       <Form.Item
// //         name="text"
// //         label="Description"
// //       >
// //         <TextArea rows={4} />
// //       </Form.Item>

// //       <Form.Item
// //         name="yesorno"
// //         label="Yes or No"
// //         rules={[{ required: true, message: 'Please select an option!' }]}
// //       >
// //         <Radio.Group>
// //           <Radio value="yes">Yes</Radio>
// //           <Radio value="no">No</Radio>
// //         </Radio.Group>
// //       </Form.Item>

// //       <Form.Item
// //         name="amount"
// //         label="Amount"
// //         rules={[{ required: true, message: 'Please input the amount!' }]}
// //       >
// //         <InputNumber step={0.01} min={0} />
// //       </Form.Item>

// //       <Form.Item
// //         name="qty"
// //         label="Quantity"
// //         rules={[{ required: true, message: 'Please input the quantity!' }]}
// //       >
// //         <InputNumber min={0} />
// //       </Form.Item>

// //       <Form.Item>
// //         <Button type="primary" htmlType="submit">
// //           Submit
// //         </Button>
// //       </Form.Item>
// //     </Form>
// //   );
// // };

// // // export default MyForm;
// // import React from 'react';
// // import { InputNumber } from 'antd';

// // const ExampleInputNumber = () => {
// //   return (
// //     <InputNumber
// //       min={0}                       // Minimum value allowed
// //       max={100}                     // Maximum value allowed
// //       step={0.01}                   // Step size for increments/decrements
// //       precision={2}                 // Number of decimal places to display
// //       defaultValue={10.00}          // Initial value of the input
// //       formatter={(value) => `${value} units`}  // Custom display format
// //       parser={(value) => value.replace(' units', '')} // Custom parsing of the input
// //     />
// //   );
// // };

// // export default ExampleInputNumber;
// // Breakdown of the Properties
// // min={0}:

// // Sets the minimum allowable value to 0.
// // max={100}:

// // Sets the maximum allowable value to 100.
// // step={0.01}:

// // Defines the step size for incrementing or decrementing the value. Here, it's set to 0.01, allowing for fine precision.
// // precision={2}:

// // Specifies that the value should be displayed with up to 2 decimal places.
// // defaultValue={10.00}:

// // Sets the initial value of the input to 10.00.
// // formatter={(value) => ${value} units}:

// // Customizes how the number is displayed. Here, it appends " units" to the displayed value. For example, 10 will be displayed as 10 units.
// // parser={(value) => value.replace(' units', '')}:

// // Customizes how the input value is parsed. It removes " units" when the user inputs a value, ensuring the underlying value is just the numeric part.
