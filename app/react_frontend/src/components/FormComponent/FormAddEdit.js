import { Form, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useRef, useState } from "react";
import InputDecimalNumberComponent from "./InputDecimalNumberComponent";
import DateComponent from "./DateComponent";
import RadioComponent from "./RadioComponent";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import ButtonComponent from "./ButtonComponent";
import {
  setIsEditing,
  setIsModelVisible,
  setSelectedRecord,
} from "../../redux/features/generic/modelSlice";
import { update_transaction } from "../../redux/features/transaction/transactionApiThunk";
import { setMessageState } from "../../redux/features/generic/genericSlice";
import {
  setErrorMsg,
  setResult,
  setSuccessMsg,
} from "../../redux/features/generic/messageSlice";
import useApiServiceCall from "../../apis/ApiServiceCall";
import {
  useFormCreateAction,
  useFormRefreshAction,
  useFormUpdateAction,
  useRefreshAction,
} from "../Services/FormServices";
import "../../assets/css/FormAddEditStyle.css";
export let form = null;
const initializeForm = (formValue) => {
  form = formValue;
};

const FormAddEdit = ({ children }) => {
  const [form] = useForm();
  const formComponentProps = useRef({});
  // const [saveData, setSaveData] = useState({});
  // const { callApi } = useApiServiceCall();
  const { formRefreshAction } = useFormRefreshAction();
  const { formCreateAction } = useFormCreateAction();
  const { formUpdateAction } = useFormUpdateAction();
  const [editingTransaction, setEditingTransaction] = useState(null);
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const isModelVisible = useSelector((state) => state.model.isModelVisible);

  const selectedRecord = useSelector((state) => state.model.selectedRecord);
  const isEditing = useSelector((state) => state.model.isEditing);
  const user_id = useSelector((state) => state.generic.user?.user_id);
  const servicesData = useSelector((state) => state.model.servicesData);
  const dispatch = useDispatch();
  useEffect(() => {
    // if (selectedRecord && isEditing) {
    //   // Convert trans_date from string to dayjs object
    //   const formattedDate = selectedRecord.trans_date
    //     ? dayjs(selectedRecord.trans_date, "YYYY-MM-DD HH:mm:ss.SSS")
    //     : null;
    //   form.setFieldsValue({ ...selectedRecord, trans_date: formattedDate });
    initializeForm(form);
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

  const handleRefreshAction = async () => {
    // callApi("getList", handleRefreshClickHandler);
    // await refreshAction();
    // formRefreshAction();
    await formRefreshAction();
  };

  const radioOptions = [
    {
      label: "Option VB",
      value: "option1",
      customProp: "CustomData1",
      disabled: false,
    },
    {
      label: "Option 2",
      value: "option2",
      customProp: "CustomData2",
      disabled: false,
    },
    {
      label: "Option 3",
      value: "option3",
      customProp: "CustomData3",
      disabled: true,
    },
  ];
  const getServiceUrlById = (id) => {
    if (servicesData) {
      const service = servicesData.find((service) => service.id === id); // Find the object by id
      return service ? service.url : null; // Return the URL if found, else return null
    } else {
      return null;
    }
  };

  const handleCreateServiceHandler = (response) => {
    console.log("response");
    console.log(response);
    dispatch(setSelectedRecord(response?.data));
    dispatch(setIsEditing(true));
    handleRefreshAction();
    dispatch(setMessageState(setResult("success")));
    dispatch(setMessageState(setSuccessMsg(response?.message)));
  };

  const handleUpdateServiceHandler = (response) => {
    dispatch(setSelectedRecord(response?.data));
    dispatch(setMessageState(setResult("success")));
    dispatch(setMessageState(setSuccessMsg(response?.message)));
  };

  const handleModelOk = async (values) => {
    // const { amount, description, is_active, trans_date, price, notes } = values;
    // try {
    const customProps = formComponentProps.current;

    let saveData = {
      user_id,
      active: 1,
    };

    let id = null;
    id = selectedRecord?.id;
    console.log("values");
    console.log(values);
    console.log(customProps);
    let errors = [];
    Object.entries(values).forEach(([key, value]) => {
      // if (key === "id") {
      //   id = value;
      // }
      const error = form.getFieldError(key);
      if (error?.length > 0) {
        errors = [...errors, error?.join(",")];
        return;
      }

      let customPropForValue = customProps[key];
      switch (customPropForValue["componentType"]) {
        case "formInputDecimal":
          if (customPropForValue["updateFlag"] == true) {
            saveData = {
              ...saveData,
              [key]: value,
            };
          }
          break;
        case "formDate":
          if (customPropForValue["updateFlag"] == true) {
            // setSaveData((preState) => ({
            //   ...preState,
            //   [key]: value
            //     ? dayjs(value).format("YYYY-MM-DD HH:mm:ss.SSS")
            //     : null,
            // }));
            saveData = {
              ...saveData,
              [key]: value
                ? dayjs(value).format("YYYY-MM-DD HH:mm:ss.SSS")
                : null,
            };
          }
          break;
        case "formLookup":
          let dataTag = customPropForValue["dataTag"];
          let labelTag = customPropForValue["labelTag"];
          let dataValue = customPropForValue["dataValue"];
          let labelValue = customPropForValue["labelValue"];
          if (dataTag !== labelTag) {
            saveData = {
              ...saveData,
              [dataTag]: dataValue,
              [labelTag]: labelValue,
            };
          } else {
            saveData = {
              ...saveData,
              [dataTag]: dataValue,
            };
          }

          break;
        case "formInputTextArea":
          if (customPropForValue["updateFlag"] == true) {
            // setSaveData((preState) => ({
            //   ...preState,
            //   [key]: value,
            // }));
            saveData = {
              ...saveData,
              [key]: value,
            };
          }
          break;
        case "formInput":
          if (customPropForValue["updateFlag"] == true) {
            saveData = {
              ...saveData,
              [key]: value,
            };
          }
          break;
        case "formSelect":
          if (customPropForValue["updateFlag"] == true) {
            saveData = {
              ...saveData,
              [key]: value,
            };
          }
          break;
        default:
          console.log("Default Value");
      }
    });
    console.log("errors");
    console.log(errors);
    if (errors.length > 0) {
      dispatch(setMessageState(setResult("error")));
      dispatch(setMessageState(setErrorMsg(`Error : ${errors?.join(",")}`)));
      return;
    }
    console.log("Save Data");
    console.log(saveData);

    if (isEditing) {
      let payload = {
        id: id,
        data: saveData,
      };
      await formUpdateAction(payload, handleUpdateServiceHandler);
      // callApi("getList", handleUpdateServiceHandler);
      // const response = dispatch(
      //   callApiService("getList", handleRefreshClickHandler)
      // );
    } else {
      let payload = {
        data: saveData,
      };
      await formCreateAction(payload, handleCreateServiceHandler);
      // const response = dispatch(
      //   callApiService("getList", handleRefreshClickHandler)
      // );
      // callApi("getList", handleCreateServiceHandler);
    }
  };
  // const handleFormComponentChange = (name, props) => {
  //   // if (type === "add") {
  //   //   formComponentProps.current[name] = {
  //   //     ...props.current[name],
  //   //     componentType: componentTypeValue,
  //   //   };
  //   // } else {
  //   //   formComponentProps.current[name] = props.current[name];
  //   // }
  //   let existingValues = formComponentProps.current[name];
  //   formComponentProps.current[name] = { ...existingValues, ...props };
  // };
  const handleFormComponentChange = (name, props) => {
    // Dynamically updating form component state
    formComponentProps.current[name] = {
      ...formComponentProps.current[name],
      ...props,
    };
  };

  // Clone children to inject formComponentProps and handleFormComponentChange
  const enhancedChildren = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      formComponentProps,
      handleFormPropsChange: handleFormComponentChange,
    })
  );
  const handleModalCancel = () => {
    form.resetFields();
    dispatch(setIsModelVisible(false));
    dispatch(setSelectedRecord(null));
    dispatch(setIsEditing(false));
  };

  return (
    <>
      <Modal
        title={editingTransaction ? "Edit " : "Add "}
        visible={isModelVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form
          form={form}
          // initialValues={selectedRecord || {}}
          onFinish={handleModelOk}
          layout="horizontal"
        >
          {/* {children} */}
          {enhancedChildren}

          <ButtonComponent editForm={isEditing ? true : false} />
        </Form>
      </Modal>
    </>
  );
};

