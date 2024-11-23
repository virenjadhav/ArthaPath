import React from "react";
import { Tabs } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the current tab key from the pathname
  const currentPath = location.pathname.split("/").pop() || "user_categories";

  const items = [
    { label: `User Categories`, key: "user_categories" },
    { label: `Common Categories`, key: "common_categories" },
    { label: "Custom Categories", key: "custom_categories" },
  ];

  // Handle tab change and navigate to the selected route
  const onTabChange = (key) => {
    navigate(`/profile/categories/${key}`);
  };

  return (
    <div>
      <Tabs activeKey={currentPath} onChange={onTabChange} items={items} />
      {/* Render nested routes */}
      <Outlet />
    </div>
  );
};

export default Categories;

// import React, { Children, useEffect, useState } from "react";
// import { Radio, Tabs } from "antd";
// import CommonCategories from "./CommonCategories";
// import UserCategory from "./UserCategory";
// import {
//   setData,
//   setServicesData,
// } from "../../redux/features/generic/modelSlice";
// import { useDispatch } from "react-redux";
// import CommonCategoryServicesData from "./CategoriesServices.json";
// import UserServicesData from "./UserCategoryServices.json";
// import CustomCategory from "./CustomCategory";
// import { setColumnsData } from "../../redux/features/generic/modelSlice";
// import UserCategoryColumnsData from "./UserCategoryColumns.json";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";
// // import type { RadioChangeEvent } from "antd";
// // import type { SizeType } from "antd/es/config-provider"; // Correct import
// import SetRoutingData from "../../components/SetRoutingData";
// import TabPane from "antd/es/tabs/TabPane";

// const Categories = () => {
//   //   const [size, setSize] = useState < SizeType > "small"; // Correct type annotation

//   //   const onChange = (e: RadioChangeEvent) => {
//   //     setSize(e.target.value); // Ensure correct type casting
//   //   };
//   const dispatch = useDispatch();
//   const [tab, setTab] = useState("user_category");
//   // const [tab, setTab] = useState(null);
//   const navigate = useNavigate();
//   const { pathname } = useLocation();
//   const [content, setContent] = useState(null);
//   // useEffect(() => {
//   // dispatch(setData(null));
//   // setOrResetServices(tab);
//   // }, [tab]);
//   const navigationData = [{ key: "" }];
//   useEffect(() => {}, [tab]);
//   // const setContentData = (tab) => {
//   //   setContent(null);
//   // };
//   // useEffect(() => {
//   //   const [_, path, contentPath] = pathname?.split("/");
//   //   setTabByLocation(path, contentPath);
//   // }, [pathname]);
//   // const setTabByLocation = (path, contentPath) => {
//   //   if (path) {
//   //     if (contentPath) {
//   //       setOrResetServices(contentPath);
//   //     } else {
//   //       // dispatch(setColumnsData(null));
//   //       // dispatch(setServicesData(null));
//   //     }
//   //   } else {
//   //     // dispatch(setColumnsData(null));
//   //     // dispatch(setServicesData(null));
//   //   }
//   // };
//   // const setOrResetServices = (tab) => {
//   //   switch (tab) {
//   //     case "categories/user_categories":
//   //       // dispatch(setColumnsData(UserCategoryColumnsData));
//   //       // dispatch(setServicesData(UserServicesData));
//   //       break;
//   //     case "categories/common_categories":
//   //       // dispatch(setColumnsData(null));
//   //       // dispatch(setServicesData(CommonCategoryServicesData));
//   //       break;
//   //     case "categories/custom_categories":
//   //       // dispatch(setColumnsData(UserCategoryColumnsData));
//   //       // dispatch(setServicesData(UserServicesData));
//   //       break;
//   //     default:
//   //     // dispatch(setColumnsData(null));
//   //     // dispatch(setServicesData(null));
//   //   }
//   // };
//   const items = [
//     {
//       label: `User Categories`,
//       key: "user_category",
//       // children: <UserCategory />,
//       children: <Outlet />,
//     },
//     {
//       label: `Common Categories`,
//       key: "common_category",
//       // children: <CommonCategories />,
//       children: <Outlet />,
//     },
//     {
//       label: "Custom Categories",
//       key: "custom_category",
//       // children: <CustomCategory title={"Category"} />,
//       children: <Outlet />,
//     },
//   ];
//   // useEffect(() => {
//   //   const navigationToPath =
//   // }, [tab])
//   const onTabChange = (e) => {
//     if (e != tab) {
//       setTab(e);
//     }
//     switch (e) {
//       case "user_category":
//         navigate("/profile/categories/user_categories");
//         break;
//       case "common_category":
//         navigate("/profile/categories/common_categories");
//         break;
//       case "custom_category":
//         navigate("/profile/categories/custom_categories");
//         break;
//       default:
//         navigate("/profile/categories");
//     }
//   };

//   return (
//     <>
//       <div>
//         {/* <Radio.Group
//           value={size}
//           onChange={onChange}
//           style={{ marginBottom: 16 }}
//         >
//           <Radio.Button value="small">Small</Radio.Button>
//           <Radio.Button value="middle">Middle</Radio.Button>
//           <Radio.Button value="large">Large</Radio.Button>
//         </Radio.Group> */}
//         {/* <Tabs
//           defaultActiveKey="1"
//           style={{ marginBottom: 32 }}
//           items={new Array(3).fill(null).map((_, i) => {
//             const id = String(i + 1);
//             return {
//               label: `Tab ${id}`,
//               key: id,
//               children: `Content of tab ${id}`,
//             };
//           })}
//         /> */}
//         <Tabs
//           defaultActiveKey="1"
//           type="card"
//           tabBarGutter={20}
//           items={items}
//           onChange={onTabChange}
//         />
//         {/* new Array(3).fill(null).map((_, i) => {
//             const id = String(i + 1);
//             return {
//               label: `Card Tab ${id}`,
//               key: id,
//               children: `Content of card tab ${id}`,
//             };
//           }) */}
//         {/* {content} */}
//         {/* <Tabs activeKey={""} onChange={onTabChange}> */}
//         {/* <TabPane tab="Tab 1" key="1">
//             {<div>Content of Tab 1</div>}
//           </TabPane>
//           <TabPane tab="Tab 2" key="2">
//             <div>Content of Tab 2</div>
//           </TabPane>
//           <TabPane tab="Tab 3" key="3">
//             <div>Content of Tab 3</div>
//           </TabPane> */}
//         {/* {content} */}
//         {/* </Tabs> */}
//       </div>
//     </>
//   );
// };

// export default Categories;
