const calculator = document.querySelector(".container");
const display = document.querySelector(".display");
const buttonContainer = document.querySelector(".buttons");
const buttons = document.querySelectorAll(".buttons>button");
let operatorPressed = false;
let preOperator;
let operator;
let postOperator;
let operatorDOM;

document.addEventListener("keydown", (ev) => {
    !isNaN(ev.key) ? pressNumber(ev.key) : console.log("NaN");
});

function pressNumber(key) {
    let num;
    key.target ? num = key.target.id : num = key;
    if (!operatorPressed || display.textContent != preOperator) {
        display.textContent += num;
    } else {
        display.textContent = num;
    }
}

buttons.forEach((button) => {
    if (button.classList.contains("number")) {
        button.addEventListener("click", pressNumber);
    } else if (button.classList.contains("operator")) {
        button.addEventListener("click", () => {
            if (!operatorPressed) {
                operatorPressed = true;
                preOperator = Number(display.textContent);
                operator = button.id;
                operatorDOM = button;
                operatorDOM.classList.toggle("active");
            } else {
                postOperator = Number(display.textContent);
                operate(preOperator, operator, postOperator, button.id);
            }

        });
    } else if (button.classList.contains("equals")) {
        button.addEventListener("click", () => {
            postOperator = Number(display.textContent);
            operate(preOperator, operator, postOperator, false);
        });
    } else if (button.classList.contains("clear")) {
        button.addEventListener("click", () => {
            preOperator = undefined;
            operator = undefined;
            postOperator = undefined;
            display.textContent = undefined;
            operatorPressed = false;
            operatorDOM.classList.remove("active");
            operatorDOM = undefined;
        });
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
        operatorDOM.classList.toggle("active");
        operatorDOM = document.querySelector(`#${CSS.escape(operator)}`);
        operatorDOM.classList.toggle("active");
        operatorPressed = true;
    } else {
        operatorPressed = false;
        postOperator = undefined;
        operator = undefined;
        operatorDOM.classList.toggle("active");
        operatorDOM = undefined;
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
