import { useState } from "react";
import "./App.css";

function App() {
  const [userInput, setUserInput] = useState({
    length: 8,
    specialChar: false,
    uppercase: false,
    lowercase: false,
    numbers: false,
  });

  const [passwordString, setPasswordString] = useState("");
  const [submitClicked, setSubmitClicked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const uppercaseArr = [...Array(26)].map((_, i) => String.fromCharCode(65 + i)); // A-Z
  const lowercaseArr = [...Array(26)].map((_, i) => String.fromCharCode(97 + i)); // a-z
  const numbersArr = [...Array(10)].map((_, i) => i.toString()); // 0-9
  const specialCharArr = "@#$%^&*()".split(""); // Special characters

  const onSliderChange = (e) => {
    setSubmitClicked(false);
    setUserInput({ ...userInput, length: Number(e.target.value) });
  };

  const onCheckboxChange = (e, type) => {
    setSubmitClicked(false);
    setUserInput({ ...userInput, [type]: e.target.checked });
  };

  const generatePassword = () => {
    let characterPool = [];
    let { length, uppercase, lowercase, numbers, specialChar } = userInput;

    if (uppercase) characterPool.push(...uppercaseArr);
    if (lowercase) characterPool.push(...lowercaseArr);
    if (specialChar) characterPool.push(...specialCharArr);
    if (numbers) characterPool.push(...numbersArr);

    if (characterPool.length === 0) {
      setErrorMessage("Please select at least one character type!");
      return;
    }
    
    setErrorMessage("");

    let passwordString = Array.from(
      { length },
      () => characterPool[Math.floor(Math.random() * characterPool.length)]
    ).join("");

    setSubmitClicked(true);
    setPasswordString(passwordString);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(passwordString);
    alert("Password copied to clipboard!");
  };

  const calculateStrength = () => {
    let score = 0;
    if (userInput.lowercase) score += 1;
    if (userInput.uppercase) score += 1;
    if (userInput.numbers) score += 1;
    if (userInput.specialChar) score += 1;
    if (userInput.length >= 12) score += 1;

    const strengthLevels = ["Weak", "Fair", "Good", "Strong", "Very Strong"];
    return strengthLevels[score] || "Weak";
  };

  return (
    <div className="App">
      <h2>Password Generator</h2>

      <div className="config-section">
        <div className="config-option">
          <label>Select Length ({userInput.length})</label>
          <input
            type="range"
            name="length"
            min="4"
            max="20"
            value={userInput.length}
            onChange={onSliderChange}
          />
        </div>

        <div className="config-option">
          <label>Special Characters</label>
          <input
            name="specialChar"
            type="checkbox"
            onChange={(e) => onCheckboxChange(e, "specialChar")}
          />
        </div>
        <div className="config-option">
          <label>Lowercase</label>
          <input
            name="lowercase"
            type="checkbox"
            onChange={(e) => onCheckboxChange(e, "lowercase")}
          />
        </div>
        <div className="config-option">
          <label>Uppercase</label>
          <input
            name="uppercase"
            type="checkbox"
            onChange={(e) => onCheckboxChange(e, "uppercase")}
          />
        </div>
        <div className="config-option">
          <label>Numbers</label>
          <input
            name="numbers"
            type="checkbox"
            onChange={(e) => onCheckboxChange(e, "numbers")}
          />
        </div>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button onClick={generatePassword}>Generate Password</button>

      {submitClicked && (
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            readOnly
            value={passwordString}
            className="password-display"
          />
          <button onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈 Hide" : "👁 Show"}
          </button>
          <button onClick={copyToClipboard}>📋 Copy</button>
        </div>
      )}

      {submitClicked && <p className="strength">Strength: {calculateStrength()}</p>}
    </div>
  );
}

export default App;
