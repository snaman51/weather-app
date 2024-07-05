import React, { createContext, useState, useEffect } from 'react';

export const TemperatureContext = createContext();

export const TemperatureProvider = ({ children }) => {
  const [isCelsius, setIsCelsius] = useState(() => {
    const saved = localStorage.getItem('isCelsius');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('isCelsius', JSON.stringify(isCelsius));
  }, [isCelsius]);

  const toggleUnit = () => {
    setIsCelsius(prev => !prev);
  };

  return (
    <TemperatureContext.Provider value={{ isCelsius, toggleUnit }}>
      {children}
    </TemperatureContext.Provider>
  );
};