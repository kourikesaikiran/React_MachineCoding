import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [activeData, setActiveData] = useState([]);
  const [buttonList, setButtonList] = useState([]);
  const [selectedButton, setSelectedButton] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(10); // Dynamic entry length

  useEffect(() => {
    let array = [];
    for (let i = 0; i < 100; i++) {
      array.push(`Data ${i + 1}`);
    }
    setData(array);
    updatePagination(array, entriesPerPage);
  }, [entriesPerPage]);

  const updatePagination = (array, perPage) => {
    let tempArray = array.slice(0, perPage);
    setActiveData(tempArray);

    let totalPages = Math.ceil(array.length / perPage);
    let buttonArray = Array.from({ length: totalPages }, (_, i) => i);
    setButtonList(buttonArray);
    setSelectedButton(0); 
  };

  const handleClick = (index) => {
    let tempData = data.slice(index * entriesPerPage, (index + 1) * entriesPerPage);
    setActiveData(tempData);
    setSelectedButton(index);
  };

  const handlePrev = () => {
    if (selectedButton > 0) {
      handleClick(selectedButton - 1);
    }
  };

  const handleNext = () => {
    if (selectedButton < buttonList.length - 1) {
      handleClick(selectedButton + 1);
    }
  };

  return (
    <div className="container">
      <h2>Pagination with Navigation</h2>

      <div className="entries-selector">
        <label>Entries per page:</label>
        <select value={entriesPerPage} onChange={(e) => setEntriesPerPage(Number(e.target.value))}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>

      <div className="data-holder">
        {activeData.map((item, index) => (
          <div className="data-item" key={index}>
            {item}
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePrev} disabled={selectedButton === 0} className="nav-btn">
          ⬅️ Prev
        </button>

        {buttonList.map((item) => (
          <button
            key={item}
            onClick={() => handleClick(item)}
            className={item === selectedButton ? "button active" : "button"}
          >
            {item + 1}
          </button>
        ))}

        <button onClick={handleNext} disabled={selectedButton === buttonList.length - 1} className="nav-btn">
          Next ➡️
        </button>
      </div>
    </div>
  );
}

export default App;
