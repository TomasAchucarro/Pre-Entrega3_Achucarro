window.onload = getTask;

let mainForm = document.getElementById("mainForm");
let mainBtn = document.getElementById("mainBtn");
let mainInput = document.getElementById("mainInput");
let boxDiv = document.getElementById("boxDiv");
mainForm.addEventListener("submit", createTask);

function createTask(e) {
  e.preventDefault();
  let inputValue = mainInput.value.toUpperCase();
  let id = Math.round(Math.random() * 1000);
  if (inputValue && inputValue.length < 25) {
    localStorage.setItem(
      "task",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("task") || "[]"),
        { id, task: inputValue },
      ])
    );
    mainInput.value = "";
    addTask(inputValue, id);
  }
}

function addTask(task, id) {
  let divTask = document.createElement("div");
  divTask.classList = "w-50 p-2 mb-4 bg-danger rounded text-center taskHover"
  divTask.innerHTML = `<div class="" id=${id} onclick=DeleteTask(this)>${task}</div>`;
  boxDiv.append(divTask);
}
function DeleteTask(e) {
  let tasks = JSON.parse(localStorage.getItem("task"));
  let newTask = tasks.filter((task) => task.id != e.id);
  localStorage.setItem("task", JSON.stringify(newTask));
  e.parentElement.remove();
}
function getTask() {
  let tasks = JSON.parse(localStorage.getItem("task"));
  tasks.map((item) => {
    addTask(item.task, item.id);
  });
}
