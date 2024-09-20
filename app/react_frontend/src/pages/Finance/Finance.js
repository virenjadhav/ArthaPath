import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SwapOutlined,
  PieChartOutlined,
  DollarCircleOutlined,
  LineChartOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import Transactions from "../transaction/Transactions";
import Budgets from "../budgets/Budgets";
import SavingGoals from "../saving_goals/SavingGoals";
import Investment from "../investment/Investment";
import Debt from "../debt/Debt";
// import "antd/dist/antd.css";

const Finance = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedKey, setSelectedKey] = useState("transactions");
  const [content, setContent] = useState(null);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    setModuleContent();
  }, [selectedKey]);

  const setModuleContent = () => {
    if (selectedKey === "transactions") {
      setContent(() => {
        return <Transactions title="Transactions" />;
      });
    } else if (selectedKey === "budgets") {
      setContent(() => {
        return <Budgets />;
      });
    } else if (selectedKey === "saving_goals") {
      setContent(() => {
        return <SavingGoals />;
      });
    } else if (selectedKey === "investment") {
      setContent(() => {
        return <Investment />;
      });
    } else if (selectedKey === "debt") {
      setContent(() => {
        return <Debt />;
      });
    } else {
      setContent(null);
    }
  };

  const onMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  const items = [
    {
      key: "transactions",
      icon: <SwapOutlined />,
      label: "Transactions",
    },
    {
      key: "budgets",
      icon: <PieChartOutlined />,
      label: "Budgets",
    },
    {
      key: "saving_goals",
      icon: <DollarCircleOutlined />,
      label: "Saving Goals",
    },
    {
      key: "investment",
      icon: <LineChartOutlined />,
      label: "Investment",
    },
    {
      key: "debt",
      icon: <CreditCardOutlined />,
      label: "Debt",
    },
  ];

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Side Menu */}
      <div
        style={{
          width: collapsed ? 100 : 256,
          transition: "width 0.2s",
          backgroundColor: "#001529",
          padding: "10px",
          height: "100%",
        }}
      >
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            marginBottom: 16,
            width: "100%",
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={["transactions"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
          onClick={onMenuClick}
          selectedKeys={[selectedKey]}
        />
      </div>

      {/* Content Section */}
      <div style={{ flexGrow: 1, padding: "20px" }}>
        {/* <h1>{selectedKey.charAt(0).toUpperCase() + selectedKey.slice(1)}</h1>
        <p>
          This is where the {selectedKey} content will be displayed on the right
          side.
        </p> */}
        {content}
      </div>
    </div>
  );
};

export default Finance;
