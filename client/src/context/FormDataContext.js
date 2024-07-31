// src/context/FormDataContext.js
import React, { createContext, useState } from "react";

export const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  const [formDataList, setFormDataList] = useState([]);

  return (
    <FormDataContext.Provider value={{ formDataList, setFormDataList }}>
      {children}
    </FormDataContext.Provider>
  );
};
