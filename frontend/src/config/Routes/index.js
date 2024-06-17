import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Login, MainApp, Register} from "../../pages";

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MainApp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default RoutesComponent;