export default FormAddEdit;

// const updateRecordUrl = getServiceUrlById("updateRecord");
// const createRecordUrl = getServiceUrlById("createRecord");
// const getListUrl = getServiceUrlById("getList");
//   if (isEditing) {
//     // Edit existing transaction
//     const response = await dispatch(
//       update_transaction({ id, data: saveData })
//     ).unwrap();
//     dispatch(setSelectedRecord(response.transaction));
//     dispatch(setMessageState(setResult("success")));
//     dispatch(setMessageState(setSuccessMsg(response?.message)));
//   } else {
//     // Create new transaction
//     const response = await dispatch(
//       create_transaction({ data: saveData })
//     ).unwrap();
//     dispatch(setSelectedRecord(response?.transaction));
//     dispatch(setIsEditing(true));
//     dispatch(get_transactions());
//     dispatch(setMessageState(setResult("success")));
//     dispatch(setMessageState(setSuccessMsg(response?.message)));
//   }
//   dispatch(get_transactions());
// } catch (error) {
//   dispatch(setMessageState(setResult("error")));
//   dispatch(setMessageState(setErrorMsg(error?.error?.join(","))));
// }

// let { id, trans_date, main_category, user_category, description, amount } =
//   values;

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

{
  /* <InputDecimalNumberComponent
          name="amount"
          label="Amount"
          rules={[{ required: true, message: "Please input the amount!" }]}
          step={0.01}
          min={0}
          addonAfter="USD"
          formComponentProps={formComponentProps}
          handleFormPropsChange={handleFormComponentChange}
          customComponentProps={{ updateFlag: true }}
        />
        <DateComponent
          name={"trans_date"}
          label={"Transaction Date"}
          rules={[
            { required: true, message: "Please select the transaction date!" },
          ]}
          formate={"YYYY-MM-DD"}
          formComponentProps={formComponentProps}
          handleFormPropsChange={handleFormComponentChange}
          customComponentProps={{ updateFlag: true }}
        /> */
}
{
  /*
        <RadioComponent
          name="radio_tag"
          options={radioOptions}
          direction="horizontal"
          formComponentProps={formComponentProps}
          handleFormPropsChange={handleFormComponentChange}
          customComponentProps={{ updateFlag: false }}
        /> */
}
{
  /* {isEditing && (
          <Form.Item name="active" label="Status">
            <Input disabled />
            
          </Form.Item>
        )} */
}

