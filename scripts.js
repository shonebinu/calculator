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
      return;
    }
    if ("0123456789".includes(displayValue.at(-1))) {
      displayValue += " ";
    }
    displayValue += button.textContent;
    display.textContent = displayValue;
  });
});

equalButton.addEventListener("click", () => {
  let a, op, b;
  [a, op, b] = displayValue.split(" ");
  [a, b] = [+a, +b];

  let result = calculator.operate(a, op, b);
  displayValue = `${result}`;

  display.textContent = displayValue;
});
