const calcDisplay = document.querySelector(".calc-display");
const calcBtns = document.querySelectorAll(".calc-row");
calcDisplay.textContent = 0;

calcBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    calcDisplay.textContent = this.textContent;
  });
});
