import React, { useState, useEffect } from "react";
import AdviceBox from "./AdviceBox";
import "./App.css";
import "./AdviceBox.js";
import "./styles.css";

function App() {
  return (
    <>
      <div id="flex-container">
        <AdviceBox></AdviceBox>
      </div>
    </>
  );
}

export default App;
