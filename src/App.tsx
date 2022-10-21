import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import AuthPage from "./pages/Login/AuthPage";
import "./css/main.css";
import Home from "./pages/Home/Home";
// import PrivateRoute from "./utils/PrivateRoute";
import PrivateRoutes from "./utils/PrivateRoutes";
import Prevent from "./pages/Prevent/Prevent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<AuthPage />}></Route>
        <Route path="/prevent" element={<Prevent />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
