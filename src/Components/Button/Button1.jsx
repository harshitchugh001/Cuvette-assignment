import React from "react";
import './button1.scss';

function Button1({ text, onClickFunction = () => ("") }) {
  return <div className="button-type1" type={"submit"} onClick={() => onClickFunction()}>{text}</div>;
}

export default Button1;
