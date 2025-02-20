import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");

  const handleButtonClick = (value) => {
    setInput((prev) => prev + value);
  };

  const clearInput = () => {
    setInput("");
  };

  const calculateResult = () => {
    let num1 = "";
    let num2 = "";
    let operator = "";
    console.log(input)

    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      if (["+", "-", "*", "/"].includes(char)) {
        operator = char;
      } else if (!operator) {
        num1 += char;
      } else {
        num2 += char;
      }
    }

    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    let calcResult = 0;
    if (operator === "+") calcResult = num1 + num2;
    if (operator === "-") calcResult = num1 - num2;
    if (operator === "*") calcResult = num1 * num2;
    if (operator === "/") calcResult = num2 !== 0 ? num1 / num2 : "Error";

    setInput(calcResult);
  };

  return (
    <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
      <h2>Calculator</h2>
      <div className="calculator-container">
      <input
        type="text"
        value={input}
        readOnly
        className="calculator-input"
      />
      <div className="buttons-container">
        {[1, 2, 3, "+", 4, 5, 6, "-", 7, 8, 9, "*", 0, "/", "C", "="].map((btn) => (
          <button
            key={btn}
            onClick={
              btn === "C"
                ? clearInput
                : btn === "="
                ? calculateResult
                : () => handleButtonClick(btn.toString())
            }
            className={`calculator-button ${
              btn === "C" ? "clear" : btn === "=" ? "equal" : ""
            }`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
    </div>
  );
};

export default App;