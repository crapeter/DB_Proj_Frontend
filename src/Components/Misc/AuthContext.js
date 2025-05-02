import React, { createContext, useState, useContext, useEffect } from "react";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedValue = localStorage.getItem("isLoggedIn");
    return storedValue === "true"; // makes sure it's parsed as a boolean
  });

  const [userEmail, setUserEmail] = useState(() => {
    const storedValue = localStorage.getItem("userEmail");
    return storedValue || ""; // makes sure it's parsed as a string
  });

  useEffect(() => {
    if (isLoggedIn !== null) {
      localStorage.setItem("isLoggedIn", isLoggedIn.toString());
    }
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("userEmail", userEmail);
  }, [userEmail]);

  return (
    <authContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userEmail, setUserEmail }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
