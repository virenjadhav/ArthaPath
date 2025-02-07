import React, { useEffect } from "react";
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
  setDetailState,
  setIsDetailModel,
  setIsEditing,
  setIsModelVisible,
  setModelRecordType,
  setSelectedMainRecord,
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
  useDetailFormRefreshAction,
  useFormDeleteAction,
  useFormRefreshAction,
  // useRefreshAction,
} from "./Services/FormServices";
import SearchCriteriaComponent from "./Criteria/SearchCriteriaComponent";
import {
  setDetailData,
  setSelectedDetailRecord,
} from "../redux/features/generic/detailSlice";
import { ModelInfo } from "./ModelInfo";

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
  isDetailModelComponent = false,
  isShowDetailVisible = false,
}) => {
  // const isEditing = useSelector((state) => state.model.isEditing);
  // const form = useSelector((state) => state.model.setSelectedForm);
  const selectedRecord = useSelector((state) => state.model.selectedRecord);
  const selectedMainRecord = useSelector(
    (state) => state.model.selectedMainRecord
  );
  const selectedDetailRecord = useSelector(
    (state) => state.model.detail.selectedDetailRecord
  );
  const searchCriteriaData = useSelector(
    (state) => state.model.searchCriteriaData
  );
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { callApi } = useApiServiceCall();
  const { formRefreshAction } = useFormRefreshAction();
  const { formDeleteAction } = useFormDeleteAction();
  const { detailFormRefreshAction } = useDetailFormRefreshAction();
  const isDetailModel = useSelector((state) => state.model.isDetailModel);
  useEffect(() => {
    if (isDetailModel !== isDetailModelComponent) {
      dispatch(setIsDetailModel(isDetailModelComponent));
    }
  }, [isDetailModelComponent]);
  useEffect(() => {}, [isDetailModel]);
  const handleAddButtonClick = () => {
    dispatch(setIsModelVisible(true));
    dispatch(setIsEditing(false));
    dispatch(setShowRecord(null));
    dispatch(setSelectedRecord(null));
    if (!isDetailModelComponent) {
      dispatch(setSelectedMainRecord(null));
      dispatch(setDetailState(setDetailData(null)));
    }

    dispatch(setDetailState(setSelectedDetailRecord(null)));
  };

  const handleDeleteModalConfirmClickHandler = async (selectedRecordLocal) => {
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
    if (!selectedRecordLocal) {
      console.error("No record selected for deletion.");
      return;
    }

    // Call formDeleteAction and pass the selectedRecord
    await formDeleteAction(selectedRecordLocal);
  };

  const handleDeleteButtonClick = (selectedRecordLocal) => {
    if (selectedRecordLocal?.id) {
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
      let deleteMsg = "";
      if (isDetailModelComponent) {
        if (selectedRecordLocal.serial_no == 101) {
          ModelInfo({
            title: `Connot Delete Initial Line# 101, If you want to delete then delete main Record.`,
          });
          return;
        }
        deleteMsg = "Are you sure you want to delete this record?";
      } else {
        if (
          selectedRecordLocal?.serial_no &&
          selectedRecordLocal.serial_no == 101
        ) {
          ModelInfo({
            title: `Connot Delete Initial Line# 101, If you want to delete then delete main Record.`,
          });
          return;
        }
        deleteMsg =
          "This is main record if you want to delete this all Lines would also be deleted. Are you sure you want to delete this record?";
      }
      ModelConfirm({
        title: deleteMsg,
        onOkHandler: () => {
          handleDeleteModalConfirmClickHandler(selectedRecordLocal);
        },
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
    let data = {
      criteriaSearchData: searchCriteriaData,
    };
    let payload = {
      data,
    };

    if (isDetailModelComponent) {
      // dispatch(setModelRecordType("line"));
      payload = {
        data,
        isLineRecord: true,
        mainRecord: selectedMainRecord,
      };
      await detailFormRefreshAction(payload);
    } else {
      // dispatch(setModelRecordType("main"));
      payload = {
        data,
        isLineRecord: false,
        mainRecord: null,
      };
      await formRefreshAction(payload);
    }
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
  const handleButtonClickHandler = (type, selectedRecordLocal) => {
    switch (type) {
      case "main":
        // handle operation related to if any button click.
        break;
      case "add":
        handleAddButtonClick();
        break;
      case "delete":
        handleDeleteButtonClick(selectedRecordLocal);
        break;
      case "edit":
        handleEditButtonClick();
        break;
      case "refresh":
        handleRefreshClick();
        break;
      default:
        console.error("Unknown button action");
    }
  };

  const handleButtonClick = async (type) => {
    let selectedRecordLocal = null;
    if (type != "add" && type != "main") {
      if (isDetailModelComponent) {
        dispatch(setModelRecordType("line"));
        dispatch(setSelectedRecord(selectedDetailRecord));
        selectedRecordLocal = selectedDetailRecord;
      } else {
        dispatch(setModelRecordType("main"));
        dispatch(setSelectedRecord(selectedMainRecord));
        selectedRecordLocal = selectedMainRecord;
      }
    }
    if (isDetailModel !== isDetailModelComponent) {
      await dispatch(setIsDetailModel(isDetailModelComponent));
      handleButtonClickHandler(type, selectedRecordLocal);
    } else {
      handleButtonClickHandler(type, selectedRecordLocal);
    }
  };
  // const handleSearchButtonClick = () => {};
  const onDetailClickHandler = () => {};

  return (
    <>
      <Space
        style={{ marginBottom: 16, marginTop: 12 }}
        onClick={() => handleButtonClick("main")}
      >
        {/* # add label in this line  */}
        {/* <span style={{ fontSize: "18px", fontWeight: "400" }}>
          {moduleTitle}
        </span> */}
        {addVisible && (
          <Button
            type="primary"
            // onClick={handleAddButtonClick}
            icon={<PlusOutlined />}
            shape="circle"
            title={`Add ${moduleTitle}`}
            onClick={() => handleButtonClick("add")}
            // disabled={
            //   isDetailModelComponent == true && !selectedMainRecord
            //     ? true
            //     : false
            // }
            disabled={
              !selectedMainRecord && isDetailModelComponent ? true : false
            }
          />
        )}
        {deleteVisible && (
          <Button
            danger
            // onClick={handleDeleteButtonClick}
            icon={<DeleteOutlined />}
            shape="circle"
            title={`Delete ${moduleTitle}`}
            // disabled={!selectedRecord} // Disable delete button if no record selected
            // disabled={
            //   (isDetailModel == isDetailModelComponent ? false : true) &&
            //   selectedRecord
            // }
            disabled={
              (!selectedMainRecord && isDetailModelComponent ? true : false) ||
              !(!isDetailModelComponent || selectedDetailRecord) ||
              !selectedMainRecord
            }
            onClick={() => handleButtonClick("delete")}
          />
        )}
        {editVisible && (
          <Button
            // onClick={handleEditButtonClick}
            icon={<EditOutlined />}
            shape="circle"
            title={`Edit ${moduleTitle}`}
            // disabled={!selectedRecord} // Disable delete button if no record selected
            // disabled={
            //   (isDetailModel == isDetailModelComponent ? false : true) &&
            //   selectedRecord
            // } // Disable edit button if no record selected
            disabled={
              (!selectedMainRecord && isDetailModelComponent ? true : false) ||
              !(!isDetailModelComponent || selectedDetailRecord) ||
              !selectedMainRecord
            }
            onClick={() => handleButtonClick("edit")}
          />
        )}
        {refreshVisible && (
          <Button
            type="default"
            // onClick={handleRefreshClick}
            icon={<ReloadOutlined />}
            shape="circle"
            title={`Refresh ${moduleTitle}`}
            onClick={() => handleButtonClick("refresh")}
            // disabled={
            //   isDetailModelComponent == true && !selectedMainRecord
            //     ? true
            //     : false
            // }
            disabled={
              !selectedMainRecord && isDetailModelComponent ? true : false
            }
          />
        )}
        {criteriaVisible && (
          <SearchCriteriaComponent
            moduleTitle={moduleTitle}
            isDetailModelComponent={isDetailModelComponent}
          />
        )}
        {isShowDetailVisible && (
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
