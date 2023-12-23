const calcDisplay = document.querySelector(".calc-display");
const calcNumbers = document.querySelectorAll(".btn-number");
const calcOperators = document.querySelectorAll(".btn-operator");
const calcAllClear = document.querySelector(".btn-all-clear");
const calcClear = document.querySelector(".btn-clear");
const calcEquals = document.querySelector(".btn-equals");
const calcDecimal = document.querySelector(".btn-decimal");
const calcToggle = document.querySelector(".btn-toggle");
calcDisplay.textContent = 0;

let flag = false;
let operatorFlag = false;
let num1Status = false;
let num1 = [];
let num2 = [];
let operator;
let numResult;
let result;
const buttonSound = new Audio("assets/audio/btn-click.mp3");

function add(num1, num2) {
  return num1 + num2;
}
function subtract(num1, num2) {
  return num1 - num2;
}
function multiply(num1, num2) {
  return num1 * num2;
}
function divide(num1, num2) {
  return num1 / num2;
}

function operate(num1, operator, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      console.log("Invalid operator or operand");
  }
}

function clearAllCalc() {
  result = null; // this prevents from using previous result for next calculation in line 85
  flag = false;
  operatorFlag = false;
  num1Status = false;
  num1 = [];
  num2 = [];
}
function clearOperand() {
  num1 = [];
  num2 = [];
  num1.push(result);
  num1Status = true;
  operator = null;
  console.log(operator);
}
function playSound() {
  buttonSound.currentTime = 0; // * Allow for playing multiple times
  buttonSound.play();
}

function calculate(num1, num2, operator) {
  let first = Number(num1.join(""));
  let second = Number(num2.join(""));
  result = operate(first, operator, second);
  if (!Number.isInteger(result)) {
    result = result.toFixed(10);
  }
  calcDisplay.textContent = result;
  clearOperand();
}

calcNumbers.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (flag === false && operatorFlag === false) {
      calcDisplay.textContent = "";
      flag = true;
    }
    playSound();
    calcDisplay.textContent += btn.dataset.number;
    if (num1Status === false) {
      // If operator is clicked move next set of numbers to second array??
      num1.push(btn.dataset.number);
    } else {
      num2.push(btn.dataset.number);
    }
  });
});

calcOperators.forEach((btn) => {
  btn.addEventListener("click", () => {
    playSound();
    operator = btn.dataset.operator;
    /*TODO:  BREAKING CHANGE
    //    if (num1 && num2 && operator) {
    //      console.log(`num1 in ops ${num1}`);
    //      console.log(`num2 in ops ${num2}`);
    //      calculate(num1, num2, operator);
    //    }
    */
    //console.log(operator);
    //console.log(`Result is ${result}`);
    if (result) {
      //if a calculation is made after previous calculation
      // console.log(`If result is true num1 is ${num1}`);
      num1.splice(0, num1.length);
      num2.splice(0, num2.length);
      num1.push(result);
      //console.log(`test ${num1}`);
    }
    //console.log(`num1 after operator ${num1.join("")}`);
    num1Status = true;
    //console.log(`num1 is ${num1}`);
    //console.log(`num2 is ${num2}`);
    if (flag === false && operator === "-") {
      calcDisplay.textContent = "";
      flag = true;
    }
    calcDisplay.textContent += btn.dataset.operator;
    //console.log(num1);
  });
});

calcEquals.addEventListener("click", () => {
  calculate(num1, num2, operator);
});

calcAllClear.addEventListener("click", () => {
  calcDisplay.textContent = "";
  calcDisplay.textContent = 0;
  clearAllCalc();
});

calcClear.addEventListener("click", () => {
  //check if array is num1 or num2 and pop it
  num1Status === false ? num1.pop() : num2.pop();
  flag = false;
  calcDisplay.textContent =
    calcDisplay.textContent.length > 1
      ? calcDisplay.textContent.slice(0, -1) // * Remove the last string from the display
      : 0;
  //console.log(num1, num2);
});

calcDecimal.addEventListener("click", (e) => {
  calcDisplay.textContent += e.target.dataset.decimal;
});

calcToggle.addEventListener("click", (e) => {
  calcDisplay.textContent += e.target.dataset.toggle;
});

//const result = operate(3, "+", 2);
//console.log(result);
/*  DEBUGGING */
const reload = document.querySelector("#reload");
reload.addEventListener("click", () => location.reload());
//TODO: Modify +/- operator to toggle respectively
//TODO: Display comma if numbers exceed 3
//TODO: Allow for only pair calculation
//
