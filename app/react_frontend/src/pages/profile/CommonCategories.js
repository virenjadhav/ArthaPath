import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Space, Switch, Button } from "antd";
import ButtonAddEditComponent from "../../components/ButtonsAddEditComponent";
import {
  setColumnsData,
  setServicesData,
} from "../../redux/features/generic/modelSlice";
import categoryServicesData from "./CategoriesServices.json";
import { useSaveCommonCategory } from "../../components/Services/CategoriesServices";
// import "../../assets/css/profile.css"
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
    dataIndex: "category_type",
    key: "category_type",
    width: "12%",
  },
];

const CommonCategories = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.model.data);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [checkStrictly, setCheckStrictly] = useState(false);
  const { saveCommonCategory } = useSaveCommonCategory();
  const user_id = useSelector((state) => state.generic.user?.user_id);

  useEffect(() => {
    if (categoryServicesData) {
      dispatch(setServicesData(categoryServicesData));
    }
  }, [dispatch, categoryServicesData]);
  useEffect(() => {
    dispatch(setColumnsData(columns));
  }, columns);
  // rowSelection objects indicates the need for row selection
  // Set default selected rows based on the active field
  // useEffect(() => {
  //   if (data && Array.isArray(data)) {
  //     // Check if data is defined and an array
  //     const defaultSelectedKeys = data
  //       .filter((item) => item.active === true) // Select rows where active is 1
  //       .map((item) => item.key);
  //     setSelectedRowKeys(defaultSelectedKeys); // Set selectedRowKeys state
  //   }
  // }, [data]);
  useEffect(() => {
    if (data && Array.isArray(data)) {
      const defaultSelectedKeys = [];

      data.forEach((item) => {
        if (item.category_type === "main") {
          const activeSubCategories =
            item.children?.filter((sub) => sub.active === true) || [];

          if (activeSubCategories.length === item.children?.length) {
            // All subcategories are active, select the main category
            defaultSelectedKeys.push(item.key);
          } else {
            // Select only active subcategories
            activeSubCategories.forEach((sub) =>
              defaultSelectedKeys.push(sub.key)
            );
          }
        } else if (item.active) {
          // Select standalone active items (non-main, non-sub)
          defaultSelectedKeys.push(item.key);
        }
      });

      setSelectedRowKeys(defaultSelectedKeys);
    }
  }, [data]);
  const rowSelection = {
    selectedRowKeys,
    // onChange: (selectedRowKeys, selectedRows) => {

    // },

    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
    // onSelect: (record, selected, selectedRows) => {
    //   console.log(record, selected, selectedRows);
    // },
    // onSelectAll: (selected, selectedRows, changeRows) => {
    //   console.log(selected, selectedRows, changeRows);
    // },
  };
  useEffect(() => {}, [selectedRowKeys]);

  const handleExpand = (expanded, record) => {
    if (expanded) {
      setExpandedRowKeys([record.key]);
    } else {
      setExpandedRowKeys([]);
    }
  };

  // const columns = [
  //   {
  //     title: 'Name',
  //     dataIndex: 'name',
  //     key: 'name',
  //   },
  //   {
  //     title: 'Code',
  //     dataIndex: 'code',
  //     key: 'code',
  //     width: '12%',
  //   },
  //   {
  //     title: 'Type',
  //     dataIndex: 'type',
  //     width: '30%',
  //     key: 'type',
  //   },
  // ];

  const afterSaveClickHandler = (response) => {};
  const handleSave = async () => {
    // const updatedData = data.map((item) => ({
    //   ...item,
    //   active: selectedRowKeys.includes(item.key) ? 1 : 0,
    // }));
    const updatedData = data.map((item) => {
      const isMainCategorySelected = selectedRowKeys.includes(item.key);

      const isAnySubCategorySelected =
        item.children &&
        item.children.some((subItem) => selectedRowKeys.includes(subItem.key));

      const updatedItem = {
        ...item,
        active:
          isMainCategorySelected || isAnySubCategorySelected ? true : false,
        user_id: user_id,
      };

      if (item.children && item.children.length > 0) {
        updatedItem.children = item.children.map((subItem) => ({
          ...subItem,
          active: selectedRowKeys.includes(subItem.key) ? true : false,
          user_id: user_id,
        }));
      }

      return updatedItem;
    });
    let payload = {
      data: { updatedItem: updatedData, user_id },
    };
    await saveCommonCategory(payload, afterSaveClickHandler);
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
        <ButtonAddEditComponent
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
        rowSelection={{
          ...rowSelection,
          checkStrictly,
          columnWidth: 10, // Adjusted width for select button column
        }}
      />
      <Space>
        <Button type="primary" onClick={handleSave}>
          Save
        </Button>
      </Space>
      {/* // checkStrictly, */}
    </>
  );
};

