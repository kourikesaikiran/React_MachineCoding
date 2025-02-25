import "./App.css";
import React, { useState } from "react";

function App() {
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    if (name === "firstName" && value.length < 5)
      error = "Must be at least 5 characters";
    if (name === "lastName" && value.length < 2)
      error = "Must be at least 2 characters";
    if (name === "mobile" && !/^\d{10}$/.test(value))
      error = "Enter a valid 10-digit mobile number";
    if (name === "password" && value.length < 8)
      error = "Must be at least 8 characters";

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) validateField(name, value);
    checkFormValidity({ ...userInput, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
    checkFormValidity(userInput);
  };

  const checkFormValidity = (inputs) => {
    setIsFormValid(
      inputs.firstName.length >= 5 &&
        inputs.lastName.length >= 2 &&
        /^\d{10}$/.test(inputs.mobile) &&
        inputs.password.length >= 8
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", userInput);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {["firstName", "lastName", "mobile", "password"].map((field) => (
          <div className="inputContainer" key={field}>
            <label className="inputLabel">
              {field.replace(/^\w/, (c) => c.toUpperCase())}
            </label>
            <input
              className="inputField"
              type={
                field === "password"
                  ? "password"
                  : field === "mobile"
                  ? "number"
                  : "text"
              }
              name={field}
              value={userInput[field]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched[field] && errors[field] && <p>{errors[field]}</p>}
          </div>
        ))}
        <button type="submit" className="submit" disabled={!isFormValid}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
