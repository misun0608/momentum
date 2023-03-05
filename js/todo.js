/**
 * 1. 투두에 입력
 * 2. 아래 체크아웃과 함께 리스트 생성
 */

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-form input");
const todoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";

let todos = [];

function handleSubmit(e) {
  e.preventDefault();
  const todoValue = todoInput.value;
  todoInput.value = "";

  const todoObj = {
    content: todoValue,
    id: Date.now(),
  };

  todos.push(todoObj);
  printTodos(todoObj);
  saveTodo();
}

function printTodos(newtodo) {
  const todo_li = document.createElement("li");
  todo_li.id = newtodo.id;
  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = newtodo.id + 1;
  const label = document.createElement("label");
  label.htmlFor = input.id;
  label.innerText = newtodo.content;

  const btn = document.createElement("button");
  btn.classList.add("delBtn");
  btn.innerText = "del";

  btn.addEventListener("click", deleteTodo);

  todo_li.appendChild(input);
  todo_li.appendChild(label);
  todo_li.appendChild(btn);
  todoList.appendChild(todo_li);

  const checkboxes = document.querySelectorAll("input[type=checkbox]");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", drawLine);
  });
}

function drawLine(event) {
  const checkedBox = event.target.id;
  if (event.target.checked === true) {
    event.target.nextSibling.classList.add("line");
    localStorage.setItem(checkedBox, JSON.stringify(event.target.checked));
  } else {
    event.target.nextSibling.classList.remove("line");
    localStorage.removeItem(checkedBox);
  }
}

function saveTodo() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
  console.log(event.target.parentElement.innerText);
  const li = event.target.parentElement;
  li.remove();
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  const keyId = String(parseInt(event.target.parentElement.id) + 1);
  localStorage.removeItem(keyId);
  saveTodo();
}

todoForm.addEventListener("submit", handleSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  todos = parsedToDos;
  parsedToDos.forEach(printTodos);
  parsedToDos.forEach(printCheck);
}

function printCheck(e) {
  const id = e.id + 1;
  const savedCheck = localStorage.getItem(String(id));
  if (savedCheck !== null) {
    const checkedInput = document.getElementById(`${id}`);
    const checkedLabel = document.querySelector(`label[for="${id}"]`);
    checkedInput.checked = true;
    checkedLabel.classList.add("line");
  }
}
