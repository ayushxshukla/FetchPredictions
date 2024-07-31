// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import FormComponent from "./components/Form/FormComponent";
import ListComponent from "./components/List/ListComponent";
import InputPage from "./components/InputPage/InputPage";
const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<FormComponent />} />
      <Route path="/list" element={<ListComponent />} />
      <Route path="/input" element={<InputPage />} />
    </Routes>
  </div>
);

export default App;
