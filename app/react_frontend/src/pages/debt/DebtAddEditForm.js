import React from "react";
import { Form, InputNumber } from "antd";
import { useSelector } from "react-redux";
import FormAddEdit from "../../components/FormComponent/FormAddEdit";
import InputComponent from "../../components/FormComponent/InputComponent";
import InputPhoneNumberComponent from "../../components/FormComponent/InputPhoneNumberComponent";
import InputEmailComponent from "../../components/FormComponent/InputEmailComponent";
import InputDecimalNumberComponent from "../../components/FormComponent/InputDecimalNumberComponent";
import SelectComponent from "../../components/FormComponent/SelectComponents";
import DateComponent from "../../components/FormComponent/DateComponent";
import UploadComponent from "../../components/FormComponent/UploadComponent";
import InputTextAreaComponent from "../../components/FormComponent/InputTextAreaComponent";
import LookupComponent from "../../components/Lookup/LookupComponent";
import { ModelInfo } from "../../components/ModelInfo";

const DebtAddEditForm = () => {
  const [form] = Form.useForm();
  const isEditing = useSelector((state) => state.model.isEditing);
  const interestTypeOptions = [
    { value: "FLAT", label: "Flat" },
    { value: "Compound", label: "Compound" },
  ];
  const debtTypeOptions = [
    { value: "borrow", label: "Borrow" },
    { value: "lend", label: "Lend" },
  ];
  const paymentMethodOptions = [
    { label: "UPI", value: "upi" },
    { label: "Internet Banking UPI", value: "internet_banking" },
    { label: "Debit Card", value: "debit_card" },
  ];
  const handleSelectImageHandler = () => {};
  const onPaymentMethodChange = () => {};
  const onAmountChange = (value) => {};
  const preSaveHandler = (values) => {
    let msg = "";
    if (form) {
      let total_amount = 0;
      let paid_amount = 0;
      if (form?.getFieldValue("intial_paid_amount")) {
        paid_amount = parseFloat(form?.getFieldValue("intial_paid_amount"));
      } else {
        msg += "Please Provide Initial Paid Amount \n";
      }
      if (form?.getFieldValue("initial_amount")) {
        total_amount = parseFloat(form?.getFieldValue("initial_amount"));
      } else {
        msg += "Please Provide Initial Amount \n";
      }
      let extra_amount = 0;
      if (form?.getFieldValue("extra_amount")) {
        extra_amount = parseFloat(form?.getFieldValue("extra_amount"));
      }
      if (paid_amount > total_amount + extra_amount) {
        msg += "Paid Amount cannot be greater than Total Amount \n";
      }
    }
    if (msg !== "") {
      ModelInfo({ title: msg });
      return false;
    }
    return true;
  };
  return (
    <>
      <FormAddEdit form={form} preSaveHandler={preSaveHandler}>
        <InputComponent
          name="debt_code"
          label="Code #"
          customComponentProps={{ updateFlag: true }}
          style={{
            fontWeight: "bold",
            color: "black",
            // fontSize: "24px", // Adjust font size as needed
          }}
          formStyle={{ marginBottom: "20px" }}
          help={
            isEditing
              ? null
              : "If you want to generate code automatically then leave code as blank."
          }
          disabled={isEditing}
        />
        <InputComponent
          name="debt_name"
          label="Name"
          customComponentProps={{ updateFlag: true }}
          //   style={{
          //     fontWeight: "bold",
          //     color: "black",
          //     // fontSize: "24px", // Adjust font size as needed
          //   }}
          rules={[{ required: true, message: "Please Select Debt Name!" }]}
        />
        <InputPhoneNumberComponent
          name="contact_no"
          label="Contact"
          customComponentProps={{ updateFlag: true }}
          //   style={{
          //     fontWeight: "bold",
          //     color: "black",
          //     // fontSize: "24px", // Adjust font size as needed
          //   }}
          //   rules={[
          //     {
          //       required: true,
          //       message: "Please input your phone number!",
          //     },
          //   ]}
          maxLength={10}
        />
        <InputEmailComponent
          name="contact_email"
          label="Email"
          customComponentProps={{ updateFlag: true }}
          //   style={{
          //     fontWeight: "bold",
          //     color: "black",
          //     // fontSize: "24px", // Adjust font size as needed
          //   }}
          //   rules={[
          //     {
          //       required: true,
          //       message: "Please input your email!",
          //     },
          //   ]}
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
          includeInLayout={isEditing ? false : true}
          visible={isEditing ? false : true}
          rules={[
            {
              required: true,
              message: "Please Select Account #",
            },
          ]}
          form={form}
        />
        <InputDecimalNumberComponent
          name="initial_amount"
          label={isEditing ? "Initial Amount" : `Total Amount`}
          rules={[{ required: true, message: "Please input the amount!" }]}
          step={0.01}
          min={0}
          customComponentProps={{ updateFlag: true }}
          initialValue={0}
          disabled={false}
        />
        <InputDecimalNumberComponent
          name="intial_paid_amount"
          label={isEditing ? "Initial Paid Amount" : ` Paid Amount`}
          rules={[{ required: true, message: "Please input the amount!" }]}
          step={0.01}
          min={0}
          //   addonAfter="INR"
          customComponentProps={{ updateFlag: true }}
          // disabled={isEditing}
          initialValue={0}
          disabled={false}
        />
        {/* <InputDecimalNumberComponent
          name="total_amount_without_interest"
          label="Total Amount W/O Interest"
          rules={[{ required: true, message: "Please input the amount!" }]}
          step={0.01}
          min={0}
          //   addonAfter="INR"
          customComponentProps={{ updateFlag: true }}
          disabled={isEditing}
        />
        <InputDecimalNumberComponent
          name="interest_amount"
          label="Interest Amount"
          rules={[{ required: true, message: "Please input the amount!" }]}
          step={0.01}
          min={0}
          //   addonAfter="INR"
          customComponentProps={{ updateFlag: true }}
          disabled={isEditing}
        /> */}
        <InputDecimalNumberComponent
          name="amount"
          label="Total Amount"
          rules={[{ required: true, message: "Please input the amount!" }]}
          step={0.01}
          min={0}
          //   addonAfter="INR"
          customComponentProps={{ updateFlag: true }}
          disabled={true}
          onChangeHandler={onAmountChange}
          includeInLayout={isEditing}
          initialValue={0}
        />
        <InputDecimalNumberComponent
          name="paid_amount"
          label="Paid Amount"
          rules={[{ required: true, message: "Please input the amount!" }]}
          step={0.01}
          min={0}
          //   addonAfter="INR"
          customComponentProps={{ updateFlag: true }}
          disabled={true}
          includeInLayout={isEditing}
          initialValue={0}
        />
        <InputDecimalNumberComponent
          name="debt_amount"
          label="Remaining Amount"
          step={0.01}
          min={0}
          //   addonAfter="INR"
          customComponentProps={{ updateFlag: true }}
          disabled={true}
          initialValue={0}
          includeInLayout={isEditing}
        />
        <InputDecimalNumberComponent
          name="extra_amount"
          label="Extra Amount/Charge"
          step={0.01}
          min={0}
          //   addonAfter="INR"
          customComponentProps={{ updateFlag: true }}
          initialValue={0}
        />
        {/* <SelectComponent
          name="interest_type"
          label="Interest Type"
          customComponentProps={{ updateFlag: true }}
          options={interestTypeOptions}
          defaultValue="FLAT"
          placeholder="Choose an option"
          rules={[{ required: true, message: "Please Select Interest Type!" }]}
          disabled={isEditing ? true : false}
        />
        <InputDecimalNumberComponent
          name="interest_rate"
          label="Interest Rate"
          step={0.01}
          min={0}
          //   addonAfter="INR"
          customComponentProps={{ updateFlag: true }}
        /> */}
        <DateComponent
          name={"pay_date"}
          label={"Pay Date"}
          //   rules={[{ required: true, message: "Please select the Due date!" }]}
          formate={"YYYY-MM-DD"}
          customComponentProps={{ updateFlag: true }}
          rules={[{ required: true, message: "Please Select Pay Date!" }]}
        />
        <DateComponent
          name={"due_date"}
          label={"Due Date"}
          //   rules={[{ required: true, message: "Please select the Due date!" }]}
          formate={"YYYY-MM-DD"}
          customComponentProps={{ updateFlag: true }}
        />
        <InputComponent
          name="status"
          label="Status"
          disabled={isEditing ? true : false}
          includeInLayout={isEditing ? true : false}
          customComponentProps={{ updateFlag: true }}
          defaultValue="Active"
          //   style={{
          //     fontWeight: "bold",
          //     color: "black",
          //     // fontSize: "24px", // Adjust font size as needed
          //   }}
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
          disabled={isEditing}
          includeInLayout={!isEditing}
        />
        <InputTextAreaComponent
          name={"description"}
          label={"Description"}
          customComponentProps={{ updateFlag: true }}
        />
        <UploadComponent
          name="attachment_file_name"
          label="Attachment"
          buttonLabel="Select Image"
          handleSelectImageHandler={handleSelectImageHandler}
          serviceId={"uploadDebtAttachmentFile"}
          customComponentProps={{ updateFlag: true }}
        />
      </FormAddEdit>
    </>
  );
};

export default DebtAddEditForm;
