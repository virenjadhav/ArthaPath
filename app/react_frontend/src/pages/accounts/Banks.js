import React, { useEffect } from "react";
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
  setServicesData,
} from "../../redux/features/generic/modelSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormRefreshAction } from "../../components/Services/FormServices";
import BankServicesData from "./BankServices.json";
import BankLogo from "./BankLogo";
import BanksAddEdit from "./BanksAddEdit";

const { Meta } = Card;

// Updated cardData with bank details
// const cardData = [
//   {
//     name: "John Doe",
//     balance: "$10,000",
//     accountNo: "1234-5678-9101",
//     bankName: "State Bank of India",
//     // bankIcon: "./BankIcon/SBI.png",
//     bankIcon: sbiIcon,
//   },
//   {
//     name: "Jane Smith",
//     balance: "$8,500",
//     accountNo: "2345-6789-1011",
//     bankName: "HDFC Bank",
//     // bankIcon: "./BankIcon/HDFC.png",
//     bankIcon: hdfcIcon,
//   },
//   {
//     name: "Alice Johnson",
//     balance: "$12,000",
//     accountNo: "3456-7890-1122",
//     bankName: "ICICI Bank",
//     bankIcon: "./BankIcon/ICICI.png",
//   },
//   {
//     name: "Bob Williams",
//     balance: "$5,750",
//     accountNo: "4567-8901-1233",
//     bankName: "Axis Bank",
//     bankIcon: "./BankIcon/Axis.png",
//   },
// ];

const Banks = () => {
  const dispatch = useDispatch();
  const selectedRecord = useSelector((state) => state.model.selectedRecord);
  const searchCriteriaData = useSelector(
    (state) => state.model.searchCriteriaData
  );
  const data = useSelector((state) => state.model.data);
  const { formRefreshAction } = useFormRefreshAction();

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
  //   const handleCreateServiceHandler = () => {

  //   }
  //   const handleUpdateServiceHandler = () => {

  //   }
  useEffect(() => {
    if (BankServicesData) {
      dispatch(setServicesData(BankServicesData));
    }
    return () => {
      if (BankServicesData) {
        dispatch(setServicesData(null));
      }
    };
  }, [BankServicesData]);
  useEffect(() => {
    const get_banks = async () => {
      let payload = {
        data: {
          criteriaSearchData: searchCriteriaData,
        },
      };
      await formRefreshAction(payload);
    };
    get_banks();
  }, []);
  return (
    <div style={{ padding: "24px" }}>
      <FormComponent FormCustomComponent={BanksAddEdit} />
      <Button
        style={{ marginBottom: "10px", width: "100px" }}
        type="primary"
        onClick={handleAddButtonClick}
      >
        Add Bank
      </Button>
      <Row gutter={[24, 24]}>
        {/* {cardData.map((card, index) => (
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
                  <Space align="center">
                    
                    {card.bankIcon && (
                      <img
                        src={card.bankIcon}
                        alt={card.bankName}
                        style={{ width: 24, height: 24, marginRight: 8 }}
                      />
                    )}
                    {card.name}
                  </Space>
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
                    <div>
                      <strong>Code:</strong> {card.balance}
                    </div>
                  </Space>
                }
              />
            </Card> 

          </Col>
        ))} */}
        {data?.map((card, index) => (
          <Col xs={24} sm={24} md={12} lg={12} key={index}>
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
                title={<BankLogo name={card.code} iconName={card.icon} />}
                description={
                  <Space direction="vertical" size="small">
                    <div>
                      <strong>Code:</strong> {card.code}
                    </div>
                    <div>
                      <strong>Name:</strong> {card.name}
                    </div>
                    <div>
                      <strong>Account No:</strong>{" "}
                      {"*******" + card.account_number}
                    </div>
                    <div>
                      <strong>IFSC Code: </strong> {card.ifsc_code}
                    </div>
                    <div>
                      <strong>Bank Owner Name:</strong> {card.bank_owner_name}
                    </div>
                    <div>
                      <strong>Address1:</strong> {card.address1}
                    </div>
                    <div>
                      <strong>Address2:</strong> {card.address2}
                    </div>
                    <div>
                      <strong>City:</strong> {card.city}
                    </div>
                    <div>
                      <strong>Pin Code:</strong> {card.zip_code}
                    </div>
                    <div>
                      <strong>State:</strong> {card.state}
                    </div>
                    <div>
                      <strong>Country:</strong> {card.country}
                    </div>

                    <div>
                      <strong>Code:</strong> {card.balance}
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

export default Banks;
