import React, { useState } from "react";
import Navbar from "../Components/Navabar/Navbar";
import "./dashboard.scss";
import JobForm from "../Components/JobForm/JobForm";
import Button1 from "../Components/Button/Button1";
// import { useDispatch, useSelector } from "react-redux";

function Dashboard() {
  const [clicked, setClicked] = useState(false);
  // const data = useSelector((state) => state?.testSlice?.value);

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="v1-dashboard">
        <div className="v1-dashboard__sidebar">
          <span className="material-symbols-outlined">home</span>
        </div>
        <div className="v1-dashboard__container">
          {!clicked && (
            <Button1
              text={"Create Interview"}
              onClickFunction={() => setClicked(true)}
            />
          )}
          {clicked && <JobForm />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