// import React, { useEffect, useRef } from "react";
// import { message } from "antd";
// import InputComponent from "../../components/FormComponent/InputComponent";
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
//   AutoComplete,
//   Select,
//   Menu,
// } from "antd";
// import {
//   setIsEditing,
//   setSelectedForm,
//   setSelectedRecord,
// } from "../../redux/features/generic/modelSlice";
// import { useDispatch, useSelector } from "react-redux";
// import moment from "moment";
// import dayjs from "dayjs";
// import {
//   create_transaction,
//   get_transactions,
//   update_transaction,
// } from "../../redux/features/transaction/transactionApiThunk";
// import {
//   setErrorMsg,
//   setResult,
//   setSuccessMsg,
// } from "../../redux/features/generic/messageSlice";
// import Lookup from "../../components/Lookup";
// import { setMessageState } from "../../redux/features/generic/genericSlice";
// import ButtonComponent from "../../components/FormComponent/ButtonComponent";
// import InputDecimalNumberComponent from "../../components/FormComponent/InputDecimalNumberComponent";
// import DateComponent from "../../components/FormComponent/DateComponent";
// import InputTextAreaComponent from "../../components/FormComponent/InputTextAreaComponent";
// import RadioComponent from "../../components/FormComponent/RadioComponent";
// import DropDownComponent from "../../components/FormComponent/DropDownComponent";
// import SelectComponent from "../../components/FormComponent/SelectComponents";
// import CheckBoxComponent from "../../components/FormComponent/CheckBoxComponent";
// import SingleCheckboxComponent from "../../components/FormComponent/SingleCheckboxComponent";

// const { TextArea } = Input;

// const TransactionAddEditForm = () => {
//   const user_id = useSelector((state) => state.generic.user?.user_id);
//   const dispatch = useDispatch();
//   const [form] = Form.useForm(); // Initialize form instance
//   const formComponentProps = useRef({});
//   const radioOptions = [
//     {
//       label: "Option VB",
//       value: "option1",
//       customProp: "CustomData1",
//       disabled: false,
//     },
//     {
//       label: "Option 2",
//       value: "option2",
//       customProp: "CustomData2",
//       disabled: false,
//     },
//     {
//       label: "Option 3",
//       value: "option3",
//       customProp: "CustomData3",
//       disabled: true,
//     },
//   ];
//   const selectOptions = [
//     { value: "option1", label: "Option 1" },
//     { value: "option2", label: "Option 2" },
//     { value: "option3", label: "Option 3" },
//   ];
//   // const  checkboxOptions = [
//   //   { label: "Option A", value: "A" },
//   //   { label: "Option B", value: "B" },
//   //   { label: "Option C", value: "C" }
//   // ];
//   const checkboxOptions = [
//     { label: "Option A", value: "A" }, // Normal
//     { label: "Option B", value: "B", disabled: true }, // Disabled option
//     { label: "Option C", value: "C" },
//     { label: "Option D", value: "D", disabled: true }, // Disabled option
//     { label: "Option E", value: "E" },
//   ];

