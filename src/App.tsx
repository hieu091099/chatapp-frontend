import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import AuthPage from "./pages/Login/AuthPage";
import "./css/main.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
