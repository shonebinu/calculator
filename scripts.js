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

const calculator = new Calculator();

let displayValue = "";
const display = document.querySelector(".display");
const numButtons = document.querySelectorAll(".num");
const opButtons = document.querySelectorAll(".op");
const equalButton = document.querySelector("[data-equal]");
const acButton = document.querySelector("[data-ac]");
const backButton = document.querySelector("[data-back]");
const plusOrMinusButton = document.querySelector("[data-plus-minus]");

acButton.addEventListener("click", () => {
  displayValue = "";
  display.textContent = displayValue;
});

numButtons.forEach(button => {
  button.addEventListener("click", () => {
    displayValue += button.textContent;
    display.textContent = displayValue;
  });
});

opButtons.forEach(button => {
  button.addEventListener("click", () => {
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
  if (displayValue.at(-1) === " ") {
    displayValue = displayValue.substring(0, displayValue.length - 2);
  } else {
    displayValue = displayValue.substring(0, displayValue.length - 1);
  }
  display.textContent = displayValue;
});

equalButton.addEventListener("click", () => {
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
