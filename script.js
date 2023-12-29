const calcDisplay = document.querySelector(".calc-display");
const calcNumbers = document.querySelectorAll(".btn-number");
const calcOperators = document.querySelectorAll(".btn-operator");
const calcAllClear = document.querySelector(".btn-all-clear");
const calcClear = document.querySelector(".btn-clear");
const calcEquals = document.querySelector(".btn-equals");
const calcDecimal = document.querySelector(".btn-decimal");
const calcPercent = document.querySelector(".btn-percentage");
const calcExponent = document.querySelector(".btn-exponent");
const buttonSound = new Audio("assets/audio/btn-click.mp3");
calcDisplay.textContent = 0;

let flag = false;
let num1Status = false;
let num1 = [];
let num2 = [];
let operator;
let result = 0;
let arr = ["0"];

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
  calcDisplay.textContent = 0;
}

function clearOperand() {
  num1 = [];
  num2 = [];
  result = result.toString();
  num1.push(...result);
  result = null; //clear result
  num1Status = true;
  operator = null;
}

function playSound() {
  buttonSound.currentTime = 0; // * Allow for playing multiple times
  buttonSound.play();
}

function calculate(num1, num2, operator) {
  let first = Number(num1.join(""));
  let second = Number(num2.join(""));
  result = operate(first, operator, second);
  if (result) {
    if (!Number.isInteger(result)) {
      result = result.toFixed(10);
      if (result.endsWith(0)) {
        result = result.replace(/\.?0+$/, "");
      }
    }
    calcDisplay.textContent = result;
    arr = [...calcDisplay.textContent];
    clearOperand();
  }
}

function clearDigit() {
  arr = [...calcDisplay.textContent];
  if (arr.length > 1) {
    arr.pop();
    function containsOperator(arr) {
      const operators = /[+\-*/]/;
      return arr.some((element) => operators.test(element));
    }
    if (!containsOperator(arr)) {
      num1Status = true; //num1 exists at this point so push to num2
      operator = null; //prepare operator for next operation
      if (num1.length == calcDisplay.textContent.length) {
        // prevents num1 from being popped after user clears only operator
        num1.pop();
        num1Status = false;
      }
    } else {
      num2.pop();
    }
    const newText = arr.join("");
    calcDisplay.textContent = newText;
  } else {
    clearAllCalc();
  }
}

function getExponent() {
  let num;
  if (!num1Status) {
    num = Number(num1.join(""));
    const exponentNum = "" + num ** 2; //convert num to string
    num1 = [];
    num1.push(exponentNum);
    calcDisplay.textContent = exponentNum;
  } else {
    const length = num2.length;
    num = Number(num2.join(""));
    const exponentNum = "" + num ** 2; //convert num to string
    num2 = [];
    num2.push(exponentNum);
    calcDisplay.textContent =
      calcDisplay.textContent.slice(0, -length) + exponentNum;
  }
}

function getPercentage() {
  let num;
  if (!num1Status) {
    num = Number(num1.join(""));
    const percentNum = "" + num / 100; //convert num to string
    num1 = [];
    num1.push(percentNum);
    calcDisplay.textContent = percentNum;
  } else {
    const length = num2.length;
    num = Number(num2.join(""));
    const percentNum = "" + num / 100; //convert num to string
    num2 = [];
    num2.push(percentNum);
    calcDisplay.textContent =
      calcDisplay.textContent.slice(0, -length) + percentNum;
  }
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
  clearAllCalc();
});

calcPercent.addEventListener("click", () => {
  getPercentage();
});

calcExponent.addEventListener("click", () => {
  getExponent();
});

calcClear.addEventListener("click", () => {
  clearDigit();
});

calcDecimal.addEventListener("click", (e) => {
  if (num1Status === false) {
    // If operator is clicked move next set of numbers to second array??
    if (!num1.includes(".")) {
      calcDisplay.textContent += e.target.dataset.decimal;
      num1.push(e.target.dataset.decimal);
    }
  } else {
    // operator = null;
    if (!num2.includes(".")) {
      calcDisplay.textContent += e.target.dataset.decimal;
      num2.push(e.target.dataset.decimal);
    }
  }
});

function checkKey(e) {
  const num = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const operatorArr = ["*", "+", "-", "/"];

  if (num.includes(e.key)) {
    playSound();

    if (flag === false) {
      calcDisplay.textContent = "";
      flag = true;
    }
    calcDisplay.textContent += e.key;
    if (num1Status === false) {
      // If operator is clicked move next set of numbers to second array??
      num1.push(e.key);
    } else {
      // operator = null;
      num2.push(e.key);
    }
  }

  if (operatorArr.includes(e.key)) {
    playSound();
    if (!operator) {
      //only if there is no operator
      operator = e.key;
      num1Status = true; //if operator is clicked then that means it's time to move to the next array
      if (flag === false && operator === "-") {
        calcDisplay.textContent = "";
        flag = true;
      }
    } else {
      calculate(num1, num2, operator);
      operator = e.key;
    }
    calcDisplay.textContent += e.key;
  }

  if (e.key === "Backspace") {
    clearDigit();
  }

  if (e.key === "=" || e.key === "Enter") {
    calculate(num1, num2, operator);
  }

  if (e.key === "c") {
    clearAllCalc();
  }

  if (e.key === "p") {
    getExponent();
  }

  if (e.key === "%") {
    getPercentage();
  }

  if (e.key === ".") {
    if (num1Status === false) {
      // If operator is clicked move next set of numbers to second array??
      if (!num1.includes(".")) {
        calcDisplay.textContent += e.key;
        num1.push(e.key);
      }
    } else {
      // operator = null;
      if (!num2.includes(".")) {
        calcDisplay.textContent += e.key;
        num2.push(e.key);
      }
    }
  }
}
document.addEventListener("keydown", checkKey);
