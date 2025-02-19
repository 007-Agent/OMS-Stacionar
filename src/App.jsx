import { React, useState } from "react";

import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./reset.css";
import Main from "./hosp/Main";

import { Header } from "./components/HeaderInfo/header/HeaderMain/Header";
import { PacientList } from "./hosp/PacienList/PacientList";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/hope" element={<PacientList />} />
      </Routes>
    </>
  );
}

export default App;
