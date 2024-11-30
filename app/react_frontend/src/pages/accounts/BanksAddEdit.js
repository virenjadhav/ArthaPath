import React from "react";
import FormAddEdit from "../../components/FormComponent/FormAddEdit";
import SelectComponent from "../../components/FormComponent/SelectComponents";
import InputComponent from "../../components/FormComponent/InputComponent";
import InputTextAreaComponent from "../../components/FormComponent/InputTextAreaComponent";
import InputDecimalNumberComponent from "../../components/FormComponent/InputDecimalNumberComponent";
import { useSelector } from "react-redux";
import InputNumberComponent from "../../components/FormComponent/InputNumberComponent";
const typeOptions = [
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
];

const bankOptions = [
  { value: "SBI", label: "State Bank Of India" },
  { value: "PNB", label: "Punjab National Bank" },
  { value: "Kotak", label: "Kotak Mahindra Bank" },
  { value: "Axis", label: "Axis Bank" },
  { value: "Bandhan", label: "Bandhan Bank India" },
  { value: "BankOfBaroda", label: "Bank of Baroda" },
  { value: "Kotak", label: "Kotak Mahindra Bank" },
  { value: "Kotak", label: "Kotak Mahindra Bank" },
  { value: "Kotak", label: "Kotak Mahindra Bank" },
  { value: "Kotak", label: "Kotak Mahindra Bank" },
  { value: "Kotak", label: "Kotak Mahindra Bank" },
  { value: "Kotak", label: "Kotak Mahindra Bank" },
  { value: "Kotak", label: "Kotak Mahindra Bank" },
  { value: "Kotak", label: "Kotak Mahindra Bank" },
  { value: "Kotak", label: "Kotak Mahindra Bank" },
  { value: "Kotak", label: "Kotak Mahindra Bank" },
  { value: "Kotak", label: "Kotak Mahindra Bank" },
];

const BanksAddEdit = () => {
  const isEditing = useSelector((state) => state.model.isEditing);
  return (
    <>
      <FormAddEdit>
        <SelectComponent
          name="type"
          label="Select Type"
          customComponentProps={{ updateFlag: true }}
          options={bankOptions}
          defaultValue="expense"
          placeholder="Choose an option"
          rules={[{ required: true, message: "Please Select type!" }]}
          disabled={isEditing ? true : false}
        />
        <InputComponent
          name="name"
          label="Bank Name"
          //   disabled={isEditing ? true : false}
          //   includeInLayout={isEditing ? true : false}
          customComponentProps={{ updateFlag: true }}
          style={{
            fontWeight: "bold",
            color: "black",
            // fontSize: "24px", // Adjust font size as needed
          }}
          rules={[{ required: true, message: "code is missing" }]}
          disabled={true}
        />
        <InputComponent
          name="bank_owner_name"
          label="Bank Owner Name"
          //   disabled={isEditing ? true : false}
          //   includeInLayout={isEditing ? true : false}
          customComponentProps={{ updateFlag: true }}
          style={{
            fontWeight: "bold",
            color: "black",
            // fontSize: "24px", // Adjust font size as needed
          }}
          rules={[{ required: true, message: "code is missing" }]}
          disabled={true}
        />
        <InputTextAreaComponent
          name={"address1"}
          label={"Address"}
          customComponentProps={{ updateFlag: true }}
        />
        <InputTextAreaComponent
          name={"address2"}
          label={"Another Address"}
          customComponentProps={{ updateFlag: true }}
        />
        <InputComponent
          name="city"
          label="City"
          //   disabled={isEditing ? true : false}
          //   includeInLayout={isEditing ? true : false}
          customComponentProps={{ updateFlag: true }}
          style={{
            fontWeight: "bold",
            color: "black",
            // fontSize: "24px", // Adjust font size as needed
          }}
          rules={[{ required: true, message: "code is missing" }]}
          disabled={true}
        />
        <InputComponent
          name="state"
          label="State"
          //   disabled={isEditing ? true : false}
          //   includeInLayout={isEditing ? true : false}
          customComponentProps={{ updateFlag: true }}
          style={{
            fontWeight: "bold",
            color: "black",
            // fontSize: "24px", // Adjust font size as needed
          }}
          rules={[{ required: true, message: "code is missing" }]}
          disabled={true}
        />
        <InputNumberComponent
          name="zip_code"
          label="Zip"
          rules={[{ required: true, message: "Please enter Zip!" }]}
          maxLength={6}
          //   addonAfter="USD"
          customComponentProps={{ updateFlag: true }}
        />
        <InputComponent
          name="country"
          label="Country"
          //   disabled={isEditing ? true : false}
          //   includeInLayout={isEditing ? true : false}
          customComponentProps={{ updateFlag: true }}
          style={{
            fontWeight: "bold",
            color: "black",
            // fontSize: "24px", // Adjust font size as needed
          }}
          rules={[{ required: true, message: "code is missing" }]}
          disabled={true}
        />
        <InputComponent
          name="ifsc_code"
          label="IFSC Code"
          //   disabled={isEditing ? true : false}
          //   includeInLayout={isEditing ? true : false}
          customComponentProps={{ updateFlag: true }}
          style={{
            fontWeight: "bold",
            color: "black",
            // fontSize: "24px", // Adjust font size as needed
          }}
          rules={[{ required: true, message: "code is missing" }]}
          disabled={true}
        />
        <InputNumberComponent
          name="account_number"
          label="Enter last 6 digit of Account No"
          rules={[{ required: true, message: "Please enter Zip!" }]}
          maxLength={6}
          //   addonAfter="USD"
          customComponentProps={{ updateFlag: true }}
        />
      </FormAddEdit>
    </>
  );
};

export default BanksAddEdit;
