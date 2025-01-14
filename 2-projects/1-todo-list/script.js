function addDateElement() {
  const rightFormEl = document.querySelector(".col-auto");
  const createLabel = document.createElement("label");
  createLabel.htmlFor = "endDate";
  createLabel.textContent = "End Date:";
  const createInput = document.createElement("input");
  createInput.type = "date";
  createInput.id = "endDate";
  createInput.name = "todo-end";
  createInput.min = new Date().toISOString().slice(0, 10);
  const createBtn = document.createElement("button");
  createBtn.type = "button";
  createBtn.classList = "btn-close";
  createBtn.id = "endDateCloseBtn";
  rightFormEl.append(createLabel, createInput, createBtn);
}

addDateElement();

const list = document.getElementById("todo-list");
const endDateEl = document.querySelector("#endDate");
const todoInputEl = document.querySelector("#todoInput");

function populateTodoList(todos) {
  todos.forEach((x) => {
    createToDo(x);
  });
}
function createToDo(todo) {
  const createLi = document.createElement("li");
  createLi.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );

  createLi.textContent = todo.task;

  const createRightDiv = document.createElement("div");
  createRightDiv.classList.add("d-flex", "align-items-center");

  const dayLeft = document.createElement("span");
  dayLeft.classList.add("badge", "bg-primary");

  const daysLeft = Math.abs(
    Math.floor((new Date() - new Date(todo.date)) / 24 / 60 / 60 / 1000)
  );
  dayLeft.textContent = todo.date
    ? `${daysLeft} ${daysLeft === 1 ? `day` : `days`} left`
    : "";

  const tickIcon = document.createElement("i");
  tickIcon.classList.add("fa", "fa-check");
  tickIcon.onclick = () => toggleOneTask(createLi);

  const binIcon = document.createElement("i");
  binIcon.classList.add("fa", "fa-trash");
  binIcon.onclick = () => deleteOneTask(createLi);

  createRightDiv.append(dayLeft, tickIcon, binIcon);
  createLi.append(createRightDiv);
  list.append(createLi);
}

let todos = [
  { task: "Wash the dishes", completed: false },
  { task: "Do the shopping", completed: false },
];

populateTodoList(todos);

function addNewTodo(event) {
  event.preventDefault();

  //---if empty value and only space, will not add todo
  const hasTodoInput = todoInputEl.value.trim();
  if (!hasTodoInput) {
    return;
  }
  const { value: task } = todoInputEl;
  const endDateValue = endDateEl.value || null;
  createToDo({
    task,
    completed: false,
    date: endDateValue,
  });
  todoInputEl.value = null;
  clearDate();
}
const AddTodoBtn = document.querySelector(".btn");
AddTodoBtn.addEventListener("click", addNewTodo);
function toggleOneTask(li) {
  if (!li.style.textDecoration) {
    li.style.textDecoration = "line-through";
  } else {
    li.style.textDecoration = null;
  }
}
function deleteOneTask(li) {
  list.removeChild(li);
}

function deleteAllCompletedTodos(e) {
  e.preventDefault();
  const completedTodos = [...document.querySelectorAll("li")].filter(
    (li) => li.style.textDecoration === "line-through"
  );
  completedTodos.forEach((li) => list.removeChild(li));
}

document.querySelector("#endDateCloseBtn").addEventListener("click", clearDate);
function clearDate() {
  endDateEl.value = null;
}
document
  .querySelector("#remove-all-completed")
  .addEventListener("click", deleteAllCompletedTodos);
