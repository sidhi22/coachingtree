import React, { useState } from "react";

const DropdownBox = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="dropdown-box">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {props.buttonText}
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {props.children}
        </div>
      )}
    </div>
  );
}

export default DropdownBox;
