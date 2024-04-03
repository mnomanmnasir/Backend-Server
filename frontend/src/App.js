import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FormData from "./components/formData";
import InventoryData from "./components/inventoriesData";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/inventories/inventories" element={<InventoryData />} />
          <Route path="/" element={<FormData />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
