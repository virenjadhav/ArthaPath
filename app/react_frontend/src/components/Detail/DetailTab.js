import React, { act, useEffect, useState } from "react";
import { Radio, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import {
  AndroidOutlined,
  AppleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Detail from "./Detail";
import { useDispatch } from "react-redux";
import { setDetailState } from "../../redux/features/generic/modelSlice";
import {
  clearDetail,
  setDetailActiveTabKey,
} from "../../redux/features/generic/detailSlice";

const DetailTab = ({
  defaultActiveKey = null,
  tabPosition = null,
  tabType = "line",
  tabBarExtraContent = null,
  size = "default",
  tabGap = 50,
  animated = true,
  activeTabKey = null,
  destroyInactiveTabPane = false,
  addIcon = null,
  tabBarStyle = null,
  handleEdit = null,
  handleTabClick = null,
  handleTabChange = null,
  children,
}) => {
  const [mode, setMode] = useState("top");
  const [activeKey, setActiveKey] = useState(null);
  const dispatch = useDispatch();
  const onTabChange = (key) => {
    if (handleTabClick) {
      handleTabChange(key);
    }
  };
  const onTabClick = (key, event) => {
    if (key !== activeKey) {
      setActiveKey(key);
      dispatch(setDetailState(clearDetail()));
      dispatch(setDetailState(setDetailActiveTabKey(key)));
    }
    if (handleTabChange) {
      handleTabClick(key, event);
    }
  };

  useEffect(() => {}, [activeKey]);
  useEffect(() => {
    setActiveKey(activeTabKey);
    dispatch(setDetailState(clearDetail()));
    dispatch(setDetailState(setDetailActiveTabKey(activeTabKey)));
  }, [activeTabKey]);
  //   const handleModeChange = (e) => {
  //     setMode(e.target.value);
  //   };
  //   const handleEdit = (targetKey, action) => {
  //   };
  //   const tabData = [
  //     { key: "1", title: "Tab 1", content: "Content of Tab 1" },
  //     { key: "2", title: "Tab 2", content: "Content of Tab 2" },
  //     { key: "3", title: "Tab 3", content: "Content of Tab 3" },
  //   ];
  //   const tabData = children?.map((child) => {
  //   });
  //   const tabData = null;
  //   const enhancedChildren = React.Children.map(children, (child) =>
  //     // React.cloneElement(child, {
  //     //   formComponentProps,
  //     //   handleFormPropsChange: handleFormComponentChange,
  //     // })
  //     React.cloneElement(child)
  //   );
  //   const enhancedChildren = React.Children.map(children, (child) => {
  //     if (child.type === TabPane) {
  //       return child; // Pass TabPane as-is
  //     } else if (child.props?.children?.type === TabPane) {
  //       return child.props.children; // Extract TabPane if wrapped
  //     }
  //     return null; // Ignore non-TabPane components
  //   });
  const enhancedChildren = React.Children.map(children, (child) => {
    return child;
  });
  return (
    <>
      {/* <div> */}
      {/* <Radio.Group
          onChange={handleModeChange}
          value={mode}
          style={{
            marginBottom: 8,
          }}
        >
          <Radio.Button value="top">Horizontal</Radio.Button>
          <Radio.Button value="left">Vertical</Radio.Button>
        </Radio.Group> */}
      {/* <Tabs
          defaultActiveKey="1"
          tabPosition={mode}
          style={{
            height: 220,
          }}
          items={new Array(30).fill(null).map((_, i) => {
            const id = String(i);
            return {
              label: `Tab-${id}`,
              key: id,
              disabled: i === 28,
              children: `Content of tab ${id}`,
            };
          })}
        /> */}

      {/* </div> */}
      <Tabs
        defaultActiveKey={defaultActiveKey}
        tabPosition={tabPosition ? tabPosition : mode} // "top", "left", "right", "bottom"
        style={{
          height: 220,
          maxWidth: "100%",
          marginLeft: "10px",
        }}
        type={tabType} // "line", "card", "editable-card"
        tabBarExtraContent={
          //   <button onClick={() => alert("Extra action!")}>Extra Action</button>
          //   <button>Extra Action</button>
          tabBarExtraContent
        }
        animated={animated}
        activeKey={activeKey}
        size={size} //"small", "default", "large"
        destroyInactiveTabPane={destroyInactiveTabPane}
        addIcon={addIcon} // design add button when type = "editable-card"
        tabBarStyle={tabBarStyle} // add custom css to tab bar
        tabBarGutter={tabGap} // gap between tab
        onEdit={handleEdit} // if type is "editable-card" then handleEdit is handle edit the tab
        onTabClick={onTabClick} // handle on tab click
        onChange={onTabChange} // handle on tab change

        // items={new Array(30).fill(null).map((_, i) => {
        //   const id = String(i);
        //   return {
        //     label: `Tab-${id}`,
        //     key: id,
        //     disabled: i === 28,
        //     children: `Content of tab ${id}`,
        //   };
        // })}
      >
        {/* <TabPane
          tab={
            <span>
              <AppleOutlined />
              Apple
            </span>
          }
          key="1"
        >
          Content of Apple Tab
        </TabPane>
        <TabPane
          tab={
            <span>
              <AndroidOutlined />
              Android
            </span>
          }
          key="2"
        >
          Content of Android Tab
        </TabPane> */}
        {/* {tabData?.map((tab) => (
          <TabPane tab={tab.title} key={tab.key}>
            {tab.content}
          </TabPane>
        ))} */}
        {/* {enhancedChildren} */}
        {children}
      </Tabs>
    </>
  );
};

export default DetailTab;