export default CommonCategories;

// import React, { useEffect, useState } from 'react'
// import { useCommonCategoryAction } from '../../components/CommonServices';
// import ButtonAddEditComponent from "../../components/ButtonsAddEditComponent"
// import { setServicesData } from '../../redux/features/generic/modelSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { Space, Switch, Table } from 'antd';

// const CommonCategories = () => {
//   const dispatch = useDispatch()
//   const data = useSelector(state => state.model.data)
//   // const data = [
//   //   {
//   //     key: 1,
//   //     name: 'John Brown sr.',
//   //     age: 60,
//   //     address: 'New York No. 1 Lake Park',
//   //     children: [
//   //       {
//   //         key: 11,
//   //         name: 'John Brown',
//   //         age: 42,
//   //         address: 'New York No. 2 Lake Park',
//   //       },
//   //       {
//   //         key: 12,
//   //         name: 'John Brown jr.',
//   //         age: 30,
//   //         address: 'New York No. 3 Lake Park',
//   //         children: [
//   //           {
//   //             key: 121,
//   //             name: 'Jimmy Brown',
//   //             age: 16,
//   //             address: 'New York No. 3 Lake Park',
//   //           },
//   //         ],
//   //       },
//   //       {
//   //         key: 13,
//   //         name: 'Jim Green sr.',
//   //         age: 72,
//   //         address: 'London No. 1 Lake Park',
//   //         children: [
//   //           {
//   //             key: 131,
//   //             name: 'Jim Green',
//   //             age: 42,
//   //             address: 'London No. 2 Lake Park',
//   //             children: [
//   //               {
//   //                 key: 1311,
//   //                 name: 'Jim Green jr.',
//   //                 age: 25,
//   //                 address: 'London No. 3 Lake Park',
//   //               },
//   //               {
//   //                 key: 1312,
//   //                 name: 'Jimmy Green sr.',
//   //                 age: 18,
//   //                 address: 'London No. 4 Lake Park',
//   //               },
//   //             ],
//   //           },
//   //         ],
//   //       },
//   //     ],
//   //   },
//   //   {
//   //     key: 2,
//   //     name: 'Joe Black',
//   //     age: 32,
//   //     address: 'Sydney No. 1 Lake Park',
//   //   },
//   // ];
//   const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Code ',
//       dataIndex: 'code',
//       key: 'code',
//       width: '12%',
//     },
//     {
//       title: 'type',
//       dataIndex: 'type',
//       width: '30%',
//       key: 'type',
//     },
//   ];
//   // const columns = [
//   //   {
//   //     title: 'Name',
//   //     dataIndex: 'name',
//   //     key: 'name',
//   //   },
//   //   {
//   //     title: 'Age',
//   //     dataIndex: 'age',
//   //     key: 'age',
//   //     width: '12%',
//   //   },
//   //   {
//   //     title: 'Address',
//   //     dataIndex: 'address',
//   //     width: '30%',
//   //     key: 'address',
//   //   },
//   // ];
//   // Define columns for the main categories
//   // const mainColumns = [
//   //   {
//   //     title: 'Name',
//   //     dataIndex: 'name',
//   //     key: 'name',
//   //   },
//   //   {
//   //     title: 'Code',
//   //     dataIndex: 'code',
//   //     key: 'code',
//   //   },
//   //   {
//   //     title: 'Type',
//   //     dataIndex: 'type',
//   //     key: 'type',
//   //   }
//   // ];
//   // Define how to render expanded rows for sub-categories
//   // const expandedRowRender = (mainCategory) => {
//   //   const subColumns = [
//   //     {
//   //       title: 'Name',
//   //       dataIndex: 'name',
//   //       key: 'name',
//   //     },
//   //     {
//   //       title: 'Code',
//   //       dataIndex: 'code',
//   //       key: 'code',
//   //     },
//   //     {
//   //       title: 'Type',
//   //       dataIndex: 'type',
//   //       key: 'type',
//   //     }
//   //   ];
//   //   return <Table columns={subColumns} dataSource={mainCategory.sub_categories} rowKey="id" pagination={false} />;
//   // };
//   // const {commonCategoryAction} = useCommonCategoryAction();
//   // useEffect(() => {
//     // if (transactionServicesData) {
//     //   dispatch(setServicesData(transactionServicesData));
//     // }
//     // // Cleanup function to remove component on unmount
//     // return () => {
//     //   if (transactionServicesData) {
//     //     // delete formComponentProps.current[name];
//     //     dispatch(setServicesData(null));
//     //   }
//     // };
//   // }, [transactionServicesData]);
//   // rowSelection objects indicates the need for row selection

