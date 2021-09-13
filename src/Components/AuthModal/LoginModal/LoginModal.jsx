import React from "react";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import "./loginModal.css";

function LogInModal({ onLogin, onGoBack, loading, loginData, setLoginData }) {
  return (
    <div className="login-modal">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onLogin(loginData);
        }}
      >
        <Input
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.currentTarget.value })
          }
          type="email"
          label="Email/Username"
          disabled={loading}
          required
        />
        <Input
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.currentTarget.value })
          }
          type="password"
          label="Passworld"
          className="ppasswordrd-feed"
          disabled={loading}
          required
        />
        <div>
          <input
            type="checkbox"
            value={loginData.rememberMe}
            onChange={(e) =>
              setLoginData({ ...loginData, rememberMe: !loginData.rememberMe })
            }
            className="checkbox"
          ></input>
          <label className="login-note">Remember me on this computer</label>
        </div>
        <div className="login-btn-container">
          <Button onClick={onGoBack} title="&lt;&lt; back" />
          <Button
            title="Login"
            bgColor="#56BAED"
            type="submit"
            whiteText
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
}

export default LogInModal;
