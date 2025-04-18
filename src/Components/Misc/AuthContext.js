import React, { createContext, useState, useContext, useEffect } from 'react';

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedValue = localStorage.getItem("isLoggedIn");
    return storedValue === "true"; // makes sure it's parsed as a boolean
  });

  useEffect(() => {
    if (isLoggedIn !== null) {
      localStorage.setItem("isLoggedIn", isLoggedIn.toString());
    }
  }, [isLoggedIn]);

  useEffect(() => {
    console.log('isLoggedIn changed:', isLoggedIn); // Helpful for debugging
  }, [isLoggedIn]);

  return (
    <authContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
