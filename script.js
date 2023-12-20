const calcDisplay = document.querySelector(".calc-display");
const calcNumbers = document.querySelectorAll(".btn-number");
const calcOperators = document.querySelectorAll(".btn-operator");
const calcAllClear = document.querySelector(".btn-all-clear");
const calcClear = document.querySelector(".btn-clear");
calcDisplay.textContent = 0;
let flag = false;
let operatorFlag = false;
let num1Status = false;
let num1;
let num2;
let numResult;
const buttonSound = new Audio("assets/audio/btn-click.mp3");
calcNumbers.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (flag === false && operatorFlag === false) {
      calcDisplay.textContent = "";
      flag = true;
    }
    //buttonSound.currentTime = 0;// * Allow for playing multiple times
    //buttonSound.play();
    calcDisplay.textContent += btn.dataset.number;
    if (num1Status === false) {
      num1.push(btn.dataset.number);
    } else {
      num2.push(btn.dataset.number);
    }
  });
});
calcOperators.forEach((btn) => {
  btn.addEventListener("click", () => {
    num1Status = true;
    console.log(`num1 is ${num1}`);
    console.log(`num2 is ${num2}`);
    calcDisplay.textContent += btn.dataset.operator;
    console.log(num1);
  });
});
calcAllClear.addEventListener("click", () => {
  calcDisplay.textContent = "";
  calcDisplay.textContent = 0;
  flag = false;
  operatorFlag = false;
});
calcClear.addEventListener("click", () => {
  //  if (calcDisplay.textContent.length > 1) {
  //    calcDisplay.textContent = calcDisplay.textContent.slice(0, -1); //*Remove the last string from the display
  //  } else {
  //    calcDisplay.textContent = 0;
  //  }
  calcDisplay.textContent =
    calcDisplay.textContent.length > 1
      ? calcDisplay.textContent.slice(0, -1)
      : 0;
});
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
const result = operate(3, "+", 2);
console.log(result);
/*  DEBUGGING */
const reload = document.querySelector("#reload");
reload.addEventListener("click", () => location.reload());
