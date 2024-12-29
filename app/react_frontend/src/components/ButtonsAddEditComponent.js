import React from "react";
import {
  // Table,
  Button,
  Space,
  // Modal,
  // Form,
  // Input,
  // Pagination,
  message,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
  // ExclamationCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsEditing,
  setIsModelVisible,
  // setSelectedForm,
  setSelectedRecord,
  setShowRecord,
} from "../redux/features/generic/modelSlice";
import { useNavigate } from "react-router-dom";
import { setMessageState } from "../redux/features/generic/genericSlice";
import {
  // setErrorMsg,
  setResult,
  // setSuccessMsg,
  setWarningMsg,
} from "../redux/features/generic/messageSlice";
import { ModelConfirm } from "./ModelConfirm";
// import { ModelInfo } from "./ModelInfo";
// import useApiServiceCall from "../apis/ApiServiceCall";
// import FormAddEdit from "./FormComponent/FormAddEdit";
import {
  useFormDeleteAction,
  useFormRefreshAction,
  // useRefreshAction,
} from "./Services/FormServices";
import SearchCriteriaComponent from "./Criteria/SearchCriteriaComponent";

const ButtonsAddEditComponent = ({
  // deleteAction,
  // navigatePath,

  moduleTitle,
  deleteVisible = true,
  refreshVisible = true,
  addVisible = true,
  editVisible = true,
  criteriaVisible = true,
  detailVisible = false,
  // afterRefreshHandler = null,
  // afterDeleteHandler = null,
  // afterAddHandler = null,
  // afterEditHandler = null
}) => {
  // const isEditing = useSelector((state) => state.model.isEditing);
  // const form = useSelector((state) => state.model.setSelectedForm);
  const selectedRecord = useSelector((state) => state.model.selectedRecord);
  const searchCriteriaData = useSelector(
    (state) => state.model.searchCriteriaData
  );
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { callApi } = useApiServiceCall();
  const { formRefreshAction } = useFormRefreshAction();
  const { formDeleteAction } = useFormDeleteAction();

  const handleAddButtonClick = () => {
    dispatch(setIsModelVisible(true));
    dispatch(setIsEditing(false));
    dispatch(setShowRecord(null));
    dispatch(setSelectedRecord(null));
  };

  const handleDeleteModalConfirmClickHandler = async () => {
    // try {
    //   const response = await dispatch(
    //     deleteAction({ id: selectedRecord.id })
    //   ).unwrap();
    //   // message.success({
    //   //   content: response?.message,
    //   //   duration: 5,
    //   //   style: {
    //   //     fontSize: "18px",
    //   //   },
    //   // });
    //   // dispatch(setMessageResult("success"));
    //   // dispatch(setMessageSuccessMsg(response?.message));
    //   dispatch(setMessageState(setResult("success")));
    //   dispatch(setMessageState(setSuccessMsg(response?.message)));
    //   // dispatch(refreshAction);
    //   dispatch(setIsModelVisible(false));
    //   dispatch(setIsEditing(false));
    //   dispatch(setSelectedRecord(null));
    // } catch (error) {
    //   // message.error({
    //   //   content: `Error : ${error?.error?.join(",")}`,
    //   //   duration: 5,
    //   //   style: {
    //   //     fontSize: "18px",
    //   //   },
    //   // });
    //   // dispatch(setMessageResult("error"));
    //   // dispatch(setMessageErrorMsg(error?.error?.join(",")));
    //   dispatch(setMessageState(setResult("error")));
    //   dispatch(setMessageState(setErrorMsg(error?.error?.join(","))));
    // }
    // formDeleteAction();
    // await formDeleteAction();
    if (!selectedRecord) {
      console.error("No record selected for deletion.");
      return;
    }

    // Call formDeleteAction and pass the selectedRecord
    await formDeleteAction(selectedRecord);
  };

  const handleDeleteButtonClick = () => {
    if (selectedRecord?.id) {
      // Modal.confirm({
      //   title: "Are you sure you want to delete this record?",
      //   okText: "Yes",
      //   okType: "danger",
      //   cancelText: "No",
      //   icon: <ExclamationCircleOutlined />,
      //   onOk: handleDeleteModalConfirmClickHandler,
      // });
      // <ModelConfirm
      //   title={"Are you sure you want to delete this record?"}
      //   onOkHandler={handleDeleteModalConfirmClickHandler}
      // />;
      ModelConfirm({
        title: "Are you sure you want to delete this record?",
        onOkHandler: handleDeleteModalConfirmClickHandler,
      });
      // ModelInfo({ title: "some message", content: "some content" });
    } else {
      // dispatch(setMessageResult("warning"));
      // // message.warning("Please select a record to delete.");
      // dispatch(setMessageWarningMsg("Please select a record to delete."));
      dispatch(setMessageState(setResult("warning")));
      dispatch(
        setMessageState(setWarningMsg("Please select a record to delete."))
      );
    }
  };

  const handleEditButtonClick = async () => {
    if (selectedRecord) {
      dispatch(setIsEditing(true));
      dispatch(setIsModelVisible(true));
    } else {
      message.warning("Please select a record to edit.");
    }
  };
  // const handleRefreshClickHandler = (response) => {
  //   dispatch(setMessageState(setResult("success")));
  //   dispatch(setMessageState(setSuccessMsg(response?.message)));
  //   dispatch(setIsModelVisible(false));
  //   dispatch(setIsEditing(false));
  //   dispatch(setSelectedRecord(null));
  // };

  const handleRefreshClick = async () => {
    // try {
    // const response = await dispatch(refreshAction).unwrap();
    // callApi("getList", handleRefreshClickHandler);
    // refreshAction();
    let payload = {
      data: {
        criteriaSearchData: searchCriteriaData,
      },
    };
    await formRefreshAction(payload);
    // await formRefreshAction();
    // message.success({
    //   content: response?.message,
    //   duration: 5,
    //   style: {
    //     fontSize: "18px",
    //   },
    // });
    // dispatch(setResult("success"));
    // dispatch(setSuccessMsg(response?.message));
    // if (response) {
    //   handleRefreshClickHandler(response);
    // }
    // } catch (error) {
    //   // message.error({
    //   //   content: `Error : ${error?.error?.join(",")}`,
    //   //   duration: 5,
    //   //   style: {
    //   //     fontSize: "18px",
    //   //   },
    //   // });
    //   dispatch(setMessageState(setResult("error")));
    //   dispatch(setMessageState(setErrorMsg(error?.error?.join(","))));
    // }
  };
  // const handleSearchButtonClick = () => {};
  const onDetailClickHandler = () => {};

  return (
    <>
      {/* Title placed above the buttons */}
      <div style={{ fontSize: "24px", marginBottom: "8px" }}>{moduleTitle}</div>
      <Space style={{ marginBottom: 16, marginTop: 12 }}>
        {/* # add label in this line  */}
        {/* <span style={{ fontSize: "18px", fontWeight: "400" }}>
          {moduleTitle}
        </span> */}
        {addVisible && (
          <Button
            type="primary"
            onClick={handleAddButtonClick}
            icon={<PlusOutlined />}
            shape="circle"
            title={`Add ${moduleTitle}`}
          />
        )}
        {deleteVisible && (
          <Button
            danger
            onClick={handleDeleteButtonClick}
            icon={<DeleteOutlined />}
            shape="circle"
            title={`Delete ${moduleTitle}`}
            disabled={!selectedRecord} // Disable delete button if no record selected
          />
        )}
        {editVisible && (
          <Button
            onClick={handleEditButtonClick}
            icon={<EditOutlined />}
            shape="circle"
            title={`Edit ${moduleTitle}`}
            disabled={!selectedRecord} // Disable edit button if no record selected
          />
        )}
        {refreshVisible && (
          <Button
            type="default"
            onClick={handleRefreshClick}
            icon={<ReloadOutlined />}
            shape="circle"
            title={`Refresh ${moduleTitle}`}
          />
        )}
        {criteriaVisible && (
          <SearchCriteriaComponent moduleTitle={moduleTitle} />
        )}
        {detailVisible && (
          <>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              style={{ width: "120px" }}
              onClick={onDetailClickHandler}
            >
              Show Detail
            </Button>
          </>
        )}
      </Space>
    </>
  );
};

export default ButtonsAddEditComponent;
