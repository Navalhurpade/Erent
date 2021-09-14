import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import "./navbar.css";
import { ReactComponent as SellIcon } from "./../../assets/sell.svg";
import { ReactComponent as SearchIcon } from "./../../assets/search.svg";
import { ReactComponent as ChatIcon } from "./../../assets/chats.svg";

import Select from "../Select/Select";
import AuthModal from "../AuthModal/AuthModal";
import AuthContext from "../AuthContext";
import Button from "../Button/Button";

const op = [
  { label: "react", value: "react" },
  { label: "Angular", value: "react" },
  { label: "vew", value: "react" },
  { label: "bootstrap", value: "react" },
];

function NavBar() {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const history = useHistory();

  return (
    <nav className="navbar-container">
      <h2 onClick={() => history.push("/")} className="nav-header">
        Erent
      </h2>
      <Select options={op} />
      <div className="search-box">
        <input type="search" placeholder="   Search mobiles"></input>
        <SearchIcon color="black" />
      </div>
      <div onClick={() => history.push("/chat-page")}>
      <ChatIcon  />
      </div>
      {!user ? (
        <Button
          id="loginBtn"
          bgColor="white"
          onClick={() => setLoginModalVisible(true)}
          title="Login"
        />
      ) : (
        <div className="user-greet">
          <img
            alt="user-profile"
            className="user-profile"
            src={user.profile_pic}
          ></img>
          <span className="hello-user">Hello {user.name.split(" ")[0]} !</span>
          <span onClick={logout} className="logout">
            Logout
          </span>
        </div>
      )}
      {loginModalVisible && (
        <AuthModal onClose={() => setLoginModalVisible(false)} />
      )}
      {user && user.role === "seller" && (
        <div
          onClick={() => history.push("/post-edit")}
          className="sell-btn icon-container"
        >
          <SellIcon />
          <span>Sell</span>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
