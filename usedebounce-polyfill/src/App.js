import React, { useState, useEffect } from "react";
import useDebounce from "../src/hooks/useDebounce.js";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const debouncedInputValue = useDebounce(inputValue, 300); // Debounce with 300ms delay

  // Simulate an API call with debouncedInputValue
  const fetchSearchResults = async (query) => {
    // Perform API request and update results
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Trigger API call with debounced input value
  useEffect(() => {
    fetchSearchResults(debouncedInputValue);
  }, [debouncedInputValue]);

  return (
    <div>
      <h1>Instant Search with useDebounce</h1>
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
