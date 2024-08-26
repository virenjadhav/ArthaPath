// src/components/Header.js

import React from 'react';
import { Layout, Menu, Dropdown, Button, Avatar } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
// import './Header.css';
import "../assets/css/Header.css";

const { Header } = Layout;

const HeaderComponent = () => {
  // Example state variables
  const isLoggedIn = true; // Replace with actual login state
  const userProfile = { name: 'John Doe', avatarUrl: '' }; // Replace with actual user profile

  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      // Handle logout action
      console.log('Logging out...');
    }
  };

  const userMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">
        Profile
      </Menu.Item>
      <Menu.Item key="logout">
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="header">
      <div className="logo">MyLogo</div>
      <Menu theme="dark" mode="horizontal" className="menu" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">Dashboard</Menu.Item>
        <Menu.Item key="2">Transactions</Menu.Item>
        <Menu.Item key="3">Budgets</Menu.Item>
        <Menu.Item key="4">Savings Goals</Menu.Item>
        <Menu.Item key="5">Reports</Menu.Item>
        <Menu.Item key="6">Profile</Menu.Item>
      </Menu>
      <div className="auth-buttons">
        {isLoggedIn ? (
          <Dropdown overlay={userMenu} trigger={['click']}>
            <Button className="profile-button">
              <Avatar src={userProfile.avatarUrl} icon={<UserOutlined />} />
              {userProfile.name}
              <DownOutlined />
            </Button>
          </Dropdown>
        ) : (
          <Button type="primary" className="login-button">Login</Button>
        )}
      </div>
    </Header>
  );
};

export default HeaderComponent;
