import React, { useState } from "react";
import "./signupForm.scss";
import InputField from "../InputField/InputField";
import Button1 from "../Button/Button1";
import { signUp } from "../../redux/testSlice";
import { useDispatch, useSelector } from "react-redux";

function SignupForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [employeeSize, setEmployeeSize] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const formData = {
      name,
      phone,
      companyName,
      companyEmail,
      employeeSize,
    };
    dispatch(
      signUp({
        name,
        companyname: companyName,
        email: companyEmail,
        phonenumber: phone,
        employeesize: employeeSize,
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
          logo={"person"}
          placeholder={"Name"}
          type={"text"}
          value={name}
          customState={setName}
        />
        <InputField
          logo={"call"}
          placeholder={"Phone No."}
          type={"tel"}
          value={phone}
          customState={setPhone}
        />
        <InputField
          logo={"person"}
          placeholder={"Company Name"}
          type={"text"}
          value={companyName}
          customState={setCompanyName}
        />
        <InputField
          logo={"mail"}
          placeholder={"Company Email"}
          type={"email"}
          value={companyEmail}
          customState={setCompanyEmail}
        />
        <InputField
          logo={"groups"}
          placeholder={"Employee Size"}
          type={"number"}
          value={employeeSize}
          customState={setEmployeeSize}
        />
        <div className="v1-signup-form__consent">
          By clicking on proceed you will accept our{" "}
          <span className="blue">Terms</span> &{" "}
          <span className="blue">Conditions</span>
        </div>
        <Button1 text={"Proceed"} onClickFunction={() => handleSubmit()} />
      </div>
    </div>
  );
}

export default SignupForm;
