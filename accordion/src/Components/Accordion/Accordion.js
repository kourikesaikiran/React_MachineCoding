import "./Accordion.css";
import React, { useState } from "react";

function Accordion({ data }) {
  const [selectedAccordion, setSelectedAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setSelectedAccordion(selectedAccordion === index ? null : index);
  };

  return (
    <div className="container">
      {data.map((item, index) => (
        <div key={index} className="accordionContainer">
          <div className="accordionHeader" onClick={() => toggleAccordion(index)}>
            <span className={`arrow ${selectedAccordion === index ? "down" : ""}`}>&#9654;</span>
            {item.header}
          </div>
          {selectedAccordion === index && (
            <div className="accordionBody">
              {item.content}
              {item.children && <Accordion data={item.children} />}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Accordion;
