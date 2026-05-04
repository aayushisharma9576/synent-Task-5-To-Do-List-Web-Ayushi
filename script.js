let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function save() {
localStorage.setItem("tasks", JSON.stringify(tasks));
}
function render() {
const container = document.getElementById("taskContainer");
container.innerHTML = "";
tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = `task ${task.color}`;
    if (task.completed) div.classList.add("completed");
    div.draggable = true;
    div.innerHTML = `
    <h3>${task.text}</h3>
    <p class="time">${task.time || ""}</p>
    <p>${task.completed ? "✔ Completed" : "⏳ Pending"}</p>
    <div class="color-picker">
        <span class="yellow-btn" onclick="changeColor(${index}, 'yellow')"></span>
        <span class="green-btn" onclick="changeColor(${index}, 'green')"></span>
        <span class="blue-btn" onclick="changeColor(${index}, 'blue')"></span>
        <span class="pink-btn" onclick="changeColor(${index}, 'pink')"></span>
    </div>
    <div class="actions">
        <button onclick="toggle(${index})">✔</button>
        <button onclick="edit(${index})">✏️</button>
        <button onclick="removeTask(${index})">❌</button>
    </div>
    `;
    div.addEventListener("dragstart", () => {
    div.classList.add("dragging");
    });
    div.addEventListener("dragend", () => {
    div.classList.remove("dragging");
    });
    container.appendChild(div);
});
save();
}
function addTask() {
const text = document.getElementById("taskInput").value;
const time = document.getElementById("taskTime").value;
if (!text) return;
tasks.push({
    text,
    time,
    completed: false,
    color: "yellow"
});
render();
document.getElementById("taskInput").value = "";
document.getElementById("taskTime").value = "";
}
function removeTask(i) {
tasks.splice(i, 1);
render();
}
function toggle(i) {
tasks[i].completed = !tasks[i].completed;
render();
}
function edit(i) {
const newText = prompt("Edit Task:", tasks[i].text);
if (newText) {
    tasks[i].text = newText;
    render();
}
}
function changeColor(i, color) {
tasks[i].color = color;
render();
}
const container = document.getElementById("taskContainer");
container.addEventListener("dragover", (e) => {
e.preventDefault();
const dragging = document.querySelector(".dragging");
container.appendChild(dragging);
});
setInterval(() => {
const now = new Date();
tasks.forEach(task => {
    if (task.time && !task.completed) {
    const taskTime = new Date(task.time);
    if (Math.abs(taskTime - now) < 60000) {
        alert("⏰ Reminder: " + task.text);
    }
    }
});
}, 60000);
render();