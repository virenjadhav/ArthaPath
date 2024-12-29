import React from "react";
import mainCategoryData from "./LookupXml/main_categories.json";
import sourceTypeData from "./LookupXml/source_type.json";
import accountData from "./LookupXml/account.json";

const LookupFormatUrl = (LookupFormatUrl) => {
  if (LookupFormatUrl) {
    switch (LookupFormatUrl) {
      case "main_categories":
        return mainCategoryData;
      case "sub_categories":
        return mainCategoryData;
      case "bank_format":
        return mainCategoryData;
      case "source_type":
        return sourceTypeData;
      case "account_format":
        return accountData;
      default:
        return [];
    }
  }
};

export default LookupFormatUrl;
