import React from "react";
import Home from "./Home/Home";
import Practice from "./Practice/Practice";
import {BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/practice" element={<Practice/>} />
      </Routes>
  );
}

export default App;
