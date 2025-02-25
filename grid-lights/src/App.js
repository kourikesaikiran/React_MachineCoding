import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [clickedTiles, setClickedTiles] = useState([]);
  const [removing, setRemoving] = useState(false);

  const handleClick = (index) => {
    if (index !== 4 && !clickedTiles.includes(index)) {
      const updatedTiles = [...clickedTiles, index];
      setClickedTiles(updatedTiles);

      if (updatedTiles.length === 8) setRemoving(true);
    }
  };

  useEffect(() => {
    if (!removing) return;

    const interval = setInterval(() => {
      setClickedTiles((prevTiles) => {
        if (prevTiles.length === 0) {
          clearInterval(interval);
          setRemoving(false);
          return prevTiles;
        }
        return prevTiles.slice(0, -1);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [removing]);

  return (
    <div className="App">
      <div className="tileHolder">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className={clickedTiles.includes(i) && i !== 4 ? "tile-filled" : "tile"}
            onClick={() => handleClick(i)}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
