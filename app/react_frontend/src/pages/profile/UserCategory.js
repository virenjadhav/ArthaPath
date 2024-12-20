import { Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import ButtonsAddEditComponent from "../../components/ButtonsAddEditComponent";
import { useDispatch, useSelector } from "react-redux";
import categoryServicesData from "./UserCategoryServices.json";
import {
  setColumnsData,
  setCriteriaDataStru,
  setServicesData,
} from "../../redux/features/generic/modelSlice";
import categoriesCriteriaData from "./CategoryCriteriaStru.json";
import columnsData from "./UserCategoryColumns.json";

const UserCategory = () => {
  const data = useSelector((state) => state.model.data);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // const [checkStrictly, setCheckStrictly] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const columns = columnsData.map((column) => {
      // if (column.dataIndex === "trans_date") {
      //   return {
      //     ...column,
      //     render: (text) => dayjs(text).format("YYYY-MM-DD"),
      //   };
      // }
      if (column.dataIndex === "radio") {
        return {
          ...column,
          className: "radio-button-column", // Apply the CSS class
          render: (_, record) => (
            <input
              type="radio"
              // checked={record.id === selectedRowKey}
              // onChange={() => handleSelectRow(record)}
            />
          ),
        };
      }
      return column;
    });
    dispatch(setColumnsData(columnsData));
  }, columnsData);
  useEffect(() => {
    if (categoryServicesData) {
      dispatch(setServicesData(categoryServicesData));
    }
    // Cleanup function to remove component on unmount
    return () => {
      if (categoryServicesData) {
        // delete formComponentProps.current[name];
        dispatch(setServicesData(null));
      }
    };
  }, [categoryServicesData]);

  useEffect(() => {
    if (categoriesCriteriaData) {
      dispatch(setCriteriaDataStru(categoriesCriteriaData));
    }
    // Cleanup function to remove component on unmount
    return () => {
      if (categoriesCriteriaData) {
        // delete formComponentProps.current[name];
        dispatch(setCriteriaDataStru(null));
      }
    };
  }, [categoriesCriteriaData]);

  const columns = [
    {
      title: "Code ",
      dataIndex: "code",
      key: "code",
      width: "30%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Type",
      dataIndex: "type",
      width: "20%",
      key: "type",
    },
    {
      title: "Category Type ",
      dataIndex: "user_category_type",
      key: "user_category_type",
      width: "12%",
    },
  ];
  const handleExpand = (expanded, record) => {
    if (expanded) {
      setExpandedRowKeys([record.key]);
    } else {
      setExpandedRowKeys([]);
    }
  };
  return (
    <>
      {/* <Space
        align="center"
        style={{
          marginBottom: 16,
        }}
      >
        CheckStrictly: <Switch checked={checkStrictly} onChange={setCheckStrictly} />
      </Space> */}
      <Space align="center" style={{ marginBottom: 16 }}>
        <ButtonsAddEditComponent
          deleteVisible={false}
          addVisible={false}
          editVisible={false}
          criteriaVisible={false}
        />
      </Space>
      <Table
        className="custom-select-table"
        columns={columns}
        dataSource={data}
        expandable={{
          expandedRowKeys,
          onExpand: handleExpand,
          rowExpandable: (record) =>
            record.children && record.children.length > 0,
        }}
        // rowSelection={{
        //   ...rowSelection,
        //   checkStrictly,
        //   columnWidth: 10, // Adjusted width for select button column
        // }}
      />
      {/* // checkStrictly, */}
    </>
  );
};

export default UserCategory;
