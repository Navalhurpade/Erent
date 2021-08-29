import React, { useState } from "react";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import "./loginModal.css";

function LogInModal({ onLogin, onGoBack }) {
  return (
    <div className="login-modal">
      <Input type="email" label="Email/Username" />
      <Input type="password" label="Passworld" className="password-feed" />
      <div>
        <input type="checkbox" className="checkbox"></input>
        <label className="login-note">Remember me on this computer</label>
      </div>
      <div className="login-btn-container">
        <Button onClick={onGoBack} title="&lt;&lt; back" />
        <Button title="Login" bgColor="#56BAED" whiteText />
      </div>
    </div>
  );
}

export default LogInModal;
