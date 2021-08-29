import React, { useState } from "react";
import "./authModal.css";
import { ReactComponent as GoogleIcon } from "./../../assets/google.svg";
import { ReactComponent as FacebookIcon } from "./../../assets/facebook.svg";
import { ReactComponent as CloseIcon } from "./../../assets/close.svg";
import LogInModal from "./LoginModal/LoginModal";
import Button from "../Button/Button";
import Signup from "./SignupModal/SignupModal";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "@firebase/auth";
import { auth } from "../../firebase";

function AuthModal({ visible, onClose }) {
  const [authMethod, setAuthMethod] = useState("connect");

  const handleOAuth = (OauthProvider) => {
    const provider = new OauthProvider();
    signInWithPopup(auth, provider)
      .then((userData) => {
        console.log("Successfully authenticated !");
        console.log(userData);
      })
      .catch((error) => {
        console.log("Auth Failed!");
        console.log(error);
      });
  };

  return (
    <div hidden={!visible} id="dark-overlay">
      <div className="auth-modal">
        <Header onClose={onClose} />

        {authMethod === "connect" && (
          <ConnectModal
            onLogin={() => setAuthMethod("login")}
            onSigup={() => setAuthMethod("signup")}
            onOAuthLogin={handleOAuth}
            visible={visible}
          />
        )}
        {authMethod === "login" && (
          <LogInModal onGoBack={() => setAuthMethod("connect")} />
        )}

        {authMethod === "signup" && (
          <Signup onGoBack={() => setAuthMethod("connect")} />
        )}
      </div>
    </div>
  );
}

function Header({ onClose }) {
  return (
    <div className="modal-header">
      <span>Login</span>
      <CloseIcon onClick={onClose} />
    </div>
  );
}

function ConnectModal({ onLogin, onSigup, onOAuthLogin }) {
  return (
    <div className="connect-modal-body">
      <SocialButton
        onClick={() => onOAuthLogin(FacebookAuthProvider)}
        Icon={FacebookIcon}
        title="Connect with Facebook"
      />
      <SocialButton
        onClick={() => onOAuthLogin(GoogleAuthProvider)}
        Icon={GoogleIcon}
        title="Connect with Google"
      />

      <span className="modal-note">OR USE YOUR EMAIL ADDRESS</span>
      <div className="modal-btn-container">
        <Button onClick={onLogin} title="Login" />
        <Button onClick={onSigup} title="SignUp" />
      </div>
    </div>
  );
}

function SocialButton({ Icon, title, ...rest }) {
  return (
    <div {...rest} className="signup-btn">
      <Icon className="signup-btn-icon" />
      <span>{title}</span>
    </div>
  );
}

export default AuthModal;
