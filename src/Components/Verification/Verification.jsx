import React from "react";
import "./verification.scss";
import SignupForm from "../SignupForm/SignupForm";
import OtpVerificationForm from "../OtpVerificationForm/OtpVerificationForm";
import { useSelector } from "react-redux";

function Verification() {
  const status = useSelector((state) => state?.testSlice?.signupData?.status);
  return (
    <div className="v1-verification">
      <div className="v1-verification__description">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley
      </div>
      {!status && <SignupForm />}
      {status && <OtpVerificationForm />}
    </div>
  );
}

export default Verification;
