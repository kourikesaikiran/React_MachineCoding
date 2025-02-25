import React, { useState } from "react";
import "./dropdown.css";

function DropDown({ item }) {
  const [open, setOpen] = useState(false);
  const [clickedOption, setClickedOption] = useState("")

  const handleOptionClick = (options) => {
    setClickedOption(options);
    setOpen(false);
  };
  return (
    <div className="componentTile">
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className="componentHeader"
      >
        {item.title}
      </div>
      {open && (
        <div className="componentOption">
          {item.options.map((option, index) => (
            <span key={index} onClick={() => {handleOptionClick()}}>
              {option}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropDown;
