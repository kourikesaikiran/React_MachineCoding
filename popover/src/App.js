import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const Popover = () => {
  const [showBody, setShowBody] = useState(false);
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);

  const handleHeaderClick = () => {
    setShowBody((prev) => !prev);
  };

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShowBody(false);
      }
    };
    if (showBody) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showBody]);

  return (
    <div className="componentContainer">
      <button 
        ref={buttonRef} 
        onClick={handleHeaderClick} 
        aria-expanded={showBody}
        aria-label="Toggle popover"
        className="popoverButton"
      >
        Click Here
      </button>
      
      {showBody && (
        <div className="popoverContainer" ref={popoverRef}>
          <div className="triangle"></div>
          <div className="popoverHeader">Header</div>
          <div className="popoverBody">The content is added here</div>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Popover />
    </div>
  );
}

export default App;
