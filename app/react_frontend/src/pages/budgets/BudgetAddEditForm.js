import React, { useEffect } from "react";
import { message } from "antd";
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
  create_budget,
  get_budgets,
  update_budget,
} from "../../redux/features/budget/budgetApiThunk";
import {
  setErrorMsg,
  setResult,
  setSuccessMsg,
} from "../../redux/features/generic/messageSlice";
import { setMessageState } from "../../redux/features/generic/genericSlice";
import FormAddEdit from "../../components/FormComponent/FormAddEdit";
import InputComponent from "../../components/FormComponent/InputComponent";
import InputDecimalNumberComponent from "../../components/FormComponent/InputDecimalNumberComponent";
import DateComponent from "../../components/FormComponent/DateComponent";
import SelectComponent from "../../components/FormComponent/SelectComponents";
import DependentLookupComponent from "../../components/Lookup/DependentLookupComponent";
import LookupComponent from "../../components/Lookup/LookupComponent";
import InputTextAreaComponent from "../../components/FormComponent/InputTextAreaComponent";

const { TextArea } = Input;

const BudgetAddEditForm = () => {
  const user_id = useSelector((state) => state.generic.user?.user_id);
  const dispatch = useDispatch();
  const [form] = Form.useForm(); // Initialize form instance

  // // Handle form submission
  const handleModelOk = async (values) => {
    //   let { id, trans_date, main_category, sub_category, description, amount } =
    //     values;
    //   try {
    //     //   const formattedDate = trans_date
    //     //     ? dayjs(trans_date).format("YYYY-MM-DD HH:mm:ss.SSS")
    //     //     : null;
    //     const budgetData = {
    //       amount,
    //       main_category,
    //       sub_category,
    //       description,
    //       user_id,
    //       active: 1,
    //     };
    //     if (isEditing) {
    //       // Edit existing budget
    //       const response = await dispatch(
    //         update_budget({ id, data: budgetData })
    //       ).unwrap();
    //       dispatch(setSelectedRecord(response.budget));
    //       dispatch(setMessageState(setResult("success")));
    //       dispatch(setMessageState(setSuccessMsg(response?.message)));
    //     } else {
    //       // Create new budget
    //       const response = await dispatch(
    //         create_budget({ data: budgetData })
    //       ).unwrap();
    //       dispatch(setSelectedRecord(response?.budget));
    //       dispatch(setIsEditing(true));
    //       dispatch(get_budgets());
    //       dispatch(setMessageState(setResult("success")));
    //       dispatch(setMessageState(setSuccessMsg(response?.message)));
    //     }
    //     dispatch(get_budgets());
    //   } catch (error) {
    //     dispatch(setMessageState(setResult("error")));
    //     dispatch(setMessageState(setErrorMsg(error?.error?.join(","))));
    //   }
  };

  const selectedRecord = useSelector((state) => state.model.selectedRecord);
  const isEditing = useSelector((state) => state.model.isEditing);

  const paymentMethodOptions = [
    { label: "UPI", value: "upi" },
    { label: "Internet Banking UPI", value: "internet_banking" },
    { label: "Debit Card", value: "debit_card" },
  ];
  const onPaymentMethodChange = () => {};

  useEffect(() => {
    if (selectedRecord && isEditing) {
      const fromDate = selectedRecord.from_date
        ? dayjs(selectedRecord.from_date, "YYYY-MM-DD HH:mm:ss.SSS")
        : null;
      const toDate = selectedRecord.to_date
        ? dayjs(selectedRecord.to_date, "YYYY-MM-DD HH:mm:ss.SSS")
        : null;

      form.setFieldsValue({
        ...selectedRecord,
        from_date: fromDate,
        to_date: toDate,
      });
    } else {
      form.resetFields();
    }
  }, [selectedRecord, isEditing, form]);

  return (
    <FormAddEdit>
      <LookupComponent
        name="account"
        label="Account"
        labelField="code"
        dataField="id"
        dataSourceName="get_accounts"
        lookupService="get_accounts"
        lookupFormatUrl="account_format"
        dataTag="account_id"
        labelTag="account_code"
        filterKeyLabelName="code"
        filterKeyDataName="id"
        validationFlag={true}
        includeInLayout={true}
        visible={true}
        rules={[
          {
            required: true,
            message: "Please Select Account #",
          },
        ]}
      />
      <LookupComponent
        name="main_category"
        label="Main Category"
        labelField="code"
        dataField="id"
        dataSourceName="get_main_categories"
        lookupService="get_main_categories"
        lookupFormatUrl="main_categories"
        dataTag="main_category_id"
        labelTag="main_category_code"
        filterKeyLabelName="code"
        filterKeyDataName="id"
        validationFlag={true}
        rules={[
          {
            required: true,
            message: "Please Select Main Category!",
          },
        ]}
        form={form}
      />
      <DependentLookupComponent
        name="sub_category"
        label="Sub Category "
        labelField="code"
        dataField="id"
        dataSourceName="get_sub_categories"
        lookupService="get_sub_categories"
        lookupFormatUrl="main_categories"
        dataTag="sub_category_id"
        labelTag="sub_category_code"
        filterKeyLabelName="code"
        filterKeyDataName="id"
        validationFlag={true}
        mainLookupValue={form.getFieldValue("main_category")}
        mainLookupName="main_category"
        //   includeInLayout={isSubCategoryVisible ? true : false}
        //   visible={isSubCategoryVisible ? true : false}
        rules={[
          {
            required: true,
            message: "Please Select Sub Category!",
          },
        ]}
        form={form}
      />
      <SelectComponent
        name="payment_method"
        label="Payment Method"
        customComponentProps={{ updateFlag: true }}
        options={paymentMethodOptions}
        defaultValue="upi"
        placeholder="Choose an payment method"
        rules={[{ required: true, message: "Please Select payment method!" }]}
        onChangeHandler={onPaymentMethodChange}
        // disabled={isEditing ? true : false}
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

      <InputComponent
        name="tag"
        label="Tag"
        // disabled={isEditing ? true : false}
        // includeInLayout={isEditing ? true : false}
        customComponentProps={{ updateFlag: true }}
        // style={{
        //   fontWeight: "bold",
        //   color: "black",
        //   // fontSize: "24px", // Adjust font size as needed
        // }}
      />
      <DateComponent
        name={"from_date"}
        label={"From Date"}
        rules={[{ required: true, message: "Please select the from date!" }]}
        formate={"YYYY-MM-DD"}
        customComponentProps={{ updateFlag: true }}
      />
      <DateComponent
        name="to_date"
        label={"To Date"}
        rules={[{ required: true, message: "Please select the to date!" }]}
        formate={"YYYY-MM-DD"}
        customComponentProps={{ updateFlag: true }}
      />
      <InputDecimalNumberComponent
        name="alert_amount"
        label="Alert Amount"
        rules={[{ required: true, message: "Please  Enter Alert amount!" }]}
        step={0.01}
        min={0}
        addonAfter="INR"
        customComponentProps={{ updateFlag: true }}
      />
      <InputTextAreaComponent
        name={"description"}
        label={"Description"}
        customComponentProps={{ updateFlag: true }}
      />
    </FormAddEdit>
  );
};

export default BudgetAddEditForm;
