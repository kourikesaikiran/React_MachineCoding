import "./App.css";
import Modal from "./Components/Modal/Modal";
import React, { useState } from "react";

function App() {
  const [displayModal, setDisplayModal] = useState(false);

  const handleCloseClick = () => {
    setDisplayModal(false);
  };
  const handleOpenClick = () => {
    setDisplayModal(true);
  };
  return (
    <div>
      <h1>Homepage</h1>
      <button onClick={handleOpenClick}>Show Modal</button>
      {displayModal && <Modal handleClick={handleCloseClick} />}
  </div>
  );
}

export default App;
