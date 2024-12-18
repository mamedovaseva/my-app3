import React, { useEffect, useState } from "react";
import { useStopwatch } from "./StopwatchContext";
import "./Stopwatch.css";

function Stopwatch() {
  const { seconds, setSeconds, run, setRun } = useStopwatch();
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    if (!run) return;
    const interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [run, setSeconds]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${hours} saat ${minutes} dəqiqə ${remainingSeconds} saniyə`;
  };

  const handleLap = () => {
    setLaps((prev) => [...prev, formatTime(seconds)]);
  };

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="watch">
      <h2>
        {hours} saat {minutes} dəqiqə {remainingSeconds} saniyə
      </h2>
      <div className="buttons">
        <button onClick={() => setRun(true)}>Start</button>
        <button onClick={() => setRun(false)}>Pause</button>
        <button
          onClick={() => {
            setRun(false);
            setSeconds(0);
          }}
        >
          Reset
        </button>
        <button onClick={handleLap}>&#9675;</button>
      </div>
      <div className="laps">
        <h3>Dövrlər</h3>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>{lap}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Stopwatch;
