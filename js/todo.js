/**
 * 1. 투두에 입력
 * 2. 아래 체크아웃과 함께 리스트 생성
 */

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-form input");
const todoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";
console.log(todoInput);

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
  todo_li.appendChild(input);
  todo_li.appendChild(label);
  todoList.appendChild(todo_li);
}

function saveTodo() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {}

todoForm.addEventListener("submit", handleSubmit);
