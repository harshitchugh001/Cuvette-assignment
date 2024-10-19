import React from "react";
import "./inputField.scss";

function InputField({ logo, placeholder, type, isChecked = false, customState = () => ("") }) {
  return (
    <div className="v1-input-field">
      <span className="material-symbols-outlined v1-input-field__icon">{logo}</span>
      <input
        className="v1-input-field__field"
        type={type}
        placeholder={placeholder}
        onChange={(e) => customState(e.target.value)}
      />
      {isChecked && (
        <span className="material-symbols-outlined filled v1-input-field__check-icon">
          check
        </span>
      )}
    </div>
  );
}

export default InputField;
