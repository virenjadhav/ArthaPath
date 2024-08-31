import React, { useEffect, useState } from "react";
import Header from "../components/Header.js";
import Dashboard from "../components/Dashboard.js";
import Transactions from "../components/Transactions.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const [selectedTab, setSelectedTab] = useState("1"); // Default to Dashboard
  // const logged_in = useSelector((state) => state.generic.logged_in);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("logged_in flag");
  //   console.log(logged_in);
  //   if (logged_in == false) {
  //     navigate("/login");
  //   } else {
  //     navigate("/");
  //   }
  // }, [logged_in]);
  return (
    <>
      <Header selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {/* {selectedTab === "1" && <Dashboard />} */}
      {/* {selectedTab === "2" && <Transactions />} */}
      Home
      {/* {logged_in == true ? <p>true</p> : <p>false</p>} */}
    </>
  );
}

export default Home;
