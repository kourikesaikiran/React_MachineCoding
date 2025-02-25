import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [clickedItemId, setClickedItemId] = useState("option01");
  const [sandwichClicked, setSandwichClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 460);

  const updateIsMobile = () => {
    setIsMobile(window.innerWidth < 460);
  };

  useEffect(() => {
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const data = [
    { id: "option01", title: "Option 01", content: "This is content for Option 01." },
    { id: "option02", title: "Option 02", content: "Details and description for Option 02." },
    { id: "option03", title: "Option 03", content: "Information inside Option 03." },
    { id: "option04", title: "Option 04", content: "Option 04 comes with unique details." },
    { id: "option05", title: "Option 05", content: "Here is the content for Option 05." },
  ];

  const handleClick = (clickedId) => {
    setClickedItemId(clickedId);
  };

  const handleSandwichClick = (e) => {
    e.stopPropagation();
    setSandwichClicked((prev) => !prev);
  };

  const handleOptionClick = (e, clickedId) => {
    e.stopPropagation();
    setClickedItemId(clickedId);
    setSandwichClicked(false);
  };

  const renderOptions = (isMobileView) => {
    return data.map((item) => (
      <div
        key={item.id}
        id={item.id}
        className={isMobileView ? "sandwichOption" : "navbarOptions"}
        onClick={(e) => (isMobileView ? handleOptionClick(e, item.id) : handleClick(item.id))}
        style={{
          backgroundColor: isMobileView && item.id === clickedItemId ? "lightgrey" : "white",
          borderBottom: !isMobileView && clickedItemId === item.id ? "5px solid black" : "",
        }}
      >
        {item.title}
      </div>
    ));
  };

  return (
    <div className="navbarContainer">
      <nav>
        {isMobile ? (
          <div className="sandwichContainer" onClick={handleSandwichClick}>
            <div className="sandwichLayer"></div>
            <div className="sandwichLayer"></div>
            <div className="sandwichLayer"></div>
            {sandwichClicked && <div className="sandwichOptionContainer">{renderOptions(true)}</div>}
          </div>
        ) : (
          <div className="navbarOptionsContainer">{renderOptions(false)}</div>
        )}
      </nav>

      {/* Display the content of the selected navigation option */}
      <div className="contentContainer">
        {data.find((item) => item.id === clickedItemId)?.content}
      </div>
      
    </div>
  );
}

export default App;
