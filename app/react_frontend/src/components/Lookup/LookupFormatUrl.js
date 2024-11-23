import React from "react";
import mainCategoryData from "./LookupXml/main_categories.json";

const LookupFormatUrl = (LookupFormatUrl) => {
  if (LookupFormatUrl) {
    switch (LookupFormatUrl) {
      case "main_categories":
        return mainCategoryData;
      case "sub_categories":
        return mainCategoryData;
      default:
        return [];
    }
  }
};

export default LookupFormatUrl;
