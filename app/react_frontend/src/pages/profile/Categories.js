import React, { useState } from "react";
import { Radio, Tabs } from "antd";
import CommonCategories from "./CommonCategories";
import UserCategory from "./UserCategory";
// import type { RadioChangeEvent } from "antd";
// import type { SizeType } from "antd/es/config-provider"; // Correct import

const Categories = () => {
  //   const [size, setSize] = useState < SizeType > "small"; // Correct type annotation

  //   const onChange = (e: RadioChangeEvent) => {
  //     setSize(e.target.value); // Ensure correct type casting
  //   };

  const items = [
    {
      label: `User Categories`,
      key: "user_category",
      children: <UserCategory />
    },
    {
      label: `Common Categories`,
      key: "common_category",
      children: <CommonCategories />,
    },
    {
      label: "Custom Categories",
      key: "custom_category",
      children: `Custom Category`,
    },
  ];

  return (
    <>
      <div>
        {/* <Radio.Group
          value={size}
          onChange={onChange}
          style={{ marginBottom: 16 }}
        >
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="middle">Middle</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group> */}
        {/* <Tabs
          defaultActiveKey="1"
          style={{ marginBottom: 32 }}
          items={new Array(3).fill(null).map((_, i) => {
            const id = String(i + 1);
            return {
              label: `Tab ${id}`,
              key: id,
              children: `Content of tab ${id}`,
            };
          })}
        /> */}
        <Tabs
          defaultActiveKey="1"
          type="card"
          tabBarGutter={20}
          items={items}
        />
        {/* new Array(3).fill(null).map((_, i) => {
            const id = String(i + 1);
            return {
              label: `Card Tab ${id}`,
              key: id,
              children: `Content of card tab ${id}`,
            };
          }) */}
      </div>
    </>
  );
};

export default Categories;
