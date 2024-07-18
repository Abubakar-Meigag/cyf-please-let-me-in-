import React from "react";
import "./App.css";
import CheckIn from "./components/checkIn/CheckIn";
import Guest from "./components/guest/Guest";
import Home from "./components/home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cititec" element={<Home />} />
          <Route path="cititec/checkIn" element={<CheckIn />} />
          <Route path="cititec/guest" element={<Guest />} />
          <Route path="bedford" element={<Home />} />
          <Route path="bedford/checkIn" element={<CheckIn />} />
          <Route path="bedford/guest" element={<Guest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
