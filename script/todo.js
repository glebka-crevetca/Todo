const form = document.querySelector("#form");
const taskInput = document.querySelector("#input");
const taskList = document.querySelector("#task-list");
const emptyList = document.querySelector("#empty-list");
const linesContainer = document.querySelector("#empty-lines");
const LINES_KEY = "todo-lines";
const MAX_LINES = 7;

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    const cssClass = task.done ? "task-title task-title--done" : "task-title";

    const taskHtml = `
                <li id="${task.id}" class="list-group-item">
                    <span class="${cssClass}"><p class='count'></p> ${
      task.text
    }</span>
                    <div class="group-item-button">
                        <button type="button" data-action="done" class="btn-action done ${
                          task.done ? "active" : ""
                        }">
							<img src="icons/done.svg" alt="Done">
						</button>
						<button type="button" data-action="delete" class="btn-action delete">
							<img src="icons/delete.svg" alt="Done">
						</button>
                    </div>
                </li>`;
    taskList.insertAdjacentHTML("beforeend", taskHtml);
  });

  counterTasks();
  checkEmptyList();
  restoreLines();
});

//checkEmptyList();

form.addEventListener("submit", addTask);
form.addEventListener("reset", deleteDoneTasks);

taskList.addEventListener("click", deleteTask);
taskList.addEventListener("click", doneTask);

function addTask(event) {
  event.preventDefault();

  const tasksCounter = taskList.children.length;

  const taskText = ". " + taskInput.value;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  tasks.push(newTask);

  const cssClass = newTask.done ? "task-title task-title--done" : "task-title";

  const taskHtml = `
                <li id="${newTask.id}" class="list-group-item">
                    <span class="${cssClass}"><p class='count'></p> ${newTask.text}</span>
                    <div class="group-item-button">
                        <button type="button" data-action="done" class="btn-action done">
							<img src="icons/done.svg" alt="Done">
						</button>
						<button type="button" data-action="delete" class="btn-action delete">
							<img src="icons/delete.svg" alt="Done">
						</button>
                    </div>
                </li>`;
  taskList.insertAdjacentHTML("beforeend", taskHtml);

  taskInput.value = "";

  counterTasks();

  checkEmptyList();
  saveLocalStorage();
  updateEmptyLines();
}

function deleteTask(event) {
  if (event.target.dataset.action !== "delete") {
    return;
  }

  const parentNode = event.target.closest(".list-group-item");

  const id = parentNode.id;

  tasks = tasks.filter((task) => task.id != id);

  parentNode.remove();

  const tasksCounter = taskList.children.length;

  counterTasks();

  checkEmptyList();
  saveLocalStorage();
  updateEmptyLines();
}

function doneTask(event) {
  if (event.target.dataset.action !== "done") {
    return;
  }

  const btnDone = event.target.closest(".done");
  btnDone.classList.toggle("active");

  const parentNode = event.target.closest(".list-group-item");

  const taskTitle = parentNode.querySelector(".task-title");
  taskTitle.classList.toggle("task-title--done");

  const id = parentNode.id;

  const task = tasks.find((task) => task.id == id);

  task.done = !task.done;

  saveLocalStorage();

  counterTasks();
}

function deleteDoneTasks(event) {
  event.preventDefault();

  tasks = tasks.filter((task) => !task.done);

  document.querySelectorAll(".btn-action.done.active").forEach((btn) => {
    btn.closest(".list-group-item").remove();
  });

  counterTasks();
  checkEmptyList();
  saveLocalStorage();

  const currentTasks = taskList.querySelectorAll("li:not(#empty-list)").length;
  const emptyLines = linesContainer.querySelectorAll(".empty-line");
  const neededLines = Math.max(0, 7 - currentTasks);

  emptyLines.forEach((line, index) => {
    index < neededLines
      ? line.classList.remove("none")
      : line.classList.add("none");
  });

  updateEmptyLines();
}

function counterTasks() {
  const allTasks = taskList.querySelectorAll("li.list-group-item");

  Array.from(allTasks).forEach((item, index) => {
    const countTask = item.querySelector("p.count");
    countTask.textContent = index + 1;
  });
}

function checkEmptyList() {
  if (tasks.length === 0) {
    const emptyListHTML = `<li id="empty-list" class="list-empty">
                    <div class="empty-list-title"><p>Дел нет, можно немного отдохнуть</p></div>
                </li>`;
    taskList.insertAdjacentHTML("afterbegin", emptyListHTML);
  } else {
    const emptyListEl = document.querySelector("#empty-list");
    emptyListEl ? emptyListEl.remove() : null;
  }
}

function saveLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateEmptyLines() {
  const currentTasks = taskList.querySelectorAll("li:not(#empty-list)").length;
  const neededLines = Math.max(0, MAX_LINES - currentTasks);

  linesContainer.innerHTML = "";

  for (let i = 0; i < neededLines; i++) {
    const line = document.createElement("div");
    line.classList.add("empty-line");
    linesContainer.appendChild(line);
  }

  localStorage.setItem(LINES_KEY, neededLines.toString());
}

function restoreLines() {
  const savedLines = localStorage.getItem(LINES_KEY);
  const linesCount = savedLines ? parseInt(savedLines) : MAX_LINES;

  linesContainer.innerHTML = "";
  for (let i = 0; i < linesCount; i++) {
    const line = document.createElement("div");
    line.classList.add("empty-line");
    linesContainer.appendChild(line);
  }
}
