import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./components/login.jsx";
import Signup from "./components/signup.jsx";
import Dashboard from "./components/dashBoard";
import TlBoard from "./components/tlBoard";
import Add from "./components/addTeknisi"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<Add />} /> 
          <Route path="/tl-board" element={<TlBoard />} />
        </Route>
        <Route path="/addTeknisi" element={<Add />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
