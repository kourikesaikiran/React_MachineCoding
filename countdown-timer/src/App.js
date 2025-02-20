import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (timerRunning && secondsLeft > 0) {
      const id = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(id);
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [timerRunning]);

  const handleStart = () => {
    const totalSeconds =
      Number(seconds) + Number(minutes * 60) + Number(hours * 3600);
    if (totalSeconds > 0) {
      setSecondsLeft(totalSeconds);
      setTimerRunning(true);
    }
  };

  const handleReset = () => {
    if (intervalId) clearInterval(intervalId);
    setTimerRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setSecondsLeft(0);
  };

  return (
    <div className="App">
      {timerRunning ? (
        <div>
          <div className="div1">
            <p className="text">Hours Left: {Math.floor(secondsLeft / 3600)}</p>
            <p className="text">
              Minutes Left: {Math.floor((secondsLeft % 3600) / 60)}
            </p>
            <p className="text">Seconds Left: {secondsLeft % 60}</p>
            <button onClick={handleReset}>Reset</button>
          </div>
        </div>
      ) : (
        <div className="div2">
          <div>
            <label>H:</label>
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(Math.max(0, Number(e.target.value)))}
              placeholder="Hours"
            />
          </div>
          <div>
            <label>M:</label>
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(Math.max(0, Number(e.target.value)))}
              placeholder="Minutes"
            />
          </div>
          <div>
            <label>S:</label>
            <input
              type="number"
              value={seconds}
              onChange={(e) => setSeconds(Math.max(0, Number(e.target.value)))}
              placeholder="Seconds"
            />
          </div>
          <button onClick={handleStart} disabled={timerRunning}>
            Start
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
