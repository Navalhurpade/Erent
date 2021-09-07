import React, { useRef, useState } from "react";
import "./select.css";
import { ReactComponent as SearchIcon } from "./../../assets/searchDark.svg";
import { ReactComponent as Chevron } from "./../../assets/chevronDark.svg";
import { ReactComponent as Location } from "./../../assets/location-dark.svg";
import { ReactComponent as LocationTag } from "./../../assets/location-tag.svg";

function Select({ options }) {
  const [focused, setFocused] = useState(false);
  //eslint-disable-next-line
  const [selected, setSelected] = useState("");
  const [search, setSearch] = useState("");
  const [filteredOptions, setFillterdOptions] = useState(options);
  const searchInput = useRef();

  const handleSelection = (option) => {
    setSelected(option.label);
    setSearch(option.label);
    setFocused(false);
  };

  const filterOptions = (event) => {
    var key = event.keyCode || event.charCode; //detect the backspace

    if (!search) setFillterdOptions(options);
    //detect the backspace
    else if (key === 8 && search.length <= 1) {
      setFillterdOptions(options);
    } else
      setFillterdOptions(
        options.filter((o, index, array) =>
          o.label.toLowerCase().startsWith(search.toLowerCase())
        )
      );
  };

  return (
    <div
      style={{ borderColor: focused ? "blue" : "black" }}
      className="dropdown-box"
    >
      <div className="dropdown-search-container">
        <SearchIcon
          onClick={() => searchInput.current.focus()}
          className="icon dropdown-search-icon"
        />
        <input
          ref={searchInput}
          onFocus={() => setFocused(true)}
          onChange={(e) => setSearch(e.target.value)}
          className="dropdown-search"
          type="search"
          placeholder="Search"
          value={search}
          onKeyDown={filterOptions}
        ></input>
        <Chevron
          className="icon dropdown-chevron-icon "
          onClick={() => setFocused(!focused)}
          style={{
            transform: focused ? "rotate(180deg)" : "rotate(0)",
            transition: "all 0.3s ease-out",
          }}
        />
      </div>
      <div
        style={{
          height: focused ? "18.6rem" : 0,
          transition: "all 0.5s linear",
        }}
        className="dropdown-options-container"
      >
        {!search && (
          <div className="dropdown-mylocation-box">
            <Location />
            <span>Use current location</span>
          </div>
        )}
        {filteredOptions.map((option, i) => (
          <div
            onClick={() => handleSelection(option)}
            className="dropdown-option"
            key={i}
          >
            <LocationTag className="dropdown-location-tag" />
            <span key={i}>{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Select;
