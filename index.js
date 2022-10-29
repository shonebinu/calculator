

let operation = "";

//add
function add(a, b) {
    return a+b;
}

//subtract
function subtract(a, b) {
    return a-b;
}

//multiply
function multiply(a, b) {
    return a*b;
}

//divide
function divide(a, b) {
    return a/b;
}


//operate the inputs based on the operator
const operate = (operator, a, b) => {
    switch (operator) {

        case '+':
            return add(a, b);
            break;

        case '-':
            return subtract(a, b);
            break;       

        case '*':
            return multiply(a, b);
            break;
    
        case '/':
            return divide(a, b);
            break;           
        }
}



const nums = document.querySelector("#nums").children;
const botbox = document.querySelector("#botbox");

[...nums].forEach(num => {
    num.addEventListener("click", () => {
        operation += num.textContent;
        botbox.textContent = operation;
    })
})


