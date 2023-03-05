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
  console.log(checkboxes);
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", drawLine);
  });
}

function drawLine(event) {
  console.log(event);
  if (event.target.checked === true) {
    event.target.nextSibling.classList.add("line");
  } else {
    event.target.nextSibling.classList.remove("line");
  }
  saveTodo();
}

function saveTodo() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
  console.log(event.target.parentElement.innerText);
  const li = event.target.parentElement;
  li.remove();
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  saveTodo();
}

todoForm.addEventListener("submit", handleSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  todos = parsedToDos;
  parsedToDos.forEach(printTodos);
}
