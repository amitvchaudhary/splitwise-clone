import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "primereact/button";
import { Outlet } from "react-router";

function App() {
  return (
    <Outlet />
  );
}

export default App;
