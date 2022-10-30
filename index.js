

let operation = "";
const operationArray = [];

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


const topbox = document.querySelector("#topbox");
const arithmeticOper = document.querySelectorAll(".ops");
[...arithmeticOper].forEach(ope => {
    ope.addEventListener("click", () => {

        


        if (operation!="") operationArray.push(+operation)

        if (!operationArray[0]) return
        
        if (operationArray.at(-1) != '+' && operationArray.at(-1) != '-' && operationArray.at(-1) != '/' && operationArray.at(-1) != '×') operationArray.push(ope.textContent)
        
        
        topbox.textContent = operationArray.join(" ");
        operation = '';
        botbox.textContent = operation;
        
    })
})



const controls = document.querySelectorAll(".con");
[...controls].forEach(con => {
    con.addEventListener("click", () => {
        
        if (con.textContent == "AC") location.reload()
        if (con.textContent == "←") {
            
            let interArray = operation.split("");

            interArray.pop();

            operation = interArray.join("");
            
            botbox.textContent = operation;
        }

        if (con.textContent == '=') {

            if (operationArray.find(item => item=='=')) return



            if (operationArray[0] == undefined) return



            if ((operation == '') && (
                operationArray.at(-1) == '+' ||
                operationArray.at(-1) == '-' ||
                operationArray.at(-1) == '/' ||
                operationArray.at(-1) == '×'
            )) return



            operationArray.push(+operation);
            operationArray.push(con.textContent);
            operation = '';
            botbox.textContent = operation;
            topbox.textContent = operationArray.join(" ")

            equalto()
        }

    })
})




/*
TODO: Add the support for '.'
Handle exceptions like dividing by 0
Keyboard support
Glue everything up and get the result
Operator changing when clicking another operator
*/