import React, { useState } from "react";
import "./LeftMenu.css";

const LeftMenu = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDropdownMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const handleButtonClick = () => {
    setIsHovered(true);
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div
        className="hover-div"
        onMouseEnter={handleDropdownMouseEnter}
        onMouseLeave={handleDropdownMouseLeave}
      ></div>
      <div className="line"></div>
      <button
        className={`expand-btn ${isHovered ? "hovered" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleButtonClick}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          role="presentation"
          style={{
            verticalAlign: "middle",
            transform: isHovered ? "rotate(180deg)" : "rotate(0deg)",
            color: isHovered ? "white" : "currentColor",
          }}
        >
          <path
            d="M10.294 9.698a.988.988 0 010-1.407 1.01 1.01 0 011.419 0l2.965 2.94a1.09 1.09 0 010 1.548l-2.955 2.93a1.01 1.01 0 01-1.42 0 .988.988 0 010-1.407l2.318-2.297-2.327-2.307z"
            fill="currentColor"
            fillRule="evenodd"
          ></path>
        </svg>
      </button>
      {isDropdownOpen && (
        <>
          <div className="dropdown1">dropdown content</div>
        </>
      )}
    </>
  );
};

export default LeftMenu;
