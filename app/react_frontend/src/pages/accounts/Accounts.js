import React from "react";
import { Button, Card, Col, message, Row, Space, Tooltip } from "antd";
import {
  SettingOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import sbiIcon from "./BankIcon/SBI.png";
import hdfcIcon from "./BankIcon/HDFC.png";
import AccountName from "./AccountName";
import FormComponent from "../../components/FormComponent";
import AccountAddEdit from "./AccountAddEdit";
import {
  setIsEditing,
  setIsModelVisible,
  setSelectedRecord,
} from "../../redux/features/generic/modelSlice";
import { useDispatch, useSelector } from "react-redux";

const { Meta } = Card;

// Updated cardData with bank details
const cardData = [
  {
    name: "John Doe",
    balance: "$10,000",
    accountNo: "1234-5678-9101",
    bankName: "State Bank of India",
    // bankIcon: "./BankIcon/SBI.png",
    bankIcon: sbiIcon,
  },
  {
    name: "Jane Smith",
    balance: "$8,500",
    accountNo: "2345-6789-1011",
    bankName: "HDFC Bank",
    // bankIcon: "./BankIcon/HDFC.png",
    bankIcon: hdfcIcon,
  },
  {
    name: "Alice Johnson",
    balance: "$12,000",
    accountNo: "3456-7890-1122",
    bankName: "ICICI Bank",
    bankIcon: "./BankIcon/ICICI.png",
  },
  {
    name: "Bob Williams",
    balance: "$5,750",
    accountNo: "4567-8901-1233",
    bankName: "Axis Bank",
    bankIcon: "./BankIcon/Axis.png",
  },
];

const Accounts = () => {
  const dispatch = useDispatch();
  const selectedRecord = useSelector((state) => state.model.selectedRecord);

  const handleAddButtonClick = () => {
    dispatch(setIsModelVisible(true));
    dispatch(setIsEditing(false));
    dispatch(setSelectedRecord(null));
  };
  const handleEditButtonClick = () => {
    if (selectedRecord) {
      dispatch(setIsEditing(true));
      dispatch(setIsModelVisible(true));
    } else {
      message.warning("Please select a record to edit.");
    }
  };
  return (
    <div style={{ padding: "24px" }}>
      <FormComponent FormCustomComponent={AccountAddEdit} />
      <Button
        style={{ marginBottom: "10px", width: "100px" }}
        type="primary"
        onClick={handleAddButtonClick}
      >
        Add Account
      </Button>
      <Row gutter={[24, 24]}>
        {cardData.map((card, index) => (
          <Col xs={24} sm={24} md={12} lg={8} key={index}>
            <Card
              actions={[
                <Tooltip title="Settings">
                  <SettingOutlined key="setting" />
                </Tooltip>,
                <Tooltip title="Edit">
                  <EditOutlined key="edit" onClick={handleEditButtonClick} />
                </Tooltip>,
                <Tooltip title="Info">
                  <InfoCircleOutlined key="info" />
                </Tooltip>,
              ]}
              style={{ border: "1px solid #f0f0f0" }}
            >
              <Meta
                title={
                  // <Space align="center">
                  //   {/* Display bank logo */}
                  //   {card.bankIcon && (
                  //     <img
                  //       src={card.bankIcon}
                  //       alt={card.bankName}
                  //       style={{ width: 24, height: 24, marginRight: 8 }}
                  //     />
                  //   )}
                  //   {card.name}
                  // </Space>
                  <AccountName card={card} />
                }
                description={
                  <Space direction="vertical" size="small">
                    <div>
                      <strong>Balance:</strong> {card.balance}
                    </div>
                    <div>
                      <strong>Account No:</strong> {card.accountNo}
                    </div>
                    <div>
                      <strong>Bank:</strong> {card.bankName}
                    </div>
                  </Space>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Accounts;
