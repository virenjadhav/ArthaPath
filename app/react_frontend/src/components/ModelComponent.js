import React, { useEffect, useState } from "react";
import ButtonsAddEditComponent from "./ButtonsAddEditComponent";
import FormComponent from "./FormComponent";
import { Table, Pagination, Space } from "antd";
import TableComponent from "./TableComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  setDetailState,
  setIsDetailModel,
  setModelRecordType,
  setSelectedMainRecord,
  setSelectedRecord,
} from "../redux/features/generic/modelSlice";
import dayjs from "dayjs";
import {
  setDetailData,
  setSelectedDetailRecord,
} from "../redux/features/generic/detailSlice";

const ModelComponent = ({
  data,
  columnsData,
  FormCustomComponent = null,
  deleteAction,
  navigatePath,
  refreshAction,
  moduleTitle,
  expandableTable = null,
  isDetailModelComponent = false,
  children,
  showDetail = false,
  DetailFormCustomComponent = null,
}) => {
  const data1 = useSelector((state) => state.model.data);
  // const columns = useSelector((state) => state.model.columnsData);
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const selectedRecord = useSelector((state) => state.model.selectedRecord);
  const isDetailModel = useSelector((state) => state.model.isDetailModel);
  const modelRecordType = useSelector((state) => state.model.modelRecordType);
  const detailTag = useSelector((state) => state.model.detail.detailTag);
  const detailData = useSelector((state) => state.model.detail.detailData);
  const dispatch = useDispatch();
  useEffect(() => {}, [data1]);
  const columns = columnsData?.map((column) => {
    if (column.dataIndex === "trans_date") {
      return {
        ...column,
        // render: (text) => dayjs(text).format("DD MMM YYYY"), // Format date using day.js
        // let Date = selectedRecord.trans_date
        // ? dayjs(selectedRecord.trans_date, "YYYY-MM-DD HH:mm:ss.SSS")
        // : null;
        // render: (text) => dayjs(text).format("YYYY-MM-DD"),
        render: (text) => dayjs(text).format("YYYY-MM-DD"),
      };
    }
    if (column.dataIndex === "radio") {
      return {
        ...column,
        className: "radio-button-column",
        render: (_, record) => (
          <input
            type="radio"
            checked={record.id === selectedRowKey}
            onChange={() => handleSelectRow(record)}
          />
        ),
      };
    }
    return column;
  });
  // const handleSelectRow = (record) => {
  //   if (isDetailModelComponent) {
  //     dispatch(setModelRecordType("line"));
  //   } else {
  //     dispatch(setModelRecordType("main"));
  //   }
  //   if (isDetailModelComponent) {
  //     dispatch(setIsDetailModel(true));
  //     // dispatch(setSelectedMainRecord(null));
  //     dispatch(setDetailState(setSelectedDetailRecord(record)));
  //   } else {
  //     dispatch(setIsDetailModel(false));
  //     dispatch(setSelectedMainRecord(record));
  //     dispatch(setDetailState(setSelectedDetailRecord(null)));
  //   }
  //   setSelectedRowKey(record.id);
  //   dispatch(setSelectedRecord(record));
  // };
  const handleSelectRow = (record) => {
    if (isDetailModelComponent) {
      dispatch(setModelRecordType("line"));
    } else {
      dispatch(setModelRecordType("main"));
    }
    if (isDetailModelComponent) {
      dispatch(setIsDetailModel(true));
      // dispatch(setSelectedMainRecord(null));
      dispatch(setDetailState(setSelectedDetailRecord(record)));
    } else {
      dispatch(setIsDetailModel(false));
      dispatch(setSelectedMainRecord(record));
      dispatch(setDetailState(setSelectedDetailRecord(null)));
      if (detailTag && record?.[detailTag]) {
        dispatch(setDetailState(setDetailData(record?.[detailTag])));
      }
    }
    setSelectedRowKey(record.id);
    dispatch(setSelectedRecord(record));
  };
  useEffect(() => {
    if (!selectedRecord) {
      if (isDetailModel == isDetailModelComponent) {
        setSelectedRowKey(null);
      }
    }
    if (modelRecordType == "main" && isDetailModelComponent) {
      setSelectedRowKey(null);
    }
  }, [selectedRecord]);
  // useEffect(() => {
  //   if (
  //     !selectedRecord ||
  //     (modelRecordType == "main" && isDetailModelComponent) ||
  //     (modelRecordType === "line" && !isDetailModelComponent)
  //   ) {
  //     setSelectedRowKey(null);
  //   } else {
  //     if (modelRecordType === "main" && detailTag) {
  //       dispatch(setDetailState(setDetailData(selectedRecord?.[detailTag])));
  //     }
  //   }
  // }, [selectedRecord, detailTag, modelRecordType]);

  return (
    <div className="modelComponent">
      {/* Title placed above the buttons */}
      <div style={{ fontSize: "24px", marginBottom: "8px" }}>{moduleTitle}</div>
      <div className="buttons">
        <ButtonsAddEditComponent
          deleteAction={deleteAction}
          navigatePath={navigatePath}
          refreshAction={refreshAction}
          moduleTitle={moduleTitle}
          isDetailModelComponent={isDetailModelComponent}
          isShowDetailVisible={showDetail}
        />
      </div>
      <div className="tableComponent">
        {/* <Table columns={columns} dataSource={data} pagination={false} />
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={data.length} 
                onChange={handleChangePage}
                showSizeChanger
                onShowSizeChange={(current, size) => setPageSize(size)}
            /> */}
        <TableComponent
          data={data}
          columns={columns}
          expandableTable={expandableTable}
        />
      </div>
      {showDetail && (
        <div>
          <div
            style={{ fontSize: "24px", marginBottom: "8px", marginTop: "20px" }}
          >
            {"Details"}
          </div>
          <Space style={{ marginBottom: 16, marginTop: 12 }} />
          {children}
        </div>
      )}

      <FormComponent
        FormCustomComponent={FormCustomComponent}
        DetailFormCustomComponent={DetailFormCustomComponent}
      />
    </div>
  );
};

export default ModelComponent;

// All Model Field

{
  /* <Modal
  title="Add/Edit Transaction"
  visible={isModalVisible}
  onCancel={() => setIsModalVisible(false)}
  onOk={handleSaveTransaction}
  width={600} // Width of the modal
  bodyStyle={{ maxHeight: '400px', overflowY: 'auto' }} // Height and scroll control
>
  <Form layout="vertical">
    {/* Form fields go here */
}
//   </Form>
// </Modal> */}
