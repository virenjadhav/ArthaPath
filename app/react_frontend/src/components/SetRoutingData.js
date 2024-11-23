import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SetRoutingData = () => {
  const { pathname } = useLocation();
  useEffect(() => {}, [pathname]);
  return <div>SetRoutingData</div>;
};

export default SetRoutingData;
