const calcInput = document.getElementsByClassName("calculator-input")[0];
const inputScreen = document.getElementById("screen");
const maxN = 999999999999;
let number1 = "";
let number2 = "";
let operation = "";
let state = false;

window.onload = clearing();

calcInput.addEventListener("click", (event) => {
  let clickedBtn = event.target;

  // Если нажал не на кнопку - ничего не делаем

  if (!clickedBtn.classList.contains("calculator-input-btn")) {
    return;
  }

  // Если нажал на "C" - очистить экран и переменные

  if (clickedBtn.classList.contains("btn-clear-all")) {
    clearing();
  }

  // Если нажал на "MR" - сохранить значение

  if (clickedBtn.classList.contains("btn-save")) {
    localStorage.setItem("savedNumber", number1);
    console.log("saved:", number1);
  }

  // Если нажал на "MC" - взять сохранённое значениеw

  if (clickedBtn.classList.contains("btn-pull")) {
    let pullItem = localStorage.getItem("savedNumber");
    console.log(pullItem);
    if (operation === "" && number2 === "") {
      inputScreen.innerHTML = pullItem;
      number1 = pullItem;
    }
    if (operation != "") {
      inputScreen.innerHTML = pullItem;
      number2 = pullItem;
    }
    console.log(number1, operation, number2, state);
  }

  // Если нажата одна из цифр - необходимо начать набирать переменные

  if (clickedBtn.classList.contains("btn-digit")) {
    if (state === false) {
      if (operation === "" && number2 === "") {
        number1 = number1 + clickedBtn.innerHTML;
        showContent(number1);
      } else {
        number2 = number2 + clickedBtn.innerHTML;
        showContent(number2);
      }
      console.log(number1, operation, number2, state);
    } else {
      number1 = +clickedBtn.innerHTML;
      showContent(number1);
      state = false;
      console.log(number1, operation, number2, state);
    }
  }

  // Если нажата одна из операций необходимо начать набирать вторую переменную

  if (clickedBtn.classList.contains("btn-operation")) {
    if (number1 === "") {
      return;
    }
    if (number1 !== "" && state === true) {
      state = false;
      operation = clickedBtn.innerHTML;
      showContent(operation);
    } else {
      operation = clickedBtn.innerHTML;
      showContent(operation);
    }
    console.log(number1, operation, number2, state);
  }

  // Вычисление результата

  if (clickedBtn.classList.contains("btn-result")) {
    if (number2 === "" && operation != "") {
      number1 = calculation(number1, number1, operation);
      number1 > maxN ? (inputScreen.innerHTML = "to Much") : calcState(number1);
    }
    if (number2 === "" && operation === "") {
      calcState(number1);
    } else {
      number1 = calculation(number1, number2, operation);
      number1 > maxN ? (inputScreen.innerHTML = "to Much") : calcState(number1);
    }
    console.log(number1, operation, number2, state);
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
  inputScreen.innerHTML = 0;
  number1 = 0;
  number2 = "";
  operation = "";
}
