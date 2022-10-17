import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import Detail from "../routes/Detail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Vanila_redux/" element={<Home />}></Route>
        <Route path="/Vanila_redux/:id" element={<Detail />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
