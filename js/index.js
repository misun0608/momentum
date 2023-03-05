const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login");
const username = document.querySelector("#showName");
const todo = document.querySelector("#todo-container");
const question = document.querySelector(".question");
const clock = document.querySelector("#clock");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";
const GREETING_MSG = {
  morning: "Good morning",
  afternoon: "Good afternoon",
  evening: "Good evening",
  night: "Good night",
};

function handleLogin(e) {
  console.log(loginInput.value);
  e.preventDefault();
  if (loginInput.value === null) {
    alert("이름을 입력해주세요");
  } else {
    loginInput.classList.add(HIDDEN_CLASSNAME);
    getTime();
    setInterval(getTime, 1000);
    clock.classList.remove(HIDDEN_CLASSNAME);
    setGreetingMsg();
    localStorage.setItem(USERNAME_KEY, loginInput.value);

    todo.classList.remove(HIDDEN_CLASSNAME);
    question.classList.add(HIDDEN_CLASSNAME);
  }
}

function getTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  clock.innerHTML = `${hours}:${minutes}:${seconds}`;
}

/**
 * 6~10:59 Good morning
 * 11~5:59 Good afternoon
 * 18~21:59 Good evening
 * 22:~5:59 Good night
 */
function setGreetingMsg() {
  const today = new Date();
  const hour = today.getHours();

  if (hour >= 6 && hour < 11) {
    username.innerHTML = `${loginInput.value}, ${GREETING_MSG.morning}`;
  } else if (hour >= 11 && hour < 18) {
    username.innerHTML = `${loginInput.value}, ${GREETING_MSG.afternoon}`;
  } else if (hour >= 18 && hour < 22) {
    username.innerHTML = `${loginInput.value}, ${GREETING_MSG.evening}`;
  } else {
    username.innerHTML = `${loginInput.value}, ${GREETING_MSG.night}`;
  }
}

loginForm.addEventListener("submit", handleLogin);
