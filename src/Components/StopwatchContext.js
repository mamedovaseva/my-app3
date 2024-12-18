import React, { createContext, useContext, useState } from "react";

const StopwatchContext = createContext();

export const useStopwatch = () => {
  const context = useContext(StopwatchContext);
  if (!context) {
    throw new Error("useStopwatch must be used within a StopwatchProvider");
  }
  return context;
};

export const StopwatchProvider = ({ children }) => {
  const [seconds, setSeconds] = useState(0);
  const [run, setRun] = useState(false);

  return (
    <StopwatchContext.Provider value={{ seconds, setSeconds, run, setRun }}>
      {children}
    </StopwatchContext.Provider>
  );
};
