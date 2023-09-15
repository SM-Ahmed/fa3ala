import React from "react";
import Home from "./Home/Home";
import Practice from "./Practice/Practice";
import About from "./About/About";
import { Route, Routes } from "react-router-dom"

function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/practice" element={<Practice/>} />
        <Route exact path="/about" element={<About/>} />
      </Routes>
  );
}

export default App;