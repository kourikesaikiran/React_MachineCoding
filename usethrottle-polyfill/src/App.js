import React, { useState, useEffect } from "react";
import useThrottle from "./hooks/useThrottle";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const throttledInputValue = useThrottle(inputValue, 3000); 

  const fetchSearchResults = async (query) => {
    console.log('throttle called')
    // Perform API request and update results
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    fetchSearchResults(throttledInputValue);
  }, [throttledInputValue]);

  return (
    <div>
      <h1>Instant Search with useThrottle</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <p>Search results will appear here.</p>
    </div>
  );
};

export default App;
