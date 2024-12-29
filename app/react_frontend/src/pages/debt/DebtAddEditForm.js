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
  return (
    <>
      <FormAddEdit>
        <InputComponent
          name="debt_code"
          label="Code #"
          customComponentProps={{ updateFlag: true }}
          style={{
            fontWeight: "bold",
            color: "black",
            // fontSize: "24px", // Adjust font size as needed
          }}
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
          disabled={isEditing ? true : false}
        />
        <InputDecimalNumberComponent
          name="amount"
          label="Amount"
          rules={[{ required: true, message: "Please input the amount!" }]}
          step={0.01}
          min={0}
          //   addonAfter="INR"
          customComponentProps={{ updateFlag: true }}
        />
        <InputDecimalNumberComponent
          name="debt_amount"
          label="Remaining Amount"
          step={0.01}
          min={0}
          //   addonAfter="INR"
          customComponentProps={{ updateFlag: true }}
        />
        <SelectComponent
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
