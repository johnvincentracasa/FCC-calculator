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
  const [formula, setFormula] = useState("0");
  const [currentSign, setCurrentSign] = useState("pos");
  const [lastClicked, setLastClicked] = useState("0");
  const [evaluated, setEvaluated] = useState(false);

  const maxDigitalWarning = () => {
    setCurrentSign("Digital Limit Met");
    setPrevVal(currentVal);
  };

  const handleEvaluate = () => {
    if (!currentVal.includes("Limit")) {
      let expression = formula;
      while (endsWithOperator.test(expression)) {
        expression = expression.slice(0, -1);
      }

      expression = expression
        .replace(/x/g, "*")
        .replace(/‑/g, "-")
        .replace("--", "+0+0+0+0+0+0+");
      let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;

      setCurrentSign(answer.toString());
      setFormula(
        expression
          .replace(/\*/g, "⋅")
          .replace(/-/g, "‑")
          .replace("+0+0+0+0+0+0+", "‑-")
          .replace(/(x|\/|\+)‑/, "$1-")
          .replace(/^‑/, "-") +
          "=" +
          answer
      );

      setPrevVal(answer);
      setEvaluated(true);
    }
  };

  const handleOperator = (e) => {
    if (!currentVal.includes("Limit")) {
      const value = e.target.value;
      setCurrentVal(value);
      setEvaluated(false);

      if (evaluated) {
        setFormula(prevVal + value);
      } else if (!endsWithOperator.test(formula)) {
        setPrevVal(formula);
        setFormula(formula + value);
      } else if (!endsWithNegativeSign.test(formula)) {
        setFormula(
          (endsWithNegativeSign.test(formula + value) ? formula : prevVal) +
            value
        );
      } else if (value !== "-") {
        setFormula(prevVal + value);
      }
    }
  };

  const handleNumber = (e) => {
    if (!currentVal.includes("Limit")) {
      const value = e.target.value;

      setEvaluated(false);

      if (currentVal.length > 21) {
        this.maxDigitalWarning();
      } else if (evaluated) {
        setCurrentVal(value);
        setFormula(value !== "0" ? value : "");
      } else {
        setCurrentVal(
          currentVal === "0" || isOperator.test(currentVal)
            ? value
            : currentVal + value
        );

        setFormula(
          currentVal === "0" && value === "0"
            ? formula === ""
              ? value
              : formula
            : /([^.0-9]0|^0)$/.test(formula)
            ? formula.slice(0, -1) + value
            : formula + value
        );
      }
    }
  };

  const handleDecimal = () => {
    if (evaluated === true) {
      setCurrentVal("0.");
      setFormula("0.");
      setEvaluated(false);
    } else if (!currentVal.includes(".") && !currentVal.includes("Limit")) {
      setEvaluated(false);
      if (currentVal.length > 21) {
        maxDigitalWarning();
      } else if (
        endsWithOperator.test(formula) ||
        (currentVal === "0" && formula === "")
      ) {
        setCurrentVal("0.");
        setFormula(formula + "0.");
      } else {
        setCurrentVal(formula.match(/(-?\d+\.?\d*)$/)[0] + ".");
        setFormula(formula + ".");
      }
    }
  };

  const initialize = () => {
    setCurrentVal("0");
    setPrevVal("0");
    setFormula("0");
    setCurrentSign("pos");
    setLastClicked("");
    setEvaluated(false);
  };

  return (
    <div>
      <div className="container">
        <Formula formula={formula} />
        <Output currentVal={currentVal} />

        <Button
          initialize={initialize}
          operators={handleOperator}
          number={handleNumber}
          evaluate={handleEvaluate}
          decimal={handleDecimal}
        />
      </div>
    </div>
  );
}

const Button = ({ initialize, operators, number, evaluate, decimal }) => {
  return (
    <div>
      <button
        id="clear"
        onClick={initialize}
        className="btn light_grey btn_large"
        value="AC"
      >
        AC
      </button>

      <button
        id="divide"
        onClick={operators}
        className="btn light_orange"
        value="/"
      >
        /
      </button>

      <button
        id="multiply"
        onClick={operators}
        className="btn light_orange"
        value="x"
      >
        x
      </button>

      <button id="seven" onClick={number} value="7" className="btn ">
        7
      </button>
      <button id="eight" onClick={number} value="8" className="btn">
        8
      </button>
      <button id="nine" onClick={number} value="9" className="btn">
        9
      </button>
      <button
        id="subtract"
        onClick={operators}
        className="btn light_orange"
        value="-"
      >
        -
      </button>

      <button id="four" onClick={number} value="4" className="btn">
        4
      </button>
      <button id="five" onClick={number} value="5" className="btn">
        5
      </button>
      <button id="six" onClick={number} value="6" className="btn">
        6
      </button>
      <button
        id="add"
        onClick={operators}
        className="btn light_orange"
        value="+"
      >
        +
      </button>

      <button id="one" onClick={number} value="1" className="btn">
        1
      </button>
      <button id="two" onClick={number} value="2" className="btn">
        2
      </button>

      <button
        id="three"
        onClick={number}
        value="3"
        className="btn"
        style={{ marginRight: "27%" }}
      >
        3
      </button>
      <button id="zero" onClick={number} value="0" className="btn btn_large">
        0
      </button>
      <button id="decimal" onClick={decimal} value="." className="btn">
        .
      </button>
      <button
        id="equals"
        onClick={evaluate}
        className="btn light_orange"
        style={{
          position: "absolute",
          bottom: 8,
          right: 8,
          height: "7.3rem",
          borderRadius: "3.3rem",
        }}
        value="="
      >
        =
      </button>
    </div>
  );
};

const Output = ({ currentVal }) => {
  return (
    <div className="display" id="display">
      {currentVal}
    </div>
  );
};

const Formula = ({ formula }) => {
  return (
    <div style={{ fontSize: "1.2rem" }} className="display">
      {formula}
    </div>
  );
};

export default App;
