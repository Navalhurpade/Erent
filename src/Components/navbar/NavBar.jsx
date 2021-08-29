import React, { useState } from "react";
import "./navbar.css";
import { ReactComponent as SellIcon } from "./../../assets/sell.svg";
import { ReactComponent as SearchIcon } from "./../../assets/search.svg";
import { ReactComponent as Account } from "./../../assets/account-b.svg";
import { ReactComponent as Chevron } from "./../../assets/chevron.svg";
import Select from "../Select/Select";
import AuthModal from "../AuthModal/AuthModal";

const op = [
  { label: "react", value: "react" },
  { label: "Angular", value: "react" },
  { label: "react", value: "react" },
  { label: "Angular", value: "react" },
];

function NavBar(props) {
  const [loginModalVisible, setLoginModalVisible] = useState(true);

  return (
    <nav className="navbar-container">
      <h2 className="nav-header">Erent</h2>
      <Select options={op} />
      <div className="search-box">
        <input type="search" placeholder="   Search mobiles"></input>
        <SearchIcon color="black" />
      </div>
      <div
        className="icon-container"
        onClick={() => setLoginModalVisible(!loginModalVisible)}
      >
        <Account onClick={() => setLoginModalVisible(true)} />
        <Chevron />
      </div>
      <AuthModal
        visible={loginModalVisible}
        onClose={() => setLoginModalVisible(false)}
      />
      <div className="sell-btn icon-container">
        <SellIcon />
        <span>Sell</span>
      </div>
    </nav>
  );
}

export default NavBar;
