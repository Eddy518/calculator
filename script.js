const calcDisplay = document.querySelector(".calc-display");
const calcNumbers = document.querySelectorAll(".btn-number");
const calcOperators = document.querySelectorAll(".btn-operator");
const calcAllClear = document.querySelector(".btn-all-clear");
//const calcClear = document.querySelector(".btn-clear");
const calcEquals = document.querySelector(".btn-equals");
const calcDecimal = document.querySelector(".btn-decimal");
const calcToggle = document.querySelector(".btn-toggle");
const buttonSound = new Audio("assets/audio/btn-click.mp3");
calcDisplay.textContent = 0;

let flag = false;
let num1Status = false;
let num1 = [];
let num2 = [];
let operator;
let result = 0;

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
  }
}

function clearAllCalc() {
  result = null; // this prevents from using previous result for next calculation in line 85
  flag = false;
  operator = null;
  num1Status = false;
  num1 = [];
  num2 = [];
}

function clearOperand() {
  num1 = [];
  num2 = [];
  result = result.toString();
  num1.push(result);
  result = null; //clear result
  num1Status = true;
  //operator = null;
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
    if (result.endsWith(0)) {
      result = result.replace(/\.?0+$/, "");
    }
  }
  calcDisplay.textContent = result;
  clearOperand();
}

calcNumbers.forEach((btn) => {
  btn.addEventListener("click", () => {
    playSound();

    if (flag === false) {
      calcDisplay.textContent = "";
      flag = true;
    }
    calcDisplay.textContent += btn.dataset.number;
    if (num1Status === false) {
      // If operator is clicked move next set of numbers to second array??
      num1.push(btn.dataset.number);
    } else {
      // operator = null;
      num2.push(btn.dataset.number);
    }
  });
});

calcOperators.forEach((btn) => {
  btn.addEventListener("click", () => {
    playSound();
    if (!operator) {
      //only if there is no operator
      operator = btn.dataset.operator;
      num1Status = true; //if operator is clicked then that means it's time to move to the next array
      if (flag === false && operator === "-") {
        calcDisplay.textContent = "";
        flag = true;
      }
    } else {
      calculate(num1, num2, operator);
      operator = btn.dataset.operator;
    }
    calcDisplay.textContent += btn.dataset.operator;
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

calcToggle.addEventListener("click", (e) => {
  calcDisplay.textContent += e.target.dataset.toggle;
});

//calcClear.addEventListener("click", () => {
//  //check if array is num1 or num2 and pop it
//  if (calcDisplay.textContent == "0") {
//    clearAllCalc();
//  }
//  if (num2.length === 0) {
//    operator = null;
//    // If user deletes one digit that was a result of previous calculation and attempts to calculate result
//    let str = num1.join("");
//    console.log(str);
//    str = str.slice(0, str.length - 1);
//    num1.splice(0, num1.length); //clear previous num1 before popping
//    num1.push(str);
//    console.log(num1);
//    console.log(str);
//  }
//  num1Status === false ? num1.pop() : num2.pop();
//  flag = false;
//  calcDisplay.textContent =
//    calcDisplay.textContent.length > 1
//      ? calcDisplay.textContent.slice(0, -1) // * Remove the last string from the display
//      : 0;
//});
//
