import React, { useContext, useState } from "react";
import "./authModal.css";
import { ReactComponent as GoogleIcon } from "./../../assets/google.svg";
import { ReactComponent as FacebookIcon } from "./../../assets/facebook.svg";
import { ReactComponent as CloseIcon } from "./../../assets/close.svg";
import LogInModal from "./LoginModal/LoginModal";
import Button from "../Button/Button";
import Signup from "./SignupModal/SignupModal";

import AuthContext from "../AuthContext";
import auth from "../../api/auth";

function AuthModal({ onClose }) {
  const [authMethod, setAuthMethod] = useState("connect");
  const { parseUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [LoginData, setLoginData] = useState({});

  const onRegister = async ({ userDetails, confirmPassword }) => {
    if (userDetails.password !== confirmPassword)
      return alert("conform password does not match");
    const formData = new FormData();

    for (let key in userDetails) {
      formData.set(key, userDetails[key]);
    }

    setLoading(true);
    const { ok, problem, status } = await auth.register(formData);
    setLoading(false);
    if (!ok) return console.log("faild to register ", problem);

    if (status === 201) {
      setLoginData({
        email: userDetails.email,
        password: userDetails.password,
      });
      setAuthMethod("login");
    }
  };

  const onLogin = async (userDetails) => {
    setLoading(true);
    const { ok, data, problem, status } = await auth.login(userDetails);
    setLoading(false);
    if (!ok) {
      if (status === 400) alert("invalid email or password ");
      return console.log(problem);
    }

    parseUser(data);
    onClose();
  };

  const height =
    authMethod === "connect"
      ? "310px"
      : authMethod === "login"
      ? "325px"
      : "560px";

  return (
    <div id="dark-overlay">
      <div
        className="auth-modal"
        style={{ transition: "height .5s ease", height }}
      >
        <Header onClose={onClose} />

        {authMethod === "connect" && (
          <ConnectModal
            onLogin={() => setAuthMethod("login")}
            onSigup={() => setAuthMethod("signup")}
          />
        )}
        {authMethod === "login" && (
          <LogInModal
            onLogin={onLogin}
            loading={loading}
            loginData={LoginData}
            setLoginData={setLoginData}
            setLoading={setLoading}
            onGoBack={() => setAuthMethod("connect")}
          />
        )}

        {authMethod === "signup" && (
          <Signup
            loading={loading}
            setLoading={setLoading}
            onSignup={onRegister}
            onGoBack={() => setAuthMethod("connect")}
          />
        )}
      </div>
    </div>
  );
}

function Header({ onClose }) {
  return (
    <div className="my-modal-header">
      <span>Login</span>
      <CloseIcon onClick={onClose} />
    </div>
  );
}

function ConnectModal({ onLogin, onSigup, onOAuthLogin }) {
  return (
    <div className="connect-modal-body">
      <SocialButton Icon={FacebookIcon} title="Connect with Facebook" />
      <SocialButton Icon={GoogleIcon} title="Connect with Google" />

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
