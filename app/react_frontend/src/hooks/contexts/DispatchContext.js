// DispatchContext.js
import React, { createContext, useContext } from "react";
import { useDispatch } from "react-redux";

const DispatchContext = createContext();

export const DispatchProvider = ({ children }) => {
  const dispatch = useDispatch();
  return (
    <DispatchContext.Provider value={dispatch}>
      {children}
    </DispatchContext.Provider>
  );
};

export const useDispatchContext = () => useContext(DispatchContext);
