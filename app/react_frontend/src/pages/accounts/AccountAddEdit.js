import React, { useEffect } from "react";
import FormAddEdit from "../../components/FormComponent/FormAddEdit";
import { useSelector } from "react-redux";
import { Form } from "antd";
import InputComponent from "../../components/FormComponent/InputComponent";
import SelectComponent from "../../components/FormComponent/SelectComponents";
import InputNumberComponent from "../../components/FormComponent/InputNumberComponent";
import LookupComponent from "../../components/Lookup/LookupComponent";
import InputTextAreaComponent from "../../components/FormComponent/InputTextAreaComponent";
import InputDecimalNumberComponent from "../../components/FormComponent/InputDecimalNumberComponent";

const AccountAddEdit = () => {
  const isEditing = useSelector((state) => state.model.isEditing);
  const [form] = Form.useForm();

  const selectedRecord = useSelector((state) => state.model.selectedRecord);

  const currencyOptions = [
    { value: "INR", label: "Indian Rupees" },
    { value: "USD", label: "US Dollar" },
  ];
  const currencyChangeAmount = (newCurrency, oldCurrency, balanceValue) => {
    // apply logic for currency change
    if (newCurrency !== oldCurrency) {
      switch (oldCurrency) {
        case "INR":
          let inrValue = balanceValue * 0.012;
          return inrValue;
          break;
        case "USD":
          let usValue = balanceValue * 84.75;
          return usValue;
          break;
        default:
          return 0;
      }
    }
    return 0;
  };
  const onChangeCurrency = (fieldName, value) => {
    // if (fieldName == "code") {
    //   bankOptions.map((bank) => {
    //     if (bank?.value === value) {
    //       form.setFieldsValue({
    //         name: bank?.label,
    //       });
    //     }
    //   });
    // }
    if (fieldName == "currency") {
      let oldcurrency = selectedRecord?.currency;
      if (oldcurrency && value != oldcurrency) {
        let balanceValue = selectedRecord?.balance;
        let amount = currencyChangeAmount(value, oldcurrency, balanceValue);
        form.setFieldsValue({
          balance: amount,
        });
      }
    }
  };
  const handleInitialBalanceChange = (value) => {
    form.setFieldsValue({
      balance: value,
    });
  };
  useEffect(() => {}, [selectedRecord, isEditing, form]);
  return (
    <>
      <FormAddEdit form={form}>
        <InputComponent
          name="code"
          label="Select Account"
          customComponentProps={{ updateFlag: true }}
          style={{
            fontWeight: "bold",
            color: "black",
            // fontSize: "24px", // Adjust font size as needed
          }}
          rules={[{ required: true, message: "code cannot be blank!" }]}
          disabled={isEditing ? true : false}
        />
        <InputComponent
          name="name"
          label="Account Name"
          //   disabled={isEditing ? true : false}
          //   includeInLayout={isEditing ? true : false}
          customComponentProps={{ updateFlag: true }}
          style={
            {
              // fontWeight: "bold",
              // color: "black",
              // fontSize: "24px", // Adjust font size as needed
            }
          }
          rules={[{ required: true, message: "Account Name is missing" }]}
          //   disabled={true}
        />
        <SelectComponent
          name="currency"
          label="Currency"
          customComponentProps={{ updateFlag: true }}
          options={currencyOptions}
          defaultValue="INR"
          placeholder="Choose an currency"
          rules={[{ required: true, message: "Please Select Currency!" }]}
          onChangeHandler={onChangeCurrency}
          // disabled={isEditing ? true : false}
        />

        <LookupComponent
          name="bank"
          label="Bank"
          labelField="code"
          dataField="id"
          dataSourceName="get_banks"
          lookupService="get_banks"
          lookupFormatUrl="bank_format"
          dataTag="bank_id"
          labelTag="bank_code"
          filterKeyLabelName="code"
          filterKeyDataName="id"
          validationFlag={true}
          rules={[
            {
              required: true,
              message: "Please Select Bank!",
            },
          ]}
        />
        <InputDecimalNumberComponent
          name="initial_balance"
          label="Initial Balance"
          rules={[{ required: true, message: "Please enter Initial Balance!" }]}
          maxLength={8}
          //   addonAfter="USD"
          customComponentProps={{ updateFlag: true }}
          disabled={isEditing ? true : false}
          onChangeHandler={handleInitialBalanceChange}
        />
        <InputDecimalNumberComponent
          name="balance"
          label="Balance"
          rules={[{ required: true, message: "Please enter Balance!" }]}
          maxLength={8}
          //   addonAfter="USD"
          disabled={isEditing ? true : true}
          customComponentProps={{ updateFlag: true }}
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

export default AccountAddEdit;
