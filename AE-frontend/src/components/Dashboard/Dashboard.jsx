import React from "react";
// import DashboardNormal from "./DashboardNormal";
// import DashboardTop from "./DashboardTop";
// import DashboardSCFA from "./DashboardSCFA";
// import DashboardTop from "../DashboardTop"
import DashboardTopPanelPie from "../DashboardTopPanelPie/DashboardTopPanelPie";

import DashboardTopPanelBar from "../DashboardTopPanelBar/DashboardTopPanelBar";

const Dashboard = ({ user }) => {
  return (
    <>
      <h1>Dashboard - This is the Main Dashboard site</h1>
      <h5>
        -------------------------------------------------------------------------------------------------
      </h5>
      {/* <DashboardTopPanelPie />     */}
      <DashboardTopPanelBar />
    </>
  );
};
export default Dashboard;