//   const handleCheckboxChange = (checkedValues) => {
//   };
//   const onDropdownClickHandler = () => {};
//   const onDropDownSelectHandler = () => {};
//   const DropdownMenus = (
//     <Menu onClick={onDropdownClickHandler} onSelect={onDropDownSelectHandler}>
//       <Menu.Item key="1">
//         <a href="https://www.google.com">Google</a>
//       </Menu.Item>
//       <Menu.Item key="2">
//         <a href="https://www.facebook.com">Facebook</a>
//       </Menu.Item>
//       <Menu.Item key="3">Option 3</Menu.Item>
//     </Menu>
//   );
//   const handleFormComponentChange = (name, props) => {
//     // if (type === "add") {
//     //   formComponentProps.current[name] = {
//     //     ...props.current[name],
//     //     componentType: componentTypeValue,
//     //   };
//     // } else {
//     //   formComponentProps.current[name] = props.current[name];
//     // }
//     let existingValues = formComponentProps.current[name];
//     formComponentProps.current[name] = { ...existingValues, ...props };
//   };

//   // Handle form submission
//   const handleModelOk = async (values) => {
//     // Example: Get form values and check their types
//     const { amount, description, is_active, trans_date, price, notes } = values;

//     const customProps = formComponentProps.current;
//     // Switch case to handle different types
//     // Object.entries(values).forEach(([key, value]) => {
//     //   switch (typeof value) {
//     //     case "number":
//     //       // Perform specific operations for numbers
//     //       break;

//     //     case "string":
//     //       // Perform specific operations for strings
//     //       break;

//     //     case "boolean":
//     //       // Perform specific operations for boolean
//     //       break;

//     //     case "object":
//     //       // If the object is a date (Moment or DayJS object), handle it as a date
//     //       if (dayjs(value).isValid()) {
//     //         // Perform specific operations for dates
//     //       }
//     //       break;

//     //     default:
//     //   }
//     // });
//     // Iterate over each value in the form
//     // Object.entries(values).forEach(([key, value]) => {
//     //   const fieldInstance = form.getFieldInstance(key);
//     //   const componentType =
//     //     fieldInstance?.attributes?.componentType?.value || "defaultType";
//     //   const updateFlag = fieldInstance?.attributes?.updateFlag;

//     //   switch (componentType) {
//     //     case "formInput":
//     //       // Handle input (string) logic here
//     //       break;

//     //     case "formInputTextArea":
//     //       // Handle input (string) logic here
//     //       break;
//     //     case "formInputDecimal":
//     //       // Handle input (string) logic here
//     //       break;

//     //     case "formDate":
//     //       if (dayjs(value).isValid()) {
//     //         // Handle date logic here
//     //       }
//     //       break;

//     //     case "formRadio":
//     //       // Handle radio (boolean or string) logic here
//     //       break;

//     //     case "formCheckbox":
//     //       // Handle checkbox (array or boolean) logic here
//     //       break;

//     //     // case "number":
//     //     //   // Handle number logic here
//     //     //   break;

//     //     // case "custom":
//     //     //   // Handle custom component logic here
//     //     //   break;

//     //     case "formSingleCheckbox":
//     //       // Handle custom component logic here
//     //       break;
//     //     case "formSelect":
//     //       break;

//     //     case "DropDown":
//     //       break;

//     //     default:
//     //   }
//     // });

//     // let { id, trans_date, main_category, user_category, description, amount } =
//     //   values;

//     // try {
//     //   const formattedDate = trans_date
//     //     ? dayjs(trans_date).format("YYYY-MM-DD HH:mm:ss.SSS")
//     //     : null;

//     //   const transactionData = {
//     //     amount,
//     //     main_category,
//     //     user_category,
//     //     description,
//     //     trans_date: formattedDate,
//     //     user_id,
//     //     active: 1,
//     //   };

