import React, { useState } from "react";
import "./App.css";

// currentVal: '0',
// prevVal: '0',
// formula: '',
// currentSign: 'pos',
// lastClicked: ''

function App() {
  // INITIALIZE CONSTANTS

  const isOperator = /[x/+‑]/,
    endsWithOperator = /[x+‑/]$/,
    endsWithNegativeSign = /\d[x/+‑]{1}‑$/,
    clearStyle = { background: "#ac3939" },
    operatorStyle = { background: "#666666" };

  // INITIALIZE STATE VARIABLES

  const [currentVal, setCurrentVal] = useState("0");
  const [prevVal, setPrevVal] = useState("0");
  const [formula, setFormula] = useState("");
  const [currentSign, setCurrentSign] = useState("pos");
  const [lastClicked, setLastClicked] = useState("0");

  return (
    <div>
      <div className="container">
        <div className="display" style={{ fontSize: "1.2rem" }}>
          formula
        </div>
        <div className="display">678990</div>

        <div>
          <button className="btn light_grey btn_large">C</button>
          <button className="btn light_orange">/</button>
          <button className="btn light_orange">x</button>

          <button className="btn ">7</button>
          <button className="btn">8</button>
          <button className="btn">9</button>
          <button className="btn light_orange">-</button>

          <button className="btn">4</button>
          <button className="btn">5</button>
          <button className="btn">6</button>
          <button className="btn light_orange">+</button>

          <button className="btn">1</button>
          <button className="btn">2</button>

          <button className="btn" style={{ marginRight: "27%" }}>
            3
          </button>
          <button className="btn btn_large">0</button>
          <button className="btn">,</button>
          <button
            className="btn light_orange"
            style={{
              position: "absolute",
              bottom: 8,
              right: 8,
              height: "7.3rem",
              borderRadius: "3.3rem",
            }}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
