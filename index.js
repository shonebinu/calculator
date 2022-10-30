

let operation = "";
let operationArray = [];

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

        case '×':
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

        if (operationArray[0]==undefined) return
        
        if (operationArray.at(-1) != '=' && operationArray.at(-1) != '+' && operationArray.at(-1) != '-' && operationArray.at(-1) != '/' && operationArray.at(-1) != '×') operationArray.push(ope.textContent)
        
        
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

        if (con.textContent == '.') {
            if (`${operation}`.includes('.')) return
            operation += '.';
            botbox.textContent = operation;
            
        }

    })
})


function equalto() {


    let newArray = operationArray.slice(0, operationArray.length-1);

    while (newArray.length > 1) {

        let firstVar = newArray[0];
        let secondVar = newArray[2];
        let operator = newArray[1];

        newArray.splice(0, 3);

        newArray.unshift(operate(operator, firstVar, secondVar))

       


    }

    let result = newArray[0];
    operation = result; 

    botbox.textContent = operation;


    
    operationArray = [];


}




// Keyboard

let keyBoardNums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
let keyBoardOpe = ["+", "-", "/", "*"]
let keyBoardCon = ['Enter', 'Backspace', '.']
document.addEventListener("keydown", (e) => {

    if (keyBoardNums.includes(e.key)) {
        
        operation += e.key;
        botbox.textContent = operation;

    }

    if (keyBoardOpe.includes(e.key)) {
        
        if (operation!="") operationArray.push(+operation)

        if (operationArray[0]==undefined) return
        
        if (operationArray.at(-1) != '=' && operationArray.at(-1) != '+' && operationArray.at(-1) != '-' && operationArray.at(-1) != '/' && operationArray.at(-1) != '×') {
        
            if (e.key == '*') {
                operationArray.push('×')
            } else operationArray.push(e.key)
        
        }
        topbox.textContent = operationArray.join(" ");
        operation = '';
        botbox.textContent = operation;

        e.preventDefault()
    }

    if (keyBoardCon.includes(e.key)) {
        if (e.key == "Backspace") {
            
            let interArray = operation.split("");

            interArray.pop();

            operation = interArray.join("");
            
            botbox.textContent = operation;
        }

        if (e.key == 'Enter') {

            if (operationArray.find(item => item=='=')) return



            if (operationArray[0] == undefined) return



            if ((operation == '') && (
                operationArray.at(-1) == '+' ||
                operationArray.at(-1) == '-' ||
                operationArray.at(-1) == '/' ||
                operationArray.at(-1) == '×'
            )) return



            operationArray.push(+operation);
            operationArray.push('=');
            operation = '';
            botbox.textContent = operation;
            topbox.textContent = operationArray.join(" ")

            equalto()
        }

        if (e.key == '.') {
            if (`${operation}`.includes('.')) return
            operation += '.';
            botbox.textContent = operation;
            
        }

        e.preventDefault()
    }

})