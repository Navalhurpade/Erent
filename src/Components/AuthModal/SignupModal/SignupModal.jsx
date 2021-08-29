import React from "react";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import "./singupModal.css";

function SignupModal({ onGoBack, onSignup }) {
  return (
    <div className="signup-modal">
      <Input type="email" label="Email/Username" />
      <Input type="password" label="Passworld" className="password-feed" />
      <Input type="text" label="Conform Password" className="password-feed" />

      <div className="signup-btn-container">
        <Button onClick={onGoBack} title="&lt;&lt; back" />
        <Button title="Signup" bgColor="#56BAED" whiteText />
      </div>
    </div>
  );
}

export default SignupModal;
