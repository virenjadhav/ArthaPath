import React, { useState } from "react";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CriteriaModel from "./CriteriaModel";

const SearchCriteriaComponent = ({ moduleTitle }) => {
  const [isSearchModelVisible, setIsSearchModelVisible] = useState(false);
  const handleSearchButtonClick = () => {
    setIsSearchModelVisible(true);
  };
  return (
    <>
      <CriteriaModel
        isSearchModelVisible={isSearchModelVisible}
        setIsSearchModelVisible={setIsSearchModelVisible}
      />
      <Button
        type="default"
        onClick={handleSearchButtonClick}
        icon={<SearchOutlined />}
        shape="circle"
        title={`Search ${moduleTitle}`}
      />
    </>
  );
};

export default SearchCriteriaComponent;
