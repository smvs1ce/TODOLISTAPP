
window.onload = loadAllTasks;
document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    addTask()
})

function loadAllTasks() {
    if (localStorage.getItem("tasks") === null) return;
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")))
    console.log(tasks)
    tasks.forEach(task => {
        const list = document.querySelector("ul")
        const li = document.createElement("li");
        li.innerHTML = `<input type="checkbox" onclick="completeTask(this) class="check" ${task.completed ? 'checked': ''} > 
        <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
        <button type="delete" class="delete" onclick="deleteTask(this)">Delete</button>
        `
        list.insertBefore(li, list.children[0]);
    });
}

function addTask() {
    const task = document.querySelector("form input");
    const list = document.querySelector('ul');
    if (task.value === "") {
        alert("Please enter some text/task...");
        return false;
    }

    const li = document.createElement("li");
    // console.log(task.value);
    localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"),{task: task.value, completed: false}]))
    li.innerHTML = `<input type="checkbox" class="check" onclick="completeTask(this)"> 
    <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
    <button type="delete" class="delete" onclick="deleteTask(this)">Delete</button>
    `
    list.insertBefore(li, list.children[0]);
    task.value = "";
}

function deleteTask(e) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    tasks.forEach(task => {
        if (task.task === e.parentNode.children[1].value) {
            tasks.splice(tasks.indexOf(task), 1)
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    e.parentElement.remove();
}

function completeTask(e) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    tasks.forEach(task => {
        if (task.task === e.nextElementSibling.value) {
            task.completed = !task.completed;
            
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    e.nextElementSibling.classList.toggle("completed")
}

var currentTask = null;
function getCurrentTask(e) {
    currentTask = e.value;
}

function editTask(e) {

    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    if (e.value === "") {
        alert("Please enter some text/task...")
        e.value = currentTask;
        return;
    }
    tasks.forEach(task => {
        if (task.task === e.value) {
            alert("Task is already present");
            e.value = currentTask;
            return;
        }
    });
    tasks.forEach(task => {
        if (task.task === currentTask) {
            task.task = e.value;
        }
    })
    localStorage.setItem("tasks", JSON.stringify(tasks))
}



