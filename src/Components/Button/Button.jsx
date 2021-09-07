import React from "react";
import "./button.css";

function Button({
  title,
  bgColor,
  loading = false,
  whiteText,
  onClick,
  className,
  ...rest
}) {
  return (
    <button
      onClick={onClick}
      {...rest}
      style={{
        backgroundColor: bgColor ? bgColor : "var(--light-gray)",
        color: whiteText ? "white" : "var(--dark-color)",
      }}
      className={`btn ${className}`}
    >
      {loading && <i class="fa fa-spinner fa-spin"></i>}
      {loading ? "loading" : title}
    </button>
  );
}

export default Button;
