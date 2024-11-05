import React, { useEffect, useState } from "react";
import getLookupFormatData from "./LookupFormatUrl";
import {
  Modal,
  Table,
  Divider,
  Radio,
  Button,
  Flex,
  Row,
  Col,
  Input,
} from "antd";
import { useDispatch } from "react-redux";

import { get_lookup_record } from "../../redux/features/generic/LookupApiThunk";
import { setMessageState } from "../../redux/features/generic/genericSlice";
import {
  setErrorMsg,
  setResult,
} from "../../redux/features/generic/messageSlice";
import {
  useLookupRecordAction,
  useValidateLookupRecordAction,
} from "../Services/CommonServices";

const { Search } = Input;

const LookupModel = ({
  isLookupModalVisible,
  setIsLookupModalVisible,
  lookupService,
  lookupFormatUrl,
  handelSaveClickHandler,
  dataSourceName,
  dataField,
  labelField,
  initialSearchValue,
  filterKeyLabelName,
}) => {
  // const [selectionType, setSelectionType] = useState("radio");
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const [columnsData, setColumnsData] = useState([]);
  const [selectedLookupRecord, setSelectedLookupRecord] = useState(null);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const { lookupRecordAction } = useLookupRecordAction();

  const columnsData2 = [
    {
      title: "",
      dataIndex: "radio",
      key: "radio",
      width: 50,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  const columns = columnsData?.map((column) => {
    if (column.dataIndex === "radio") {
      return {
        ...column,
        className: "radio-button-column", // Apply the CSS class
        render: (_, record) => (
          <input
            type="radio"
            checked={record.key === selectedRowKey}
            onChange={() => handleSelectRow(record)}
          />
        ),
      };
    }
    return column;
  });
  const get_lookup_data = async (value) => {
    try {
      // const response = await dispatch(
      //   get_lookup_record({
      //     data: {
      //       dataSourceName: dataSourceName,
      //       dataField: dataField,
      //       labelField: labelField,
      //       searchValue: value,
      //       filterKeyLabelName: filterKeyLabelName,
      //     },
      //   })
      // ).unwrap();
      const payload = {
        data: {
          dataSourceName: dataSourceName,
          dataField: dataField,
          labelField: labelField,
          searchValue: value,
          filterKeyLabelName: filterKeyLabelName,
        },
      };
      await lookupRecordAction(payload, handleLookupRecordHandler);
    } catch (error) {
      dispatch(setMessageState(setResult("error")));
      dispatch(setMessageState(setErrorMsg(`Error : ${error?.error}`)));
    }
  };
  const handleLookupRecordHandler = (response) => {
    let data = response?.records;
    let result = response?.result;
    if (result == "success") {
      // Dynamically assign a 'key' to each row if not already present
      if (data) {
        data = data.map((item, index) => ({
          ...item,
          key: item.key || index.toString(), // Use existing key or fallback to index as key
        }));
      }
      setData(data);
    }
  };

  useEffect(() => {
    if (lookupService) {
      const data = getLookupFormatData(lookupFormatUrl);
      setColumnsData(data);
    }
  }, [columnsData, lookupService, lookupFormatUrl]);
  useEffect(() => {
    if (isLookupModalVisible) {
      setSearchValue(initialSearchValue);
      get_lookup_data(initialSearchValue);
    }
  }, [isLookupModalVisible]);

  const handleSelectRow = (record) => {
    setSelectedRowKey(record.key);
    setSelectedLookupRecord(record);
    // dispatch(setSelectedRecord(record));
  };
  const handleSave = () => {
    handelSaveClickHandler(selectedLookupRecord);
    handleModalCancel();
  };
  const handleSearch = (record) => {
    setSearchValue(record);
    get_lookup_data(record);
  };

  const data2 = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Disabled User",
      age: 99,
      address: "Sydney No. 1 Lake Park",
    },

    {
      key: "8",
      name: "Disabled User",
      age: 99,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "6",
      name: "Disabled User",
      age: 99,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "5",
      name: "Disabled User",
      age: 99,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "7",
      name: "Disabled User",
      age: 99,
      address: "Sydney No. 1 Lake Park",
    },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {},
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const handleModalCancel = () => {
    setSearchValue(null);
    setIsLookupModalVisible(false);
  };
  const handelOnSearchChange = (e) => {
    // searchValue =
    let changedValue = e.target.value;
    setSearchValue(changedValue);
  };

  return (
    <>
      <Modal
        title={""}
        visible={isLookupModalVisible}
        onCancel={handleModalCancel}
        // onOk={}
        footer={null}
      >
        {/* <Table data={data} columns={columns} /> */}
        {/* <div> */}
        {/* <Radio.Group
            onChange={({ target: { value } }) => {
              setSelectionType(value);
            }}
            value={selectionType}
          >
            <Radio value="checkbox">Checkbox</Radio>
            <Radio value="radio">radio</Radio>
          </Radio.Group> */}

        {/* <Divider /> */}
        {/* 
        <Table
          rowSelection={{
            ...rowSelection,
            type: selectionType,
          }}
          columns={columns}
          dataSource={data}
        /> */}
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ y: 70 * 5 }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>

          {/* Adjust the gap between Button 1 and Button 2 */}
          {/* <div
            style={{ marginRight: "10px", width: "70px", marginLeft: "10px" }}
          > */}
          <Button type="default" onClick={handleModalCancel}>
            Cancel
          </Button>
          {/* </div> */}

          {/* Ant Design Input.Search close to Button 3 */}
          <Search
            placeholder="Search..."
            value={searchValue}
            onSearch={handleSearch}
            onChange={handelOnSearchChange}
            style={{ width: 500, marginRight: "16px" }} // Adjust the width and margin as needed
          />

          {/* <Button type="danger" onClick={handleAdd}>
            Button 3
          </Button> */}
        </div>
        {/* <Flex gap="middle" wrap>
          <Button onClick={handleAdd} type="primary" style={{ marginTop: 16 }}>
            Select
          </Button>
          <Button onClick={handleAdd} type="primary" style={{ marginTop: 16 }}>
            Cancel
          </Button>
          <Button onClick={handleAdd} type="primary" style={{ marginTop: 16 }}>
            Search
          </Button>
        </Flex>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Button type="primary" onClick={handleAdd}>
            Select
          </Button>
          <Button type="default" onClick={handleAdd}>
            Cancel
          </Button>
          <Button type="danger" onClick={handleAdd}>
            Search
          </Button>
        </div> */}
        {/* </div> */}
      </Modal>
    </>
  );
};

export default LookupModel;
