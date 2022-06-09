import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "primereact/button";

function App() {
  return (
    <div className="App">
      <Button label="Primary" className="text-white" />
      <Button label="Secondary" className="p-button-secondary" />
      <Button label="Success" className="p-button-success" />
      <Button label="Info" className="p-button-info" />
      <Button label="Warning" className="p-button-warning" />
      <Button label="Danger" className="p-button-danger" />
              
       
    </div>
  );
}

export default App;
