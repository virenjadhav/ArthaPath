import { Space } from "antd";
import React, { useEffect, useState } from "react";
import SBIIcon from "./BankIcon/SBI.png";
import sbiIcon from "./BankIcon/SBI.png";
import AxisIcon from "./BankIcon/Axis.png";
import BandhanIcon from "./BankIcon/Bandhan.png";
import BankOfBarodaIcon from "./BankIcon/BankOfBaroda.png";
import BankOfIndiaIcon from "./BankIcon/BankOfIndia.png";
import CanaraIcon from "./BankIcon/Canara.png";
import CentralBankIcon from "./BankIcon/CentralBank.png";
import FederalIcon from "./BankIcon/Federal.png";

import HDFCIcon from "./BankIcon/HDFC.png";
import ICICIIcon from "./BankIcon/ICICI.png";
import IDBIIcon from "./BankIcon/IDBI.png";
import IndusIndIcon from "./BankIcon/IndusInd.png";
import KotakIcon from "./BankIcon/Kotak.png";
import PNBIcon from "./BankIcon/PNB.png";
import RBLIcon from "./BankIcon/RBL.png";
import UCOIcon from "./BankIcon/UCO.png";
import UnionBankIcon from "./BankIcon/UnionBank.png";
import YesBankIcon from "./BankIcon/YesBank.png";

const BankLogo = ({ name, iconName }) => {
  const [icon, setIcon] = useState(null);
  const getPreferredIcon = (code) => {
    switch (code) {
      case "SBI":
        return SBIIcon;
      case "Axis":
        return AxisIcon;
      case "Bandhan":
        return BandhanIcon;
      case "BankOfBaroda":
        return BankOfBarodaIcon;
      case "BankOfIndia":
        return BankOfIndiaIcon;
      case "Canara":
        return CanaraIcon;
      case "CentralBank":
        return CentralBankIcon;
      case "Federal":
        return FederalIcon;
      case "HDFC":
        return HDFCIcon;
      case "ICICI":
        return ICICIIcon;
      case "IDBI":
        return IDBIIcon;
      case "IndusInd":
        return IndusIndIcon;
      case "Kotak":
        return KotakIcon;
      case "PNB":
        return PNBIcon;
      case "RBL":
        return RBLIcon;
      case "UCO":
        return UCOIcon;
      case "UnionBank":
        return UnionBankIcon;
      case "YesBank":
        return YesBankIcon;
      default:
        return null;
    }
  };
  useEffect(() => {
    if (iconName) {
      const filename = iconName?.split(".")?.[0];
      const iconPath = getPreferredIcon(filename);
      setIcon(iconPath);
    } else {
      setIcon(null);
    }
  }, [icon, iconName]);
  return (
    <>
      {/*  && ( */}
      <Space align="center">
        {/* {icon && ( */}
        <Space>
          <img
            src={icon}
            alt={""}
            style={{ maxWidth: 50, maxHeight: 50, marginRight: 10 }}
          />
        </Space>

        {/* )} */}
        {name}
      </Space>
    </>
  );
};

export default BankLogo;
