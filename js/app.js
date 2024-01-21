const calculator = document.querySelector(".container");
const display = document.querySelector(".display");
const buttonContainer = document.querySelector(".buttons");
const buttons = document.querySelectorAll(".buttons>button");
let operatorPressed = false;
let preOperator;
let operator;
let postOperator;

buttons.forEach((button) => {
    if (button.classList.contains("number")) {
        button.addEventListener("click", (ev) => {
            if (!operatorPressed || display.textContent != preOperator) {
                display.textContent += button.id;
            } else {
                display.textContent = button.id;
            }
        });
    } else if (button.classList.contains("operator")) {
        button.addEventListener("click", (ev) => {
            if (!operatorPressed) {
                operatorPressed = true;
                preOperator = Number(display.textContent);
                operator = button.id;
            } else {
                postOperator = Number(display.textContent);
                operate(preOperator, operator, postOperator, button.id);
            }

        });
    } else if (button.classList.contains("equals")) {
        button.addEventListener("click", (ev) => {
            postOperator = Number(display.textContent);
            operate(preOperator, operator, postOperator, false);
        })
    } else if (button.classList.contains("clear")) {
        button.addEventListener("click", (ev) => {
            preOperator = undefined;
            operator = undefined;
            postOperator = undefined;
            display.textContent = undefined;
            operatorPressed = false;
        })
    }
});

function operate(paramA, currentOperator, paramB, nextOperator) {
    let result;
    switch (currentOperator) {
        case "+":
            result = sum(paramA, paramB).toString();
            break;
        case "-":
            result = subtract(paramA, paramB).toString();
            break;
        case "*":
            result = multiply(paramA, paramB).toString();
            break;
        case "/":
            result = divide(paramA, paramB).toString();
            break;
    }
    display.textContent = result;
    preOperator = Number(result);
    if (nextOperator) {
        operator = nextOperator;
        operatorPressed = true;
    } else {
        operatorPressed = false;
        postOperator = undefined;
        operator = undefined;
    }
}

function sum(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}
