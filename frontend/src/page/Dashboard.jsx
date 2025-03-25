import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({})

  useEffect(() => {
    fetch("http://localhost:5000/dashboard")
      .then((res)=>res.json())
      .then((data)=> setDashboard(data))
      .catch((err)=> console.log("Error occurred", err))
  }, [])
  
  return (
    <div>
      <h1>Dashboard</h1>
      {dashboard?.message && dashboard.message}
      <Outlet/>
    </div>
  );
};

export default Dashboard;
