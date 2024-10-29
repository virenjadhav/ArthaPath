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

const { TextArea } = Input;

const BudgetAddEditForm = () => {
  const user_id = useSelector((state) => state.generic.user?.user_id);
  const dispatch = useDispatch();
  const [form] = Form.useForm(); // Initialize form instance

  // Handle form submission
  const handleModelOk = async (values) => {
    let { id, trans_date, main_category, sub_category, description, amount } =
      values;

    try {
      //   const formattedDate = trans_date
      //     ? dayjs(trans_date).format("YYYY-MM-DD HH:mm:ss.SSS")
      //     : null;

      const budgetData = {
        amount,
        main_category,
        sub_category,
        description,
        user_id,
        active: 1,
      };

      if (isEditing) {
        // Edit existing budget
        const response = await dispatch(
          update_budget({ id, data: budgetData })
        ).unwrap();
        dispatch(setSelectedRecord(response.budget));
        dispatch(setMessageState(setResult("success")));
        dispatch(setMessageState(setSuccessMsg(response?.message)));
      } else {
        // Create new budget
        const response = await dispatch(
          create_budget({ data: budgetData })
        ).unwrap();
        dispatch(setSelectedRecord(response?.budget));
        dispatch(setIsEditing(true));
        dispatch(get_budgets());
        dispatch(setMessageState(setResult("success")));
        dispatch(setMessageState(setSuccessMsg(response?.message)));
      }
      dispatch(get_budgets());
    } catch (error) {
      dispatch(setMessageState(setResult("error")));
      dispatch(setMessageState(setErrorMsg(error?.error?.join(","))));
    }
  };

  const selectedRecord = useSelector((state) => state.model.selectedRecord);
  const isEditing = useSelector((state) => state.model.isEditing);

  useEffect(() => {
    if (selectedRecord && isEditing) {
      const formattedDate = selectedRecord.trans_date
        ? dayjs(selectedRecord.trans_date, "YYYY-MM-DD HH:mm:ss.SSS")
        : null;

      form.setFieldsValue({
        ...selectedRecord,
        trans_date: formattedDate,
      });
    } else {
      form.resetFields();
    }
  }, [selectedRecord, isEditing, form]);

  return (
    <Form
      form={form}
      // initialValues={selectedRecord || {}}
      onFinish={handleModelOk}
      layout="horizontal"
    >
      {isEditing && (
        <Form.Item name="id" label="ID">
          <Input disabled />
        </Form.Item>
      )}

      <Form.Item
        name="amount"
        label="Amount"
        rules={[{ required: true, message: "Please input the amount!" }]}
      >
        <InputNumber step={0.01} min={0} />
      </Form.Item>

      <Form.Item
        name="main_category"
        label="Main Category"
        rules={[{ required: true, message: "Please select a main category!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="sub_category"
        label="Sub Category"
        rules={[{ required: true, message: "Please select a sub category!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <TextArea rows={4} />
      </Form.Item>
      {isEditing && (
        <Form.Item name="active" label="Status">
          <Input disabled />
        </Form.Item>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isEditing ? "Update" : "Add"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BudgetAddEditForm;
