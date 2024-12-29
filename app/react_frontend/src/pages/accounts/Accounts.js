import React, { useEffect } from "react";
import { Button, Card, Col, message, Row, Space, Tooltip } from "antd";
import {
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
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
  setShowRecord,
} from "../../redux/features/generic/modelSlice";
import { useDispatch, useSelector } from "react-redux";
import AccountServicesData from "./AccountServices.json";
import {
  useFormDeleteAction,
  useFormRefreshAction,
} from "../../components/Services/FormServices";
import { ModelConfirm } from "../../components/ModelConfirm";
import { setMessageState } from "../../redux/features/generic/genericSlice";
import {
  setResult,
  setWarningMsg,
} from "../../redux/features/generic/messageSlice";
import BankLogo from "./BankLogo";

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

const Accounts = () => {
  const dispatch = useDispatch();
  const selectedRecord = useSelector((state) => state.model.selectedRecord);
  const isModelVisible = useSelector((state) => state.model.isModelVisible);
  const { formDeleteAction } = useFormDeleteAction();
  const searchCriteriaData = useSelector(
    (state) => state.model.searchCriteriaData
  );

  const data = useSelector((state) => state.model.data);
  const { formRefreshAction } = useFormRefreshAction();

  const handleAddButtonClick = () => {
    dispatch(setIsModelVisible(true));
    dispatch(setIsEditing(false));
    dispatch(setShowRecord(null));
    dispatch(setSelectedRecord(null));
  };
  const handleEditButtonClick = (key) => {
    dispatch(setSelectedRecord(data?.[key]));
    // if (selectedRecord) {
    dispatch(setIsEditing(true));
    dispatch(setIsModelVisible(true));
    // } else {
    //   message.warning("Please select a record to edit.");
    // }
  };
  const handleDeleteButtonClick = async (key) => {
    // handleEditButtonClick(key);
    dispatch(setSelectedRecord(data?.[key]));
    let record = data?.[key];
    if (record?.id) {
      ModelConfirm({
        title: "Are you sure you want to delete this record?",
        onOkHandler: () => handleDeleteModalConfirmClickHandler(record),
      });
    } else {
      dispatch(setMessageState(setResult("warning")));
      dispatch(
        setMessageState(setWarningMsg("Please select a record to delete."))
      );
    }
  };
  const handleDeleteModalConfirmClickHandler = async (record) => {
    if (!record) {
      console.error("No record selected for deletion.");
      return;
    }

    // Call formDeleteAction and pass the selectedRecord
    await formDeleteAction(record);
  };

  useEffect(() => {
    if (AccountServicesData) {
      dispatch(setServicesData(AccountServicesData));
    }
    return () => {
      if (AccountServicesData) {
        dispatch(setServicesData(null));
      }
    };
  }, [AccountServicesData]);
  useEffect(() => {
    const get_banks = async () => {
      let payload = {
        data: {
          criteriaSearchData: searchCriteriaData,
        },
      };
      await formRefreshAction(payload);
    };
    if (!isModelVisible) {
      get_banks();
    }
  }, [isModelVisible]);

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
        {data?.map((card, index) => (
          <Col xs={24} sm={24} md={12} lg={12} key={index}>
            <Card
              actions={[
                // <Tooltip title="Settings">
                //   {/* <SettingOutlined key="setting" /> */}
                // </Tooltip>,
                <Tooltip title="Edit">
                  <EditOutlined
                    key="edit"
                    onClick={() => handleEditButtonClick(index)}
                  />
                </Tooltip>,
                <Tooltip title="Delete">
                  <DeleteOutlined
                    key="delete"
                    onClick={() => {
                      handleDeleteButtonClick(index);
                    }}
                  />
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
                  // <AccountName card={card} />
                  <BankLogo name={card.name} iconName={card.icon} />
                }
                description={
                  <Space direction="vertical" size="small">
                    <div>
                      <strong>Name:</strong> {card.name}
                    </div>
                    <div>
                      <strong>Bank:</strong> {card.bank_code}
                    </div>
                    <div>
                      <strong>Currency:</strong> {card.currency}
                    </div>
                    <div>
                      <strong>Initial Balance:</strong> {card.initial_balance}
                    </div>
                    <div>
                      <strong>Description:</strong> {card.description}
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
