import React, { useEffect, useState } from "react";
import { Menu, Switch } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "../../assets/css/profile.css";
import GeneralProfile from "./GeneralProfile";
import ChangePassword from "./ChangePassword";
import Categories from "./Categories";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const { SubMenu } = Menu;

const Profile = () => {
  const [theme, setTheme] = useState("dark"); // Default theme is dark
  const [selectedKey, setSelectedKey] = useState(null);
  const [content, setContent] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };
  const generalContent = () => {
    return <GeneralProfile />;
  };
  const changePasswordContent = () => {
    return <ChangePassword />;
  };
  const categoryContent = () => {
    return <Categories />;
  };
  // useEffect(() => {
  //   const navigateToPath = () => {
  //     switch (selectedKey) {
  //       case "general":
  //         navigate("/profile/info");
  //         break;
  //       case "changePassword":
  //         navigate("/profile/change_password");
  //         break;
  //       case "categories":
  //         navigate("/profile/categories/custom_categories");
  //         break;
  //       default:
  //         navigate("/profile");
  //     }
  //   };
  //   navigateToPath();
  // }, [selectedKey]);

  // useEffect(() => {
  //   const [_, path, contentPath] = pathname?.split("/");
  //   setContentByLocation(path, contentPath);

  // }, [pathname]);
  // const setContentByLocation = (path, contentPath) => {
  //   if (path) {
  //     if (contentPath) {
  //       setModuleContent(contentPath);
  //     } else {
  //       setContent(null);
  //     }
  //   } else {
  //     setContent(null);
  //   }
  // };
  // const setModuleContent = (selectedContent) => {
  //   switch (selectedContent) {
  //     case "info":
  //       setContent(generalContent);
  //       break;
  //     case "change_password":
  //       setContent(changePasswordContent);
  //       break;
  //     case "categories":
  //       setContent(categoryContent);
  //       break;
  //     default:
  //       setContent(null);
  //   }
  // };
  // useEffect(() => {
  //   const setContentForrender = () => {
  //     switch (selectedKey) {
  //       case "general":
  //         setContent(generalContent);
  //         break;
  //       case "changePassword":
  //         setContent(changePasswordContent);
  //         break;
  //       case "categories":
  //         setContent(categoryContent);
  //         break;
  //       default:
  //         setContent(null);
  //     }
  //   };
  //   setContentForrender();
  // }, [selectedKey]);

  // const handleMenuClick = (e) => {
  //   if (e.key !== null) {
  //     setSelectedKey(e.key);
  //   } else {
  //     setSelectedKey(null);
  //   }
  // };
  const handleMenuClick = (e) => {
    switch (e.key) {
      case "general":
        navigate("/profile/info");
        break;
      case "changePassword":
        navigate("/profile/change_password");
        break;
      case "categories":
        navigate("/profile/categories");
        break;
      case "banks":
        navigate("/profile/banks");
        break;
      case "accounts":
        navigate("/profile/Accounts");
        break;
      default:
        break;
    }
  };

  return (
    <div className={`profile-container ${theme}-theme`}>
      <div className={`profile-menu ${theme}-theme profile-menu-main`}>
        <Switch
          checked={theme === "dark"}
          onChange={changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
          className="triggerButton"
        />
        <Menu theme={theme} mode="inline" onClick={handleMenuClick}>
          {/* <SubMenu
            key="sub1"
            title={
              <span>
                <MailOutlined style={{ fontSize: '24px', color: '#08c' }} />
                <span>Navigation One</span>
              </span>
            }
          >
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <AppstoreOutlined style={{ fontSize: '24px', color: '#08c' }} />
                <span>Navigation Two</span>
              </span>
            }
          >
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <SettingOutlined style={{ fontSize: '24px', color: '#08c' }} />
                <span>Navigation Three</span>
              </span>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu> */}
          {/* <Menu.ItemGroup key="g1" title=""> */}
          <Menu.Item key="general">General</Menu.Item>
          <Menu.Item key="changePassword">Change Password</Menu.Item>
          <Menu.Item key="categories">Categories</Menu.Item>
          <Menu.Item key="banks">Banks</Menu.Item>
          <Menu.Item key="accounts">Accounts</Menu.Item>
          {/* </Menu.ItemGroup> */}
        </Menu>
      </div>
      <div className="profile-content" style={{ marginTop: 20 }}>
        {/* <h1>Content Goes Here</h1>
        <p>This is where the main content will be displayed on the right side.</p> */}
        {/* {content} */}
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
