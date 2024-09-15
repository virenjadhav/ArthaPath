import { Form, Input, Select, Space, Button } from 'antd';
import React from 'react';
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },  // Controls label width
  wrapperCol: { span: 16 },  // Controls input width
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const GeneralProfile = () => {
  const [form] = Form.useForm();

  const onGenderChange = (value) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        break;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        break;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
        break;
      default:
    }
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({ note: 'Hello world!', gender: 'male' });
  };

  return (
    <>
      {/* <Form
        {...layout}
        form={form}
        name="control-hooks"
        layout="horizontal"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="note"
          label="Note"
          rules={[{ required: true }]}
          validateTrigger="onSubmit"
          help={null}  // Hides the error message space when there is no error
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true }]}
          validateTrigger="onSubmit"
          help={null}  // Hides the error message space when there is no error
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}
        >
          <Select
            placeholder="Select a option and change input text above"
            onChange={onGenderChange}
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>

        
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
        >
          {({ getFieldValue }) =>
            getFieldValue('gender') === 'other' ? (
              <Form.Item
                name="customizeGender"
                label="Customize Gender"
                rules={[{ required: true }]}
                validateTrigger="onSubmit"
                help={null}  // Hides the error message space when there is no error
              >
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
            <Button type="link" htmlType="button" onClick={onFill}>
              Fill form
            </Button>
          </Space>
        </Form.Item>
      </Form> */}
      
    </>
  );
};

export default GeneralProfile;
