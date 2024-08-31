// src/components/Header.js

import React, { useContext, useEffect, useState } from "react";
import { Layout, Menu, Dropdown, Button, Avatar } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
// import { AuthContext } from "../hooks/contexts/AuthContext.js";

import Translate from "./Transactions.js";
// import './Header.css';
import "../assets/css/Header.css";
import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../redux/features/generic/genericSlice.js";

import { logout } from "../redux/features/thunkAPI/genericApiThunk.js";
import { setLoggedIn } from "../redux/features/generic/genericSlice.js";

const { Header } = Layout;

const HeaderComponent = ({ selectedTab, setSelectedTab }) => {
  // Example state variables
  // const isLoggedIn = true; // Replace with actual login state
  // const [selectedTab, setSelectedTab] = useState(1);

  // const { authState, logout } = useContext(AuthContext);

  const dispatch = useDispatch();
  const { logged_in, user } = useSelector((state) => state.generic);
  useEffect(() => {}, [logged_in]);

  const handleMenuClick = (e) => {
    console.log(e);
    if (e.key !== selectedTab) {
      setSelectedTab(e.key);
    }
    if (e.key === "logout") {
      // Handle logout action
      console.log("Logging out...");
      // logout();
      dispatch(logout());
      dispatch(setLoggedIn(false));
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
        defaultSelectedKeys={[`${selectedTab}`]}
        onClick={handleMenuClick}
      >
        <Menu.Item key="1">Dashboard</Menu.Item>
        <Menu.Item key="2">Transactions</Menu.Item>
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
              {console.log(authState)}
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
              {/* {console.log(authState)} */}
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
