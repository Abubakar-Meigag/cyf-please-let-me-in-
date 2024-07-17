import "./App.css";
import CheckIn from "./components/checkIn/CheckIn";
import Home from "./components/home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";

function App() {
  return (
    <div>
       <Home />
    </div>
  );
}

export default App;
