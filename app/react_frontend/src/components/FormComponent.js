import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsEditing,
  setIsModelVisible,
  setSelectedRecord,
} from "../redux/features/generic/modelSlice";

const FormComponent = ({ FormCustomComponent }) => {
  const [editingTransaction, setEditingTransaction] = useState(null);
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const isModelVisible = useSelector((state) => state.model.isModelVisible);
  const dispatch = useDispatch();
  const [form] = Form.useForm(); // Initialize form instance

  const handleModalCancel = () => {
    dispatch(setIsModelVisible(false));
    dispatch(setSelectedRecord(null));
    dispatch(setIsEditing(false));
  };
  const handleModalOk = () => {};
  const handleSaveTransaction = () => {};
  const selectedForm = useSelector((state) => state.model.selectedForm);
  return (
    <div className="addEditComponent">
      <Modal
        title={editingTransaction ? "Edit " : "Add "}
        visible={isModelVisible}
        onCancel={handleModalCancel}
        onOk={handleSaveTransaction}
        footer={null}
      >
        <FormCustomComponent />
        {/* <Form
            form={form}
            initialValues={editingTransaction || {}}
            onFinish={handleModalOk}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Please input the name!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[{ required: true, message: "Please input the amount!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Date"
                    name="date"
                    rules={[{ required: true, message: "Please input the date!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                    {editingTransaction ? "Update" : "Add"}
                    </Button>
                </Form.Item>
                </Form> */}
        {/* <Form.Item>
          <Button type="primary" htmlType="submit">
            {editingTransaction ? "Update" : "Add"}
          </Button>
        </Form.Item> */}
      </Modal>
    </div>
  );
};

export default FormComponent;

// All form Field
// 1. form
// Type: FormInstance
// Description: Allows you to control the form programmatically. You can use this to set, get, validate, or reset the form fields.
// Example:
// javascript
// Copy code
// const [form] = Form.useForm();
// <Form form={form} />
// 2. layout
// Type: string
// Description: Defines the layout of the form. Can be "horizontal", "vertical", or "inline".
// Values:
// "horizontal": Labels and fields are aligned horizontally (default).
// "vertical": Labels are above the fields.
// "inline": Fields are displayed inline, without labels.
// Example:
// javascript
// Copy code
// <Form layout="vertical" />
// 3. name
// Type: string
// Description: Name of the form. Useful when you have multiple forms on the same page and need to distinguish between them.
// Example:
// javascript
// Copy code
// <Form name="myForm" />
// 4. initialValues
// Type: object
// Description: Provides initial values for the form fields. The keys should match the name properties of the Form.Item components.
// Example:
// javascript
// Copy code
// <Form initialValues={{ username: "JohnDoe", remember: true }} />
// 5. onFinish
// Type: function
// Description: A callback function that is triggered when the form is successfully submitted.
// Example:
// javascript
// Copy code
// const onFinish = (values) => {
// };
// <Form onFinish={onFinish} />
// 6. onFinishFailed
// Type: function
// Description: A callback function that is triggered when form submission fails (e.g., due to validation errors).
// Example:
// javascript
// Copy code
// const onFinishFailed = (errorInfo) => {
// };
// <Form onFinishFailed={onFinishFailed} />
// 7. onValuesChange
// Type: function
// Description: A callback function that is triggered whenever any field value changes. It receives two arguments: the changed fields and all values.
// Example:
// javascript
// Copy code
// const onValuesChange = (changedValues, allValues) => {
// };
// <Form onValuesChange={onValuesChange} />
// 8. validateMessages
// Type: object
// Description: Customizes the validation messages. You can use placeholders like ${label} and ${value}.
// Example:
// javascript
// Copy code
// const validateMessages = {
//   required: "'${name}' is required!",
//   types: {
//     email: "'${name}' is not a valid email!",
//     number: "'${name}' is not a valid number!",
//   },
// };
// <Form validateMessages={validateMessages} />
// 9. size
// Type: string
// Description: Defines the size of form controls. Can be "small", "middle", or "large".
// Example:
// javascript
// Copy code
// <Form size="large" />
// 10. labelCol
// Type: object
// Description: Defines the layout of the labels in a horizontal form. You can set the column span (number of columns) using { span: number }.
// Example:
// javascript
// Copy code
// <Form labelCol={{ span: 8 }} />
// 11. wrapperCol
// Type: object
// Description: Defines the layout of the input fields in a horizontal form. You can set the column span using { span: number }.
// Example:
// javascript
// Copy code
// <Form wrapperCol={{ span: 16 }} />
// 12. colon
// Type: boolean
// Description: Controls whether a colon is displayed after the labels.
// Default: true
// Example:
// javascript
// Copy code
// <Form colon={false} />
// 13. requiredMark
// Type: boolean | "optional"
// Description: Controls whether the required mark is displayed. If set to "optional", it will only show on optional fields.
// Example:
// javascript
// Copy code
// <Form requiredMark="optional" />
// 14. scrollToFirstError
// Type: boolean
// Description: Scrolls the page to the first field with an error when form submission fails.
// Example:
// javascript
// Copy code
// <Form scrollToFirstError />
// 15. preserve
// Type: boolean
// Description: If set to false, fields will be removed from the form's internal store when unmounted.
// Example:
// javascript
// Copy code
// <Form preserve={false} />
// 16. validateTrigger
// Type: string | string[]
// Description: Defines when the form's fields should be validated. Can be triggered on "onChange", "onBlur", "onSubmit", etc.
// Default: onFinish
// Example:
// javascript
// Copy code
// <Form validateTrigger="onBlur" />
// 17. initialValues
// Type: object
// Description: Specifies the initial values for the form fields.
// Example:
// javascript
// Copy code
// <Form initialValues={{ remember: true }} />
// 18. requiredMark
// Type: boolean or "optional"
// Description: Controls the display of required marks on fields.
// Example:
// javascript
// Copy code
// <Form requiredMark={false} />
// 19. component
// Type: React.ElementType
// Description: Allows replacing the default HTML form element with a custom component.
// Example:
// javascript
// Copy code
// <Form component={CustomFormComponent} />
// 20. noStyle
// Type: boolean
// Description: When set to true, it removes the form's built-in styles, allowing full customization.
// Example:
// javascript
// Copy code
// <Form noStyle />
// 21. validateFirst
// Type: boolean or "parallel"
// Description: If true, the validation stops at the first error found. If set to "parallel", all validations run concurrently.
// Example:
// javascript
// Copy code
// <Form validateFirst="parallel" />
// 22. requiredMark
// Type: boolean or "optional"
// Description: Controls the display of the required mark on fields. Setting to "optional" will only show the mark on optional fields.
// Example:
// javascript
// Copy code
// <Form requiredMark="optional" />
// 23. fieldKey
// Type: string | number
// Description: Specifies a unique key for each field to track the fields when dynamically adding/removing items.
// Example:
// javascript
// Copy code
// <Form.Item fieldKey="uniqueKey" />
// These fields allow for a high degree of customization when building forms with Ant Design, enabling you to create forms that fit a wide range of use cases.
