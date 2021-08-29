import React from "react";
import "./input.css";

function Input({ label, className, ...rest }) {
  return (
    <div className={`auth-input ${className}`}>
      <label className="login-label">{label}</label>
      <input {...rest} className="authInput" />
    </div>
  );
}

export default Input;