//     //   if (isEditing) {
//     //     // Edit existing transaction
//     //     const response = await dispatch(
//     //       update_transaction({ id, data: transactionData })
//     //     ).unwrap();
//     //     dispatch(setSelectedRecord(response.transaction));
//     //     // message.success({
//     //     //   content: response.message,
//     //     //   duration: 5, // Duration in seconds
//     //     //   style: {
//     //     //     fontSize: "18px", // Larger font size
//     //     //   },
//     //     // });
//     //     // dispatch(setResult("success"));
//     //     dispatch(setMessageState(setResult("success")));
//     //     // dispatch(setSuccessMsg(response?.message));
//     //     dispatch(setMessageState(setSuccessMsg(response?.message)));
//     //   } else {
//     //     // Create new transaction
//     //     const response = await dispatch(
//     //       create_transaction({ data: transactionData })
//     //     ).unwrap();
//     //     dispatch(setSelectedRecord(response?.transaction));
//     //     dispatch(setIsEditing(true));
//     //     dispatch(get_transactions());
//     //     // message.success({
//     //     //   content: response.message,
//     //     //   duration: 5, // Duration in seconds
//     //     //   style: {
//     //     //     fontSize: "18px", // Larger font size
//     //     //   },
//     //     // });
//     //     // dispatch(setResult("success"));
//     //     dispatch(setMessageState(setResult("success")));
//     //     // dispatch(setSuccessMsg(response?.message));
//     //     dispatch(setMessageState(setSuccessMsg(response?.message)));
//     //   }
//     //   dispatch(get_transactions());
//     // } catch (error) {
//     //   // message.error({
//     //   //   content: `Error : ${error?.error?.join(",")}`,
//     //   //   duration: 5, // Duration in seconds
//     //   //   style: {
//     //   //     fontSize: "18px", // Larger font size
//     //   //   },
//     //   // });
//     //   dispatch(setMessageState(setResult("error")));
//     //   dispatch(setMessageState(setErrorMsg(error?.error?.join(","))));
//     // }
//   };

//   const selectedRecord = useSelector((state) => state.model.selectedRecord);
//   const isEditing = useSelector((state) => state.model.isEditing);

//   useEffect(() => {
//     // if (selectedRecord && isEditing) {
//     //   // Convert trans_date from string to dayjs object
//     //   const formattedDate = selectedRecord.trans_date
//     //     ? dayjs(selectedRecord.trans_date, "YYYY-MM-DD HH:mm:ss.SSS")
//     //     : null;
//     //   form.setFieldsValue({ ...selectedRecord, trans_date: formattedDate });
//     if (selectedRecord && isEditing) {
//       const formattedDate = selectedRecord.trans_date
//         ? dayjs(selectedRecord.trans_date, "YYYY-MM-DD HH:mm:ss.SSS")
//         : null;

//       form.setFieldsValue({
//         ...selectedRecord,
//         trans_date: formattedDate,
//       });
//     } else {
//       form.resetFields();
//     }
//   }, [selectedRecord, isEditing, form]);
//   // const options = [
//   //   { value: "value1", label: "Label 1" },
//   //   { value: "value2", label: "Label 2" },
//   //   { value: "value3", label: "Label 3" },
//   // ];
//   const { Option } = Select;
//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   // setInputValue(value); // Update the input value
//   // };

//   return (
//     <Form
//       form={form}
//       // initialValues={selectedRecord || {}}
//       onFinish={handleModelOk}
//       layout="horizontal"
//     >
//       {/* <Form.Item label="main ID" name="main_category">
//         <Input />
//       </Form.Item> */}
//       {/* <Form.Item
//         label="AutoComplete Field"
//         name="autocompleteField"
//         rules={[{ required: true, message: "Please select or enter a value!" }]}
//       >
//         <AutoComplete
//           placeholder="Start typing..."
//           options={options} // Use predefined value and label pairs
//           filterOption={(inputValue, option) =>
//             option.label.toLowerCase().includes(inputValue.toLowerCase())
//           }
//         />
//       </Form.Item> */}
//       {/* {isEditing && (
//         <Form.Item name="id" label="ID">
//           <Input disabled />
//         </Form.Item>
//       )} */}
//       {/* <InputComponent
//         name="id"
//         label="ID"
//         disabled={isEditing ? false : true}
//         includeInLayout={isEditing ? true : false}
//         updateFlag={true}
//       /> */}
//       <InputDecimalNumberComponent
//         name="amount"
//         label="Amount"
//         rules={[{ required: true, message: "Please input the amount!" }]}
//         step={0.01}
//         min={0}
//         addonAfter="USD"
//         formComponentProps={formComponentProps}
//         handleFormPropsChange={handleFormComponentChange}
//         customComponentProps={{ updateFlag: true }}
//       />

