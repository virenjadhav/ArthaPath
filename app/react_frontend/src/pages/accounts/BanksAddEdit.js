import React, { useEffect, useRef, useState } from "react";
import FormAddEdit, {
  get_form,
} from "../../components/FormComponent/FormAddEdit";
import SelectComponent from "../../components/FormComponent/SelectComponents";
import InputComponent from "../../components/FormComponent/InputComponent";
import InputTextAreaComponent from "../../components/FormComponent/InputTextAreaComponent";
import InputDecimalNumberComponent from "../../components/FormComponent/InputDecimalNumberComponent";
import { useSelector } from "react-redux";
import InputNumberComponent from "../../components/FormComponent/InputNumberComponent";
import { Button, Form, Input, Upload } from "antd";
import dayjs from "dayjs";
import UploadComponent from "../../components/FormComponent/UploadComponent";
const countryOptions = [
  { value: "india", label: "India" },
  { value: "usa", label: "USA" },
];

const bankOptions = [
  { value: "SBI", label: "State Bank Of India" },
  { value: "PNB", label: "Punjab National Bank" },
  { value: "Kotak", label: "Kotak Mahindra Bank" },
  { value: "Axis", label: "Axis Bank" },
  { value: "Bandhan", label: "Bandhan Bank India" },
  { value: "BankOfBaroda", label: "Bank of Baroda" },
  { value: "BankOfIndia", label: "Bank of India" },
  { value: "Canara", label: "Canara Bank" },
  { value: "CentralBank", label: "Central Bank of India" },
  { value: "Federal", label: "Federal Bank of India" },
  { value: "HDFC", label: "HDFC Bank" },
  { value: "ICICI", label: "ICICI Bank" },
  { value: "IDBI", label: "IDBI Bank" },
  { value: "IndusInd", label: "IndusInd Bank" },
  { value: "RBL", label: "RBL Bank" },
  { value: "UCO", label: "UCO Bank" },
  { value: "UnionBank", label: "Union Bank of India" },
  { value: "YesBank", label: "Yes Bank" },
];

