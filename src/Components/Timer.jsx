import React, { useState, useEffect } from "react";
import "./Timer.css";

function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState([]); 

  const handleStart = () => {
    setIsRunning(true);  
  };

  const handleStop = () => {
    setIsRunning(false);
    setHistory((prev) => [...prev, formatTime(hours, minutes, seconds)]); 
  };

  const formatTime = (hrs, mins, secs) => {
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);  
      } else if (minutes > 0) {
        setSeconds(59);  
        setMinutes((prev) => prev - 1);  
      } else if (hours > 0) {
        setMinutes(59);  
        setHours((prev) => prev - 1);  
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, seconds, minutes, hours]);

  const handleIncrement = (unit) => {
    if (unit === "hours") {
      setHours((prev) => prev + 1);
    } else if (unit === "minutes") {
      setMinutes((prev) => prev + 1);
    } else if (unit === "seconds") {
      setSeconds((prev) => prev + 1);
    }
  };

  const handleDecrement = (unit) => {
    if (unit === "hours" && hours > 0) {
      setHours((prev) => prev - 1);
    } else if (unit === "minutes" && minutes > 0) {
      setMinutes((prev) => prev - 1);
    } else if (unit === "seconds" && seconds > 0) {
      setSeconds((prev) => prev - 1);
    }
  };

  const handleInputChange = (e, unit) => {
    const value = Number(e.target.value);
    if (unit === "hours") {
      setHours(value);
    } else if (unit === "minutes") {
      setMinutes(value);
    } else if (unit === "seconds") {
      setSeconds(value);
    }
  };

  return (
    <div className="inputs">
      <div className="divs">
        <input
          type="number"
          placeholder="Saat"
          value={hours || ""}
          onChange={(e) => handleInputChange(e, "hours")}
        />
        <button onClick={() => handleDecrement("hours")}>-</button>
        <button onClick={() => handleIncrement("hours")}>+</button>
      </div>
      <div className="divs">
        <input
          type="number"
          placeholder="Dəqiqə"
          value={minutes || ""}
          onChange={(e) => handleInputChange(e, "minutes")}
        />
        <button onClick={() => handleDecrement("minutes")}>-</button>
        <button onClick={() => handleIncrement("minutes")}>+</button>
      </div>
      <div className="divs">
        <input
          type="number"
          placeholder="Saniyə"
          value={seconds || ""}
          onChange={(e) => handleInputChange(e, "seconds")}
        />
        <button onClick={() => handleDecrement("seconds")}>-</button>
        <button onClick={() => handleIncrement("seconds")}>+</button>
      </div>

      <button onClick={handleStart} className="button1">START</button>
      <button onClick={handleStop} className="button1">&#9650; Button</button>
      
      
      <div>
        <h3 className="history">Keçmiş ölçmələr</h3>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Timer;
