// src/components/Header.js
// import { AuthContext } from "../hooks/contexts/AuthContext.js";

// import Translate from "./Transactions.js";
// import './Header.css';
// import { setSelectedModel } from "../redux/features/generic/genericSlice.js";
// import { logout } from "../redux/features/generic/genericSlice.js";

import React, { useEffect, useState } from "react";
import { Layout, Menu, Dropdown, Button, Avatar } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import "../assets/css/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/generic/genericApiThunk";
import {
  setLoggedIn,
  setSelectedModelCode,
  setSelectedModelId,
} from "../redux/features/generic/genericSlice.js";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const HeaderComponent = () => {
  // Example state variables
  // const isLoggedIn = true; // Replace with actual login state
  // const [selectedTab, setSelectedTab] = useState(1);

  // const { authState, logout } = useContext(AuthContext);

  const dispatch = useDispatch();
  const { logged_in, user } = useSelector((state) => state.generic);
  useEffect(() => {}, [logged_in]);
  const selectedModelId = useSelector((state) => state.generic.selectedModelId);
  const navigate = useNavigate();
  const modules = useState({
    1: ["Dashboard", "dashboard"],
    2: ["Finance", "finance"],
  });

  useEffect(() => {
    let path = "/";

    switch (selectedModelId) {
      case "1":
        path = "/dashboard";
        break;
      case "2":
        path = "/finance";
        break;
        defalut: path = "/";
    }

    navigate(path);
  }, [selectedModelId]);
  const handleMenuClick = (e) => {
    if (e.key === "logout") {
      // Handle logout action
      console.log("Logging out...");
      // logout();
      dispatch(logout());
      dispatch(setLoggedIn(false));
      navigate("/login");
    } else if (e.key === "profile") {
      navigate("/profile");
    } else if (e.key !== selectedModelId) {
      dispatch(setSelectedModelId(e.key));
      dispatch(setSelectedModelCode(modules[0][e.key][1]));
    }
  };

  const userMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <Header className="header">
      <div className="logo">MyLogo</div>
      <Menu
        theme="dark"
        mode="horizontal"
        className="menu"
        defaultSelectedKeys={[`${selectedModelId}`]}
        onClick={handleMenuClick}
      >
        <Menu.Item key="1">{modules[0]["1"][0]}</Menu.Item>
        <Menu.Item key="2">{modules[0]["2"][0]}</Menu.Item>
        {/* <Menu.Item key="3">Budgets</Menu.Item> */}
        {/* <Menu.Item key="4">Savings Goals</Menu.Item> */}
        {/* <Menu.Item key="5">Reports</Menu.Item> */}
        {/* <Menu.Item key="6">Profile</Menu.Item> */}
      </Menu>
      <div className="auth-buttons">
        {/* {authState.isAuthenticated ? (
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <Button className="profile-button">
              <Avatar src={""} icon={<UserOutlined />} />
              
              {authState.user.name}
              <DownOutlined />
            </Button>
          </Dropdown>
        ) : (
          <Button type="primary" className="login-button">
            Login
          </Button>
        )} */}
        {logged_in ? (
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <Button className="profile-button">
              <Avatar src={""} icon={<UserOutlined />} />
              {/* {userProfile.name} */}
              {/* {authState.user.name} */}
              {user?.name}
              <DownOutlined />
            </Button>
          </Dropdown>
        ) : (
          <Button type="primary" className="login-button" onClick={(e) => e}>
            Login
          </Button>
        )}
      </div>
    </Header>
  );
};

export default HeaderComponent;
