import React, { useState } from "react";
import "./input.css";

function Input({ label, className, isSelect = false, onChange, ...rest }) {
  let id = Math.random();
  const [img, setImg] = useState(null);

  return (
    <>
      {!isSelect ? (
        <div className={`auth-input ${className}`}>
          <label htmlFor={id}>{label}</label>

          <input
            onChange={(e) => onChange(e)}
            id={id}
            {...rest}
            className={"authInput"}
          />
        </div>
      ) : (
        <div className={`auth-input ${className}`}>
          {img ? (
            <div
              onClick={() => {
                const isOk = window.confirm("remove Selected photo ?");
                if (isOk) setImg(null);
              }}
              className="selected-img"
            >
              <img alt="img" src={img} />
            </div>
          ) : (
            <>
              <label>{label}</label>
              <label htmlFor={id} id={"select-label"}>
                select photo
              </label>
            </>
          )}
          <input
            id={id}
            onChange={(e) => {
              setImg(URL.createObjectURL(e.target.files[0]));
              onChange(e);
            }}
            {...rest}
            className={"authInput select-input"}
          />
        </div>
      )}
    </>
  );
}

export default Input;