//       {/* <Form.Item name="currency" label="Currency">
//         <Input componentType="currency" />
//       </Form.Item> */}

//       {/* <Form.Item
//         name="amount"
//         label="Amount"
//         rules={[{ required: true, message: "Please input the amount!" }]}
//       >
//         <InputNumber step={0.01} min={0} /> */}
//       {/* <InputNumber step={0.01} min={0} /> */}
//       {/* <Lookup /> */}
//       {/* <Select>
//           <Option value="store_1">Store 1</Option>
//         </Select> */}
//       {/* <InputNumber step={0.01} min={0} addonAfter="USD" /> */}
//       {/* <Input
//           allowClear
//           autoComplete="off"
//           bordered={true}
//           defaultValue="Hello"
//           size="large"
//           status="warning"
//           showCount
//           maxLength={100}
//           name="username"
//           onChange={handleChange}
//         /> */}
//       {/* </Form.Item> */}

//       {/* <Form.Item
//         name="trans_date"
//         label="Transaction Date"
//         rules={[
//           { required: true, message: "Please select the transaction date!" },
//         ]}
//       >
//         <DatePicker format="YYYY-MM-DD" />

//       </Form.Item> */}
//       <DateComponent
//         name={"trans_date"}
//         label={"Transaction Date"}
//         rules={[
//           { required: true, message: "Please select the transaction date!" },
//         ]}
//         formate={"YYYY-MM-DD"}
//         formComponentProps={formComponentProps}
//         handleFormPropsChange={handleFormComponentChange}
//         customComponentProps={{ updateFlag: true }}
//       />

//       <Form.Item
//         name="main_category"
//         label="Main Category"
//         rules={[{ required: true, message: "Please select a main category!" }]}
//       >
//         <Input />
//       </Form.Item>
//       {/* <Lookup
//         id={"main_category"}
//         label={"Main Category"}
//         required={true}
//         requiredMsg={"Please select a main category!"}
//       /> */}
//       <Form.Item
//         name="user_category"
//         label="User Category"
//         rules={[{ required: true, message: "Please select a user category!" }]}
//       >
//         <Input />
//       </Form.Item>
//       {/* <Form.Item name="description" label="Description">
//         <TextArea rows={4} />
//       </Form.Item> */}
//       <InputTextAreaComponent
//         name={"description"}
//         label={"Description"}
//         formComponentProps={formComponentProps}
//         handleFormPropsChange={handleFormComponentChange}
//         customComponentProps={{ updateFlag: true }}
//       />
//       <RadioComponent
//         name="radio_tag"
//         options={radioOptions}
//         direction="horizontal"
//         formComponentProps={formComponentProps}
//         handleFormPropsChange={handleFormComponentChange}
//         customComponentProps={{ updateFlag: false }}
//       />
//       {/* <DropDownComponent
//         name="selected_category"
//         Menus={DropdownMenus}
//         updateFlag={true}
//       /> */}
//       <SelectComponent
//         name="selectComponent"
//         label="Select Component"
//         options={selectOptions}
//         formComponentProps={formComponentProps}
//         handleFormPropsChange={handleFormComponentChange}
//         customComponentProps={{ updateFlag: false }}
//       />
//       <SingleCheckboxComponent
//         name="acceptTerms"
//         label="Accept Terms and Conditions"
//         checked={true}
//         formComponentProps={formComponentProps}
//         handleFormPropsChange={handleFormComponentChange}
//         customComponentProps={{ updateFlag: false }}
//       />
//       <CheckBoxComponent
//         name="myCheckbox"
//         label="Choose Options"
//         options={checkboxOptions}
//         defaultValue={["A", "C"]} // Setting which values are checked by default
//         layout="horizontal"
//         formComponentProps={formComponentProps}
//         handleFormPropsChange={handleFormComponentChange}
//         customComponentProps={{ updateFlag: false }}
//       />
//       {isEditing && (
//         <Form.Item name="active" label="Status">
//           <Input disabled />
//           {/* <Switch /> */}
//         </Form.Item>
//       )}

//       <ButtonComponent editForm={isEditing ? true : false} />
//     </Form>
//   );
// };

// export default TransactionAddEditForm;

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
//   // const selectedModelCode = useSelector((state) => state.model.selectedModelCode);
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