//   useEffect(() => {
//     const serviceDetail =[ {
//       id: "getList",
//       url: "/get_common_categories",
//       key: "get_common_categories",
//       name: "generic/get_common_categories",
//       method: "get",
//     }];
//     dispatch(setServicesData(serviceDetail));
//   }, [])
//   // return (
//     // <div>
//     //   <ButtonAddEditComponent deleteVisible={false} addVisible={false} editVisible={false} criteriaVisible={false}/>
//     // <Table
//     //   columns={mainColumns}
//     //   dataSource={data}
//     //   rowKey="id"
//     //   expandable={{ expandedRowRender }}

//     // />
//     // </div>
//   // )
//   const [checkStrictly, setCheckStrictly] = useState(false);
//   return (
//     <>
//       <Space
//         align="center"
//         style={{
//           marginBottom: 16,
//         }}
//       >
//         CheckStrictly: <Switch checked={checkStrictly} onChange={setCheckStrictly} />
//       </Space>
//         <ButtonAddEditComponent deleteVisible={false} addVisible={false} editVisible={false} criteriaVisible={false}/>
//       <Table
//         columns={columns}
//         rowSelection={{
//           ...rowSelection,
//           checkStrictly,
//         }}
//         dataSource={data}
//       />
//     </>
//   );
// }

// export default CommonCategories

// import React, { useState } from 'react';
// import { Space, Switch, Table } from 'antd';
// const columns = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//     key: 'age',
//     width: '12%',
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//     width: '30%',
//     key: 'address',
//   },
// ];
// const data = [
//   {
//     key: 1,
//     name: 'John Brown sr.',
//     age: 60,
//     address: 'New York No. 1 Lake Park',
//     children: [
//       {
//         key: 11,
//         name: 'John Brown',
//         age: 42,
//         address: 'New York No. 2 Lake Park',
//       },
//       {
//         key: 12,
//         name: 'John Brown jr.',
//         age: 30,
//         address: 'New York No. 3 Lake Park',
//         children: [
//           {
//             key: 121,
//             name: 'Jimmy Brown',
//             age: 16,
//             address: 'New York No. 3 Lake Park',
//           },
//         ],
//       },
//       {
//         key: 13,
//         name: 'Jim Green sr.',
//         age: 72,
//         address: 'London No. 1 Lake Park',
//         children: [
//           {
//             key: 131,
//             name: 'Jim Green',
//             age: 42,
//             address: 'London No. 2 Lake Park',
//             children: [
//               {
//                 key: 1311,
//                 name: 'Jim Green jr.',
//                 age: 25,
//                 address: 'London No. 3 Lake Park',
//               },
//               {
//                 key: 1312,
//                 name: 'Jimmy Green sr.',
//                 age: 18,
//                 address: 'London No. 4 Lake Park',
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     key: 2,
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//   },
// ];

// // rowSelection objects indicates the need for row selection
// const rowSelection = {

// const CommonCategories = () => {
//   const [checkStrictly, setCheckStrictly] = useState(false);
//   return (
//     <>
//       <Space
//         align="center"
//         style={{
//           marginBottom: 16,
//         }}
//       >
//         CheckStrictly: <Switch checked={checkStrictly} onChange={setCheckStrictly} />
//       </Space>
//       <Table
//         columns={columns}
//         rowSelection={{
//           ...rowSelection,
//           checkStrictly,
//         }}
//         dataSource={data}
//       />
//     </>
//   );
// };

// export default CommonCategories;
