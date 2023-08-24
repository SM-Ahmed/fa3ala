import React from "react";
import './App.css';
import Home from "./Home";
import Practice from "./Practice";
import {BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <main className="App">
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/practice" element={<Practice/>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
