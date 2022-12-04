const inputScreen = document.getElementById("screen");
let number1 = "0";
let number2 = "";
let operation = "";
let state = true;
let pullItem;
let btntext;

document.querySelector(".btn-clear-all").addEventListener("click", clearing);

document.querySelector(".btn-save").addEventListener("click", setStorrage);

document.querySelector(".btn-pull").addEventListener("click", getStorage);

document.querySelector(".btn-result").addEventListener("click", setResult);

document.querySelectorAll(".btn-operation").forEach((element) => {
  element.addEventListener("click", setOperation);
});

document.querySelectorAll(".btn-digit").forEach((element) => {
  element.addEventListener("click", setDigit);
});

function setStorrage() {
  localStorage.setItem("savedNumber", number1);
}

function getStorage() {
  pullItem = localStorage.getItem("savedNumber");
  showContent(pullItem);
  if (!operation) {
    number1 = pullItem;
  }
  if (operation) {
    number2 = pullItem;
  }
}

function setResult() {
  if (!number2 && operation) {
    number1 = calculation(number1, number1, operation);
  }
  if (number2) {
    number1 = calculation(number1, number2, operation);
  }
  calcState(number1);
}

function setOperation(event) {
  operation = event.target.innerHTML;
  showContent(operation);
  if (state) {
    state = false;
  }
}

function setDigit(event) {
  btntext = event.target.innerHTML;
  if (!state) {
    if (!operation && number1 != "0") {
      number1 += btntext;
      showContent(number1);
    }
    if (operation) {
      number2 += btntext;
      showContent(number2);
    }
  }
  if (state) {
    number1 = btntext;
    showContent(number1);
    state = false;
  }
}

function calculation(number1, number2, operation) {
  switch (operation) {
    case "+":
      number1 = +(+number1 + +number2).toFixed(3);
      return number1;
    case "-":
      number1 = +(+number1 - +number2).toFixed(3);
      return number1;
    case "*":
      number1 = +(+number1 * +number2).toFixed(3);
      return number1;
    case "÷":
      number1 = +(+number1 / +number2).toFixed(3);
      return number1;
    case "^":
      number1 = +((+number1) ** +number2).toFixed(3);
      return number1;
  }
}

function showContent(number) {
  inputScreen.innerHTML = number;
}

function calcState(number) {
  showContent(number);
  state = true;
  number2 = "";
  operation = "";
}

function clearing() {
  inputScreen.innerHTML = "0";
  number1 = "0";
  number2 = "";
  operation = "";
}
