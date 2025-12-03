const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
//ucitavanje poslednjeg unetog izraza pri pokretanju
window.addEventListener("load", () => {
  let saved = localStorage.getItem("lastCalc");
  if (saved !== null) {
    display.value = saved;
  }
});

let lastNumber = "";
// ispis na displeju
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = display.value;
    const char = btn.textContent;
    const lastChar = val.slice(-1);
    const beforeLast = val.slice(-2, -1);
    const operators = "+-*/";
    // Ako nije broj, ubaci direktno
    if (isNaN(char)) {
      display.value += char;
      localStorage.setItem("lastCalc", display.value);
      return;
    }
    // BLOKIRANJE 05, 089
    if (
      operators.includes(beforeLast) && // pre poslednje je operator
      lastChar === "0" && // poslednji znak je 0
      !isNaN(char) // korisnik unosi broj
    ) {
      return;
    }

    // Ako je sve OK — upiši broj
    display.value += char;

    // snimi
    localStorage.setItem("lastCalc", display.value);
  });
});

// clear dugme
document.getElementById("clear").addEventListener("click", () => {
  display.value = "";
  lastNumber = "";

  //cuvanje praznog stringa
  localStorage.setItem("lastCalc", "");
});

// jendakost
document.getElementById("equal").addEventListener("click", () => {
  try {
    let expression = display.value;
    let result = eval(expression);
    display.value = result;
    lastNumber = result;

    //cuvanje rez nakon =
    localStorage.setItem("lastCalc", display.value);
  } catch {
    lastNumber = "";
    display.value = "Error";
  }
});

//operatori zaredom
const operators = ["/", "*", "+", "-"];
const operatorButtons = document.querySelectorAll(".op");

operatorButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const lastChar = display.value.slice(-1); // poslednji znak

    const op = btn.textContent; // operator koji je kliknut

    // Ako je poslednji znak već operator → zabrani unos
    if (operators.includes(lastChar)) {
      return; // ništa ne dodajemo
    }

    display.value += op;

    //cuvanje nakon operatora
    localStorage.setItem("lastCalc", display.value);
  });
});
// brisanje jednog znaka

function deleteOneChar() {
  display.value = display.value.slice(0, -1);

  // cuvanje posle brisanja
  localStorage.setItem("lastCalc", display.value);
}
document.getElementById("deleteOne").addEventListener("click", deleteOneChar);
