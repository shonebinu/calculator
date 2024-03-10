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

numButtons.forEach(button => {
  button.addEventListener("click", () => {
    if ("+-*/".includes(displayValue.at(-1))) {
      displayValue += " ";
    }
    displayValue += button.textContent;
    display.textContent = displayValue;
  });
});

opButtons.forEach(button => {
  button.addEventListener("click", () => {
    if ("+-*/".includes(displayValue.at(-1))) {
      displayValue = displayValue.substring(0, displayValue.length - 2);
    }
    if ("0123456789".includes(displayValue.at(-1))) {
      displayValue += " ";
    }
    displayValue += button.textContent;
    display.textContent = displayValue;
  });
});

equalButton.addEventListener("click", () => {
  while ("+-/*".split("").some(op => displayValue.includes(op))) {
    let a, op, b;
    [a, op, b] = displayValue.split(" ");
    [a, b] = [+a, +b];

    let result = calculator.operate(a, op, b);
    let restOfString = displayValue.split(" ").slice(3).join(" ");
    displayValue = `${result} ${restOfString}`;

    display.textContent = displayValue;
  }
});

acButton.addEventListener("click", () => {
  displayValue = "";
  display.textContent = displayValue;
});

backButton.addEventListener("click", () => {
  if (displayValue.at(-1) === " ") {
    displayValue = displayValue.substring(0, displayValue.length - 2);
  } else {
    displayValue = displayValue.substring(0, displayValue.length - 1);
  }
  display.textContent = displayValue;
});
