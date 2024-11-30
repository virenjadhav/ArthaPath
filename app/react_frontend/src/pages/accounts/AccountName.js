import { Space } from "antd";
import React from "react";

const AccountName = ({ card }) => {
  return (
    <>
      <Space align="center">
        {/* Display bank logo */}
        {card.bankIcon && (
          <img
            src={card.bankIcon}
            alt={card.bankName}
            style={{ width: 24, height: 24, marginRight: 8 }}
          />
        )}
        {card.name}
      </Space>
    </>
  );
};

export default AccountName;
