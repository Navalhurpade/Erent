import React, { useState } from "react";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import "./singupModal.css";

function SignupModal({ onGoBack, onSignup, loading }) {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
    role: "customer",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="signup-modal">
      <form
        enctype="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();
          onSignup({ userDetails, confirmPassword });
        }}
      >
        <Input
          value={userDetails.name}
          onChange={(e) =>
            setUserDetails({ ...userDetails, name: e.currentTarget.value })
          }
          type="text"
          label="name"
          disabled={loading}
          required
        />

        {/* Do not bind value for this feild insted only listen to on change */}
        <Input
          onChange={(e) =>
            setUserDetails({
              ...userDetails,
              profile_pic: e.currentTarget.files[0],
            })
          }
          isSelect
          type="file"
          accept="image/*"
          label="select profile photo"
          disabled={loading}
          required
        />

        <Input
          value={userDetails.email}
          onChange={(e) =>
            setUserDetails({ ...userDetails, email: e.currentTarget.value })
          }
          className="email"
          type="email"
          label="Email/Username"
          disabled={loading}
          required
        />
        <Input
          value={userDetails.password}
          onChange={(e) =>
            setUserDetails({ ...userDetails, password: e.currentTarget.value })
          }
          type="password"
          label="Passworld"
          className="password-feed"
          disabled={loading}
          required
        />
        <Input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          type="password"
          label="Conform Password"
          className="password-feed"
          disabled={loading}
          required
        />
        <Input
          value={userDetails.role}
          onChange={(e) => {
            const value = e.currentTarget.value;
            if (value === "seller")
              setUserDetails({ ...userDetails, role: "customer" });
            else setUserDetails({ ...userDetails, role: "seller" });
          }}
          type="checkbox"
          className="register-checkbox"
          label="Register me as Seller"
          disabled={loading}
        />

        <div className="signup-btn-container">
          <Button onClick={onGoBack} title="&lt;&lt; back" />
          <Button
            title={`${loading ? "loading" : "Signup"}`}
            bgColor="#56BAED"
            whiteText
            loading={loading}
            type="submit"
          ></Button>
        </div>
      </form>
    </div>
  );
}

export default SignupModal;