const BanksAddEdit = () => {
  const isEditing = useSelector((state) => state.model.isEditing);
  const [form] = Form.useForm();

  const selectedRecord = useSelector((state) => state.model.selectedRecord);
  const [imageName, setImageName] = useState("");

  // Handle image selection
  // const handleImageSelect = (file) => {
  //   setImageName(file.name); // Set image name with extension in the input
  //   const formData = new FormData();
  //   formData.append("image", file);

  //   // Send the image to the Rails backend
  //   // axios
  //   //   .post("/images/upload", formData, {
  //   //     headers: { "Content-Type": "multipart/form-data" },
  //   //   })
  //   //   .then((response) => {
  //   //     message.success("Image uploaded successfully!");
  //   //     form.setFieldsValue({ image_name: file.name }); // Update form value
  //   //   })
  //   //   .catch((error) => {
  //   //     message.error("Image upload failed!");
  //   //     console.error(error);
  //   //   });

  //   // Prevent default upload behavior
  //   return false;
  // };
  const handleSelectImageHandler = () => {};
  const onChangeCategoryType = (fieldName, value) => {
    // const form = formAddEditRef?.current?.getForm();
    // const formInstance = formAddEditRef.current.getFormInstance();
    // const allValues = formInstance.getFieldsValue();
    // const isSub = value === "sub";
    if (fieldName == "code") {
      // setIsSubCategoryVisible(isSub);
      bankOptions.map((bank) => {
        if (bank?.value === value) {
          form.setFieldsValue({
            name: bank?.label,
          });
        }
      });
    }
  };
  useEffect(() => {
    // if (selectedRecord && isEditing) {
    //   const formattedDate = selectedRecord.trans_date
    //     ? dayjs(selectedRecord.trans_date, "YYYY-MM-DD HH:mm:ss.SSS")
    //     : null;
    //   //   const category_type = form.getFieldValue("user_category_type");
    //   const category_type = selectedRecord?.user_category_type;
    //   if (category_type === "sub") {
    //     // setIsSubCategoryVisible(true);
    //   } else {
    //     // setIsSubCategoryVisible(false);
    //   }
    //   form?.setFieldsValue({
    //     ...selectedRecord,
    //     trans_date: formattedDate,
    //   });
    // } else {
    //   form?.resetFields();
    // }
  }, [selectedRecord, isEditing, form]);
  return (
    <>
      {/* <FormAddEdit ref={formAddEditRef} onValuesChangeCallback={handleValuesChange}> */}
      <FormAddEdit form={form}>
        {/* <FormAddEdit > */}
        <SelectComponent
          name="code"
          label="Select Bank"
          customComponentProps={{ updateFlag: true }}
          options={bankOptions}
          defaultValue=""
          placeholder="Choose an option"
          rules={[{ required: true, message: "Please Select type!" }]}
          onChangeHandler={onChangeCategoryType}
          // disabled={isEditing ? true : false}
        />
        <InputComponent
          name="name"
          label="Bank Name"
          //   disabled={isEditing ? true : false}
          //   includeInLayout={isEditing ? true : false}
          customComponentProps={{ updateFlag: true }}
          style={{
            // fontWeight: "bold",
            color: "black",
            // fontSize: "24px", // Adjust font size as needed
          }}
          rules={[{ required: true, message: "Bank Name is missing" }]}
          disabled={true}
        />
        <InputComponent
          name="bank_owner_name"
          label="Bank Owner Name"
          //   disabled={isEditing ? true : false}
          //   includeInLayout={isEditing ? true : false}
          customComponentProps={{ updateFlag: true }}
          style={{
            // fontWeight: "bold",
            color: "black",
            // fontSize: "24px", // Adjust font size as needed
          }}
          rules={[{ required: true, message: "Owner Name is required!" }]}
          // disabled={true}
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
            // fontWeight: "bold",
            color: "black",
            // fontSize: "24px", // Adjust font size as needed
          }}
          rules={[{ required: true, message: "city is missing" }]}
          // disabled={true}
        />
        <InputComponent
          name="state"
          label="State"
          //   disabled={isEditing ? true : false}
          //   includeInLayout={isEditing ? true : false}
          customComponentProps={{ updateFlag: true }}
          style={{
            // fontWeight: "bold",
            color: "black",
            // fontSize: "24px", // Adjust font size as needed
          }}
          rules={[{ required: true, message: "State is missing" }]}
          // disabled={true}
        />
        <InputNumberComponent
          name="zip_code"
          label="Zip"
          rules={[{ required: true, message: "Please enter Zip!" }]}
          maxLength={6}
          //   addonAfter="USD"
          customComponentProps={{ updateFlag: true }}
        />
        {/* <InputComponent
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
        /> */}
        <SelectComponent
          name="country"
          label="Country"
          customComponentProps={{ updateFlag: true }}
          options={countryOptions}
          defaultValue="india"
          placeholder="Choose an option"
          rules={[{ required: true, message: "Please Select country!" }]}
          // onChangeHandler={onChangeCategoryType}
          // disabled={isEditing ? true : false}
        />
        <InputComponent
          name="ifsc_code"
          label="IFSC Code"
          //   disabled={isEditing ? true : false}
          //   includeInLayout={isEditing ? true : false}
          customComponentProps={{ updateFlag: true }}
          style={{
            // fontWeight: "bold",
            color: "black",
            // fontSize: "24px", // Adjust font size as needed
          }}
          rules={[{ required: true, message: "IFSC code is missing" }]}
          // disabled={true}
        />
        <InputNumberComponent
          name="account_number"
          label="Enter last 6 digit of Account No"
          rules={[{ required: true, message: "Please enter Zip!" }]}
          maxLength={6}
          //   addonAfter="USD"
          customComponentProps={{ updateFlag: true }}
        />
        {/* <Form.Item
        label="Select Image"
        name="image"
        rules={[{ required: true, message: "Please upload an image!" }]}
      >
        <Upload
          beforeUpload={handleImageSelect}
          showUploadList={false} // Disable default upload list
          accept="image/*" // Allow only image files
        >
          <Button type="primary">Select Image</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Image Name" name="image_name">
        <Input value={imageName} disabled /> 
      </Form.Item> */}
        <UploadComponent
          name="icon"
          label="Icon"
          buttonLabel="Select Image"
          handleSelectImageHandler={handleSelectImageHandler}
          serviceId={"uploadBankIcon"}
          customComponentProps={{ updateFlag: true }}
        />
      </FormAddEdit>
    </>
  );
};

export default BanksAddEdit;
