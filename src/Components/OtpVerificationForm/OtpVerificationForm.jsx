import React, { useState } from "react";
import "../SignupForm/signupForm.scss";
import InputField from "../InputField/InputField";
import Button1 from "../Button/Button1";
import { otpVerification } from "../../redux/testSlice";
import { useDispatch, useSelector } from "react-redux";

function OtpVerificationForm() {
  const dispatch = useDispatch();
  const [emailOtp, setEmailOtp] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const data = useSelector((state) => state?.testSlice);
  console.log(data, "@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

  const handleEmailOtpVerify = () => {
    console.log("Email OTP Verified:", emailOtp);
    dispatch(
      otpVerification({
        email: data?.signupData?.data?.user?.email,
        emailotp: emailOtp,
      })
    );
  };

  const handleMobileOtpVerify = () => {
    console.log("Mobile OTP Verified:", mobileOtp);
    dispatch(
      otpVerification({
        email: data?.signupData?.data?.user?.email,
        numberotp: mobileOtp,
      })
    );
  };

  return (
    <div className="v1-signup-form">
      <div className="v1-signup-form__title-container">
        <div className="v1-signup-form__title">Sign Up</div>
        <div className="v1-signup-form__title-description">
          Lorem Ipsum is simply dummy text
        </div>
      </div>
      <div className="v1-signup-form__details-container wi-100">
        <InputField
          logo={"mail"}
          placeholder={"Email OTP"}
          type={"number"}
          value={emailOtp}
          customState={setEmailOtp}
        />
        <Button1
          text={"Verify"}
          onClickFunction={() => handleEmailOtpVerify()}
        />

        <InputField
          logo={"call"}
          placeholder={"Mobile OTP"}
          type={"number"}
          value={mobileOtp}
          customState={setMobileOtp}
        />
        <Button1
          text={"Verify"}
          onClickFunction={() => handleMobileOtpVerify()}
        />
      </div>
    </div>
  );
}

export default OtpVerificationForm;
