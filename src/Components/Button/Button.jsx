import React from "react";
import "./button.css";

function Button({ title, bgColor, whiteText, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: bgColor ? bgColor : "var(--light-gray)",
        color: whiteText ? "white" : "var(--dark-color)",
      }}
      className="btn"
    >
      {title}
    </div>
  );
}

export default Button;
