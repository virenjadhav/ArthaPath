import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { changePassword } from "../../redux/features/generic/genericApiThunk";
import { useDispatch, useSelector } from "react-redux";
import { setMessageState } from "../../redux/features/generic/genericSlice";
import {
  setErrorMsg,
  setResult,
  setSuccessMsg,
} from "../../redux/features/generic/messageSlice";
const ChangePassword = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    // message.success("Password changed successfully!");
    // Submit the values to the backend here
    const { oldPassword, newPassword, confirmPassword } = values;
    try {
      // const response = await dispatch(
      //   signup({
      //     data: {
      //       user: {
      //         email,
      //         password,
      //         password_confirmation: confirmPassword,
      //         name,
      //       },
      //     },
      //   })
      // ).unwrap();
      const response = await dispatch(
        changePassword({
          data: {
            old_password: oldPassword,
            new_password: newPassword,
            confirm_password: confirmPassword,
          },
        })
      ).unwrap();
      // dispatch(setResult("success"));
      dispatch(setMessageState(setResult("success")));
      // dispatch(setSuccessMsg(response?.message));
      dispatch(setMessageState(setSuccessMsg(response?.message)));
      form.resetFields();
    } catch (error) {
      dispatch(setMessageState(setResult("error")));
      // console.log(`Error : ${error?.error}`);
      dispatch(setMessageState(setErrorMsg(`Error : ${error?.error}`)));
    }
  };

  // Custom validator to check if both passwords match
  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("newPassword") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Passwords do not match!"));
    },
  });

  return (
    <Form
      form={form}
      name="change_password"
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: "400px" }}
    >
      <Form.Item
        name="oldPassword"
        label="Old Password"
        rules={[
          {
            required: true,
            message: "Please input your old password!",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Enter your old password"
        />
      </Form.Item>
      {/* New Password */}
      <Form.Item
        name="newPassword"
        label="New Password"
        rules={[
          {
            required: true,
            message: "Please input your new password!",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Enter your new password"
        />
      </Form.Item>

      {/* Confirm New Password */}
      <Form.Item
        name="confirmPassword"
        label="Confirm New Password"
        dependencies={["newPassword"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your new password!",
          },
          validateConfirmPassword, // Apply the custom validation
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Confirm your new password"
        />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Change Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePassword;

// import { Form, Input, Button } from "antd";
// import React from "react";
// const layout = {
//   labelCol: { span: 8 }, // Controls label width
//   wrapperCol: { span: 16 }, // Controls input width
// };

// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// };

// const ChangePassword = () => {
//   const [form] = Form.useForm();
//   const onChangePassword = (values) => {
//     console.log(values);
//   };
//   return (
//     <>
//       <Form
//         layout="horizontal"
//         form={form}
//         onFinish={onChangePassword}
//         name="chnagePassword"
//         style={{ maxWidth: 600 }}
//       >
//         <Form.Item
//           name="oldPassword"
//           label="Old Password"
//           rules={[{ required: true }]}
//         >
//           <Input type="password" />
//         </Form.Item>
//         <Form.Item
//           name="newPassword"
//           label="New Password"
//           rules={[{ required: true }]}
//         >
//           <Input type="password" />
//         </Form.Item>
//         <Form.Item
//           name="confirmPassword"
//           label="Confirm Password"
//           rules={[{ required: true }]}
//         >
//           <Input type="password" />
//         </Form.Item>
//         <Form.Item {...tailLayout}>
//           <Button type="primary" htmlType="submit">
//             Change Password
//           </Button>
//         </Form.Item>
//       </Form>
//     </>
//   );
// };

// export default ChangePassword;
