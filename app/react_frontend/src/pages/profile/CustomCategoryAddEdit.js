import { Form } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormAddEdit from "../../components/FormComponent/FormAddEdit";
import InputComponent from "../../components/FormComponent/InputComponent";
import InputDecimalNumberComponent from "../../components/FormComponent/InputDecimalNumberComponent";
import DateComponent from "../../components/FormComponent/DateComponent";
import LookupComponent from "../../components/Lookup/LookupComponent";
import InputTextAreaComponent from "../../components/FormComponent/InputTextAreaComponent";
import SelectComponent from "../../components/FormComponent/SelectComponents";
import DependentLookupComponent from "../../components/Lookup/DependentLookupComponent";

const CustomCategoryAddEdit = () => {
  const user_id = useSelector((state) => state.generic.user?.user_id);
  const dispatch = useDispatch();
  const [form] = Form.useForm(); // Initialize form instance
  const formComponentProps = useRef({});
  const selectedRecord = useSelector((state) => state.model.selectedRecord);
  const isEditing = useSelector((state) => state.model.isEditing);
  // State to control visibility of Sub Category field
  const [isSubCategoryVisible, setIsSubCategoryVisible] = useState(false);
  const typeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];
  const categoryTypeOptions = [
    { value: "main", label: "Main Category" },
    { value: "sub", label: "Sub Category" },
  ];
  //   const handleValuesChange = (changedValues) => {
  //     const isSub = changedValues.user_category_type === "sub";
  //     if (changedValues.user_category_type) {
  //       setIsSubCategoryVisible(isSub);

  //       // Clear Sub Category field when switching to "Main"
  //       if (!isSub) {
  //         form.resetFields(["sub_category_lookup"]);
  //       }
  //     }
  //   };
  const onChangeCategoryType = (name, value) => {
    const isSub = value === "sub";
    if (name == "user_category_type") {
      setIsSubCategoryVisible(isSub);
    }
  };
  useEffect(() => {
    if (selectedRecord && isEditing) {
      const formattedDate = selectedRecord.trans_date
        ? dayjs(selectedRecord.trans_date, "YYYY-MM-DD HH:mm:ss.SSS")
        : null;
      //   const category_type = form.getFieldValue("user_category_type");
      const category_type = selectedRecord?.user_category_type;
      if (category_type === "sub") {
        setIsSubCategoryVisible(true);
      } else {
        setIsSubCategoryVisible(false);
      }
      form.setFieldsValue({
        ...selectedRecord,
        trans_date: formattedDate,
      });
    } else {
      form.resetFields();
    }
  }, [selectedRecord, isEditing, form]);
  return (
    <>
      <FormAddEdit>
        <InputComponent
          name="code"
          label="Code #"
          //   disabled={isEditing ? true : false}
          //   includeInLayout={isEditing ? true : false}
          customComponentProps={{ updateFlag: true }}
          style={{
            fontWeight: "bold",
            color: "black",
            // fontSize: "24px", // Adjust font size as needed
          }}
          rules={[{ required: true, message: "code is missing" }]}
          disabled={isEditing ? true : false}
        />
        <InputComponent
          name="name"
          label="Name"
          customComponentProps={{ updateFlag: true }}
          rules={[{ required: true, message: "Name is missing" }]}
        />
        <SelectComponent
          name="type"
          label="Select Type"
          customComponentProps={{ updateFlag: true }}
          options={typeOptions}
          defaultValue="expense"
          placeholder="Choose an option"
          rules={[{ required: true, message: "Please Select type!" }]}
          disabled={isEditing ? true : false}
        />
        <SelectComponent
          name="user_category_type"
          label="Select Category Type"
          customComponentProps={{ updateFlag: true }}
          options={categoryTypeOptions}
          defaultValue=""
          placeholder="Choose an option"
          rules={[{ required: true, message: "Please Select Category type!" }]}
          onChangeHandler={onChangeCategoryType}
          disabled={isEditing ? true : false}
        />
        <LookupComponent
          name="main_category_lookup"
          label="Main Category"
          labelField="code"
          dataField="id"
          dataSourceName="get_main_categories"
          lookupService="get_main_categories"
          lookupFormatUrl="main_categories"
          dataTag={isSubCategoryVisible ? "ref_id" : "id"}
          labelTag={isSubCategoryVisible ? "ref_code" : "code"}
          filterKeyLabelName="code"
          filterKeyDataName="id"
          validationFlag={true}
          includeInLayout={isSubCategoryVisible ? true : false}
          visible={isSubCategoryVisible ? true : false}
          rules={[
            {
              required: isSubCategoryVisible,
              message: "Please Select Main Category!",
            },
          ]}
        />

        {/* <DependentLookupComponent
          name="sub_category_lookup"
          label="Sub Category"
          labelField="code"
          dataField="id"
          dataSourceName="get_sub_categories"
          lookupService="get_sub_categories"
          lookupFormatUrl="sub_categories"
          dataTag="sub_category_id"
          labelTag="sub_category_code"
          filterKeyLabelName="code"
          filterKeyDataName="id"
          validationFlag={true}
          mainLookupValue={form.getFieldValue("mainLookup")}
          mainLookupName="main_category_lookup"
          includeInLayout={isSubCategoryVisible ? true : false}
          visible={isSubCategoryVisible ? true : false}
          rules={[
            {
              required: isSubCategoryVisible,
              message: "Please Select Sub Category!",
            },
          ]}
        /> */}

        {/* <InputComponent
          name="trans_no"
          label="Trans #"
          disabled={isEditing ? true : false}
          includeInLayout={isEditing ? true : false}
          customComponentProps={{ updateFlag: true }}
          style={{
            fontWeight: "bold",
            color: "black",
            // fontSize: "24px", // Adjust font size as needed
          }}
        />
        <InputDecimalNumberComponent
          name="amount"
          label="Amount"
          rules={[{ required: true, message: "Please input the amount!" }]}
          step={0.01}
          min={0}
          addonAfter="USD"
          customComponentProps={{ updateFlag: true }}
        />
        <DateComponent
          name={"trans_date"}
          label={"Transaction Date"}
          rules={[
            { required: true, message: "Please select the transaction date!" },
          ]}
          formate={"YYYY-MM-DD"}
          customComponentProps={{ updateFlag: true }}
        />
        <LookupComponent
          name="main_category_lookup"
          label="Main Category"
          labelField="code"
          dataField="id"
          dataSourceName="get_main_categories"
          dataTag="main_category_id"
          labelTag="main_category_code"
          filterKeyLabelName="code"
          filterKeyDataName="id"
          validationFlag={true}
        />
        <InputTextAreaComponent
          name={"description"}
          label={"Description"}
          customComponentProps={{ updateFlag: true }}
        /> */}
      </FormAddEdit>
    </>
  );
};

export default CustomCategoryAddEdit;
