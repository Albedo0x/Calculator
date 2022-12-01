// Объявление переменных и констант

const calcInput = document.getElementById("main-input");
const inputScreen = document.getElementById("screen");
let number1 = "";
let number2 = "";
let operation = "";
let state = false;

window.onload = clearing();

calcInput.addEventListener("click", (event) => {
  let clickedBtn = event.target;

  // Если нажал не на кнопку - ничего не делаем

  if (!clickedBtn.classList.contains("calculator-btn")) {
    return;
  }

  // Если нажал на "C" - очистить экран и переменные

  if (clickedBtn.classList.contains("btn-clear-all")) {
    clearing();
  }

  // Если нажал на "MR" - сохранить значение

  if (clickedBtn.classList.contains("btn-save")) {
    localStorage.setItem("savedNumber", number1);
  }

  // Если нажал на "MC" - взять сохранённое значениеw

  if (clickedBtn.classList.contains("btn-pull")) {
    let pullItem = localStorage.getItem("savedNumber");
    if (operation === "" && number2 === "") {
      inputScreen.innerHTML = pullItem;
      number1 = pullItem;
    }
    if (operation != "") {
      inputScreen.innerHTML = pullItem;
      number2 = pullItem;
    }
  }

  // Если нажата одна из цифр - необходимо начать набирать переменные

  if (clickedBtn.classList.contains("btn-digit")) {
    if (state === false) {
      if (operation === "" && number2 === "" && number1 === "0") {
        number1 = clickedBtn.innerHTML;
        showContent(number1);
        return;
      }
      if (operation === "" && number2 === "" && number1 != "0") {
        number1 = number1 + clickedBtn.innerHTML;
        showContent(number1);
        return;
      } else {
        number2 = number2 + clickedBtn.innerHTML;
        showContent(number2);
      }
    } else {
      number1 = clickedBtn.innerHTML;
      showContent(number1);
      state = false;
    }
  }

  // Если нажата одна из операций необходимо начать набирать вторую переменную

  if (clickedBtn.classList.contains("btn-operation")) {
    operation = clickedBtn.innerHTML;
    showContent(operation);
    if (number1 !== "" && state === true) {
      state = false;
    } else {
      return;
    }
  }

  // Вычисление результата

  if (clickedBtn.classList.contains("btn-result")) {
    if (number2 === "" && operation != "") {
      number1 = calculation(number1, number1, operation);
    }
    if (number2 === "" && operation === "") {
      return;
    } else {
      number1 = calculation(number1, number2, operation);
    }
    calcState(number1);
  }
});

// Функция проведения рассчётов

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

// Функция отображения вычислений на экране
function showContent(info) {
  inputScreen.innerHTML = info;
}

// Функция обновления статсуса после выполнения вычислений
function calcState(info) {
  showContent(info);
  state = true;
  number2 = "";
  operation = "";
}

// Функция очистки переменных и экрана
function clearing() {
  inputScreen.innerHTML = "0";
  number1 = "0";
  number2 = "";
  operation = "";
}
