import React, { useEffect, useState } from "react";
import FormAddEdit from "../../components/FormComponent/FormAddEdit";
import InputComponent from "../../components/FormComponent/InputComponent";
import InputDecimalNumberComponent from "../../components/FormComponent/InputDecimalNumberComponent";
import DateComponent from "../../components/FormComponent/DateComponent";
import LookupComponent from "../../components/Lookup/LookupComponent";
import DependentLookupComponent from "../../components/Lookup/DependentLookupComponent";
import SelectComponent from "../../components/FormComponent/SelectComponents";
import { useSelector } from "react-redux";
import { Form } from "antd";
import InputTextAreaComponent from "../../components/FormComponent/InputTextAreaComponent";
import { ModelInfo } from "../../components/ModelInfo";

const DebtLineAddEditForm = () => {
  const isEditing = useSelector((state) => state.model.isEditing);
  const selectedRecord = useSelector((state) => state.model.selectedRecord);
  const selectedMainRecord = useSelector(
    (state) => state.model.selectedMainRecord
  );
  const [form] = Form.useForm(); // Initialize form instance
  const [defaultMainCategory, setDefaultMainCategory] = useState({
    dataValue: null,
    labelValue: "BORROW",
  });
  const isModelVisible = useSelector((state) => state.model.isModelVisible);
  useEffect(() => {
    if (!isModelVisible) {
      setDefaultMainCategory({
        dataValue: null,
        labelValue: "BORROW",
      });
    }
  }, [isModelVisible]);
  const paymentMethodOptions = [
    { label: "UPI", value: "upi" },
    { label: "Internet Banking UPI", value: "internet_banking" },
    { label: "Debit Card", value: "debit_card" },
  ];
  const debtTypeOptions = [
    { value: "borrow", label: "Borrow" },
    { value: "lend", label: "Lend" },
  ];
  const debtPaymentTypeOptions = [
    { value: "REPAYMENT", label: "Repayment" },
    { value: "ADDITIONAL", label: "Additional" },
  ];
  const onPaymentMethodChange = () => {};
  const onDebtTypeChange = (name, value) => {
    if (name === "debt_type") {
      if (value === "borrow") {
        setDefaultMainCategory({ dataValue: null, labelValue: "BORROW" });
      } else if (value === "lend") {
        setDefaultMainCategory({ dataValue: null, labelValue: "LEND" });
      }
    }
  };
  const preSaveHandler = (values) => {
    if (form) {
      let total_amount = parseFloat(form?.getFieldValue("amount"));
      let remaining_amount = 0;
      if (form?.getFieldValue("remaining_amount")) {
        remaining_amount = parseFloat(form?.getFieldValue("remaining_amount"));
      }
      if (!isEditing && !selectedRecord && selectedMainRecord) {
        if (selectedMainRecord?.debt_amount) {
          remaining_amount = parseFloat(selectedMainRecord?.debt_amount);
        }
      }
      if (selectedRecord?.amount) {
        remaining_amount += parseFloat(selectedRecord?.amount);
      }
      if (total_amount > remaining_amount) {
        let msg = "Amount cannot be greater than remaining amount";
        console.error(msg);
        ModelInfo({
          title: msg,
        });
        return false;
      }
    }
    return true;
  };
  return (
    <>
      <FormAddEdit form={form} preSaveHandler={preSaveHandler}>
        <InputComponent
          name="debt_code"
          label="Debt #"
          disabled={true}
          includeInLayout={isEditing}
          customComponentProps={{ updateFlag: true }}
          style={{
            fontWeight: "bold",
            color: "black",
            // fontSize: "24px", // Adjust font size as needed
          }}
        />
        <InputComponent
          name="trans_no"
          label="Trans #"
          disabled={true}
          includeInLayout={isEditing}
          customComponentProps={{ updateFlag: true }}
          style={{
            fontWeight: "bold",
            color: "black",
            // fontSize: "24px", // Adjust font size as needed
          }}
        />
        <InputComponent
          name="serial_no"
          label="Line #"
          disabled={true}
          includeInLayout={isEditing}
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
          // addonAfter="INR"
          customComponentProps={{ updateFlag: true }}
        />
        <InputDecimalNumberComponent
          name="remaining_amount"
          label="Remaining Amount"
          step={0.01}
          min={0}
          //   addonAfter="INR"
          customComponentProps={{ updateFlag: true }}
          disabled={true}
          includeInLayout={isEditing}
        />
        <DateComponent
          name={"pay_date"}
          label={"Pay Date"}
          rules={[
            { required: true, message: "Please select the transaction date!" },
          ]}
          formate={"YYYY-MM-DD"}
          customComponentProps={{ updateFlag: true }}
        />
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
          form={form}
        />
        <SelectComponent
          name="debt_type"
          label="Debt Type"
          customComponentProps={{ updateFlag: true }}
          options={debtTypeOptions}
          defaultValue="borrow"
          placeholder="Choose an option"
          rules={[{ required: true, message: "Please Select Debt Type!" }]}
          disabled={isEditing}
          onChangeHandler={onDebtTypeChange}
        />
        <SelectComponent
          name="debt_payment_type"
          label="Debt Payment Type"
          customComponentProps={{ updateFlag: true }}
          options={debtPaymentTypeOptions}
          defaultValue="REPAYMENT"
          placeholder="Choose an option"
          rules={[
            { required: true, message: "Please Select Debt Payment Type!" },
          ]}
          // disabled={isEditing ? true : false}
        />
        {/* <LinkModel label="split" /> */}
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
          // defaultDataValue={isEditing ? null : defaultMainCategory.dataValue}
          // defaultLabelValue={isEditing ? null : defaultMainCategory.labelValue}
          changeValuesData={defaultMainCategory}
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
        <InputTextAreaComponent
          name={"description"}
          label={"Description"}
          customComponentProps={{ updateFlag: true }}
        />
      </FormAddEdit>
    </>
  );
};

export default DebtLineAddEditForm;
