import React from "react";
import "./Modal.css";

const Modal = ({ handleClick }) => {
  return (
    <div className="modalOverlay">
      <div className="modalBody">
        <div className="modalHeader">
          <span>Header</span>
          <button onClick={handleClick} className="closeButton">
            Close
          </button>
        </div>
        <div className="modalContent">This is the modal content.</div>
      </div>
    </div>
  );
};

export default Modal;
