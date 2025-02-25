import "./App.css";
import { useState, useRef, useEffect } from "react";

function App() {
  const otpLength = 4; 
  const [userInput, setUserInput] = useState(Array(otpLength).fill(""));
  const [displayOTP, setDisplayOTP] = useState(false);
  const inputs = useRef([]);

  useEffect(() => {
    inputs.current[0].focus(); 
  }, []);

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return;

    const newUserInput = [...userInput];
    newUserInput[index] = value;
    setUserInput(newUserInput);

    if (value && index < otpLength - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !userInput[index] && index > 0) {
      inputs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < otpLength - 1) {
      inputs.current[index + 1].focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleOTPSubmit = () => {
    if (userInput.includes("")) {
      alert("Please enter all OTP digits");
      return;
    }
    setDisplayOTP(true);
  };

  const handleClearOTP = () => {
    setUserInput(Array(otpLength).fill(""));
    setDisplayOTP(false);
    inputs.current[0].focus(); // Reset focus to first input
  };

  return (
    <div className="App">
      <h2>Enter OTP</h2>
      <div className="otp-holder">
        {userInput.map((digit, index) => (
          <input
            key={index}
            type="text"
            className={`otp-input ${digit ? "filled" : ""}`}
            maxLength="1"
            value={digit}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputs.current[index] = el)}
          />
        ))}
      </div>
      <div className="button-group">
        <button onClick={handleOTPSubmit} disabled={userInput.includes("")}>
          Submit
        </button>
        <button onClick={handleClearOTP} className="clear-btn">
          Clear
        </button>
      </div>
      {displayOTP && <div className="otp-display">You Entered: {userInput.join("")}</div>}
    </div>
  );
}

export default App;
