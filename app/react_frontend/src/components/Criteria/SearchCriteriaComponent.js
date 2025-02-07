import React, { useState } from "react";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CriteriaModel from "./CriteriaModel";
import { useSelector } from "react-redux";

const SearchCriteriaComponent = ({ moduleTitle, isDetailModelComponent }) => {
  const [isSearchModelVisible, setIsSearchModelVisible] = useState(false);
  // const isDetailModel = useSelector((state) => state.model.isDetailModel);
  const selectedMainRecord = useSelector(
    (state) => state.model.selectedMainRecord
  );
  const handleSearchButtonClick = () => {
    setIsSearchModelVisible(true);
  };
  return (
    <>
      <CriteriaModel
        isSearchModelVisible={isSearchModelVisible}
        setIsSearchModelVisible={setIsSearchModelVisible}
        isDetailModelComponent={isDetailModelComponent}
      />
      <Button
        type="default"
        onClick={handleSearchButtonClick}
        icon={<SearchOutlined />}
        shape="circle"
        title={`Search ${moduleTitle}`}
        key="searchButton"
        disabled={
          isDetailModelComponent == true && !selectedMainRecord ? true : false
        }
      />
    </>
  );
};

export default SearchCriteriaComponent;
