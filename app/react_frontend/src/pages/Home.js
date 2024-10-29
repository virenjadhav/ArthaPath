import React, { useEffect, useState } from "react";
import Header from "../components/Header.js";
// import Dashboard from "../components/Dashboard.js";
// import Transactions from "../components/Transactions.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  // const [selectedTab, setSelectedTab] = useState("1"); // Default to Dashboard
  // const selectedModel = useSelector((state) => state.model.selectedModel);
  // const logged_in = useSelector((state) => state.generic.logged_in);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (logged_in == false) {
  //     navigate("/login");
  //   } else {
  //     navigate("/");
  //   }
  // }, [logged_in]);
  // useEffect(() => {}, [selectedModel])
  return (
    <>
      Home
      {/* <Header /> */}
      {/* {selectedModel === "1" && <Dashboard />}  */}
      {/* {selectedModel === "2" && <Transactions />}  */}
      {/* {logged_in == true ? <p>true</p> : <p>false</p>} */}
    </>
  );
}

export default Home;
