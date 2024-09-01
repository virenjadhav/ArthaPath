import React from 'react'

const TransactionAddEditForm = () => {
  return (
    <Form
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
                </Form>
  )
}

export default TransactionAddEditForm