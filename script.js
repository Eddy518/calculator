const calcDisplay = document.querySelector(".calc-display");
const calcBtns = document.querySelectorAll(".btn");
calcDisplay.textContent = 0;

calcBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    calcDisplay.textContent += btn.textContent;
  });
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
      break;
    case "-":
      return subtract(num1, num2);
      break;
    case "*":
      return multiply(num1, num2);
      break;
    case "/":
      return divide(num1, num2);
      break;
    default:
      console.log("Invalid operator or operand");
  }
}
const result = operate(3, "+", 2);
console.log(result);
/*  DEBUGGING */
const reload = document.querySelector("#reload");
reload.addEventListener("click", () => location.reload());
