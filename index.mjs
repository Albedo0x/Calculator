const inputScreen = document.getElementById("screen");
let number1 = "";
let number2 = "";
let operation = "";
let state = true;
let pullItem;
let btntext;

window.onload = clearing();

document.querySelector(".btn-result").addEventListener("click", () => {
  if (!number2 && operation) {
    number1 = calculation(number1, number1, operation);
  }
  if (number2) {
    number1 = calculation(number1, number2, operation);
  }
  calcState(number1);
});

document.querySelector(".btn-clear-all").addEventListener("click", clearing);

document.querySelector(".btn-save").addEventListener("click", () => {
  localStorage.setItem("savedNumber", number1);
});

document.querySelector(".btn-pull").addEventListener("click", () => {
  pullItem = localStorage.getItem("savedNumber");
  showContent(pullItem);
  if (!operation) {
    number1 = pullItem;
  }
  if (operation) {
    number2 = pullItem;
  }
});

document.querySelectorAll(".btn-operation").forEach((element) => {
  element.addEventListener("click", (event) => {
    operation = event.target.innerHTML;
    showContent(operation);
    if (state) {
      state = false;
    }
  });
});

document.querySelectorAll(".btn-digit").forEach((element) => {
  element.addEventListener("click", (event) => {
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
  });
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
function showContent(number) {
  inputScreen.innerHTML = number;
}

// Функция обновления статсуса после выполнения вычислений
function calcState(number) {
  showContent(number);
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
