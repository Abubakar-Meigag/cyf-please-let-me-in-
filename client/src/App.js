import React from "react";
import "./App.css";
import CheckIn from "./components/checkIn/bedford/CheckIn";
import CheckInCititec from "./components/checkIn/cititec/CheckInCititec";
import Guest from "./components/guest/bedford/Guest";
import Home from "./components/home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import GuestCtititec from "./components/guest/cititec/GuestCititec";
import ToasterProvider from "./components/toaster/ToasterProvider";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <ToasterProvider />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cititec" element={<Home />} />
          <Route path="cititec/checkIn" element={<CheckInCititec />} />
          <Route path="cititec/guest" element={<GuestCtititec />} />
          <Route path="bedford" element={<Home />} />
          <Route path="bedford/checkIn" element={<CheckIn />} />
          <Route path="bedford/guest" element={<Guest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
