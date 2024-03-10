"use strict";

function Calculator() {
  this.methods = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
  };

  this.operate = function(a, op, b) {
    if (!this.methods[op] || isNaN(a) || isNaN(b)) {
      return NaN;
    }

    return this.methods[op](a, b);
  };
}

function checkNan() {
  if (displayValue.includes("NaN") || displayValue.includes("Infinity")) {
    displayValue = "";
    display.textContent = displayValue;
  }
}

const calculator = new Calculator();

let displayValue = "";
const display = document.querySelector(".display");
const numButtons = document.querySelectorAll(".num");
const opButtons = document.querySelectorAll(".op");
const equalButton = document.querySelector("p[value='Enter']");
const acButton = document.querySelector("[data-ac]");
const backButton = document.querySelector("p[value='Backspace']");
const plusOrMinusButton = document.querySelector("[data-plus-minus]");
const decimalButton = document.querySelector("p[value='.']");

acButton.addEventListener("click", () => {
  displayValue = "";
  display.textContent = displayValue;
});

numButtons.forEach(button => {
  button.addEventListener("click", () => {
    checkNan();
    displayValue += button.textContent;
    display.textContent = displayValue;
  });
});

decimalButton.addEventListener("click", () => {
  checkNan();
  if (displayValue.at(-1) === " " || displayValue === "") { // operator at the end or no value
    displayValue += "0"; // add zero, if there is no precedent number
  }

  let match = displayValue.match(/[-+]?[0-9]*\.?[0-9]+/g);
  if (match) {
    let lastNum = match.at(-1);
    if (lastNum.includes(".")) {
      return;
    }
  }

  if (displayValue.at(-1) === ".") {
    return; // no more than one dot consecutively
  }

  displayValue += ".";
  display.textContent = displayValue;
});

opButtons.forEach(button => {
  button.addEventListener("click", () => {
    checkNan();
    if (displayValue === "") {
      return;
    }
    if (displayValue.at(-1) === " ") {
      displayValue = displayValue.substring(0, displayValue.length - 2); // if operator clicked again, remove the current one with space
    }
    if ("0123456789".includes(displayValue.at(-1))) {
      displayValue += " ";
    }
    displayValue += button.textContent + " "; // spacing after the operator
    display.textContent = displayValue;
  });
});

plusOrMinusButton.addEventListener("click", () => {
  checkNan();
  let match = displayValue.match(/[-+]?[0-9]*\.?[0-9]+/g);
  if (match) {
    let lastNum = parseFloat(match.at(-1));
    let lastIndex = displayValue.lastIndexOf(lastNum.toString());

    displayValue = displayValue.substring(0, lastIndex)
      + displayValue.substring(lastIndex).replace(lastNum.toString(), `${-lastNum}`);
    display.textContent = displayValue;
  }
});

backButton.addEventListener("click", () => {
  checkNan();
  if (
    displayValue.at(-2) === " "
    || displayValue.at(-1) === " "
    || displayValue.at(-2) === "."
    || (!isNaN(+displayValue.at(-1)) && displayValue.at(-2) === "-") // negative num
  ) { // remove the decimal, if only one char present after .
    displayValue = displayValue.substring(0, displayValue.length - 2);
  } else {
    displayValue = displayValue.substring(0, displayValue.length - 1);
  }
  display.textContent = displayValue;
});

equalButton.addEventListener("click", () => {
  checkNan();
  if (displayValue.at(-1) === ".") { // if . at last, add a zero (it can be removed as well, both are same)
    displayValue += "0";
    display.textContent += displayValue;
  }

  let regex = /[-+]?[0-9]*\.?[0-9]+/;

  while (displayValue.includes(" ")) {
    let opArr = [];

    let match = displayValue.match(regex);
    if (match) {
      let num = parseFloat(match[0]);
      displayValue = displayValue.replace(match[0], "");
      opArr.push(num);
    }

    if ([" +", " -", " *", " /"].some(op => displayValue.slice(0, -1).includes(op))) {
      opArr.push(displayValue.trim()[0]); // get the operator after removing the spacing
      displayValue = displayValue.slice(3); // space + operator + space (3 chars)
    }

    match = displayValue.match(regex);
    if (match) {
      let num = parseFloat(match[0]);
      displayValue = displayValue.replace(match[0], "");
      opArr.push(num);
    }

    displayValue = calculator.operate(opArr[0], opArr[1], opArr[2]) + displayValue;
  }

  display.textContent = displayValue;
});

document.addEventListener("keydown", (e) => {
  if (
    !isNaN(parseInt(e.key))
    || ("/*-+".includes(e.key))
    || e.key === "Backspace"
    || e.key === "."
    || e.key == "Enter"
  ) {
    const targetElement = document.querySelector(`p[value='${e.key}']`);
    if (targetElement) {
      targetElement.click();
    }
  }
});
