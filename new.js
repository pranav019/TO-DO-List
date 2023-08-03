// Function to display current date and time
function displayDateTime() {
  const dateTimeText = document.getElementById("datetime-text");
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const dateTime = new Date().toLocaleString("en-US", options);
  dateTimeText.textContent = dateTime;
}

// Function to add a new task
function addTask(event) {
  event.preventDefault();
  const todoInput = document.getElementById("todo-input");
  const taskTitle = todoInput.value.trim();

  if (taskTitle !== "") {
    const taskItem = createTaskItem(taskTitle);
    const todoList = document.getElementById("todo-list");
    todoList.appendChild(taskItem);

    todoInput.value = "";
    todoInput.focus();

    saveTaskToLocalStorage(taskTitle); // Save the task to local storage
  }
}

// Function to create a new task item
function createTaskItem(title) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  taskItem.appendChild(checkbox);

  const taskTitle = document.createElement("span");
  taskTitle.classList.add("task-title");
  taskTitle.textContent = title;
  taskItem.appendChild(taskTitle);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.innerHTML = "Delete";
  deleteButton.addEventListener("click", deleteTask); // Add event listener
  taskItem.appendChild(deleteButton);

  const doneButton = document.createElement("button");
  doneButton.classList.add("done");
  doneButton.innerHTML = "Done";
  doneButton.style.backgroundColor = "teal";
  doneButton.addEventListener("click", moveTaskToCompleted); // Add event listener
  taskItem.appendChild(doneButton);

  return taskItem;
}

// Function to delete a task
function deleteTask(event) {
  const taskItem = event.target.parentNode;
  const taskTitle = taskItem.querySelector(".task-title").textContent;
  taskItem.remove();
  removeTaskFromLocalStorage(taskTitle);
}

// Function to move a task to the completed section
function moveTaskToCompleted(event) {
  const taskItem = event.target.parentNode;
  const taskTitle = taskItem.querySelector(".task-title").textContent;

  taskItem.classList.add("completed");
  taskItem.querySelector(".delete").style.display = "none";
  const completedTasks = document.getElementById("completed-tasks");
  completedTasks.appendChild(taskItem);

  removeTaskFromLocalStorage(taskTitle);
  saveCompletedTaskToLocalStorage(taskTitle); // Save the completed task to local storage
}

// Function to delete multiple tasks
function deleteMultipleTasks() {
  const checkboxes = document.querySelectorAll(".checkbox");
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const taskItem = checkbox.parentNode;
      const taskTitle = taskItem.querySelector(".task-title").textContent;
      taskItem.remove();
      removeTaskFromLocalStorage(taskTitle);
    }
  });
}

//save completed task
function saveCompletedTaskToLocalStorage(taskTitle) {
  let completedTasks = localStorage.getItem("completedTasks");
  if (!completedTasks) {
    completedTasks = [];
  } else {
    completedTasks = JSON.parse(completedTasks);
  }

  completedTasks.push(taskTitle);
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

// loadCompletedTasksFromLocalStorage
function loadCompletedTasksFromLocalStorage() {
  const completedTasks = localStorage.getItem("completedTasks");
  if (completedTasks) {
    const completedTasksList = document.getElementById("completed-tasks");
    const completedTaskItems = JSON.parse(completedTasks).map((taskTitle) =>
      createTaskItem(taskTitle)
    );
    completedTasksList.append(...completedTaskItems);
  }
}

// Function to save a task to local storage
function saveTaskToLocalStorage(taskTitle) {
  let tasks = localStorage.getItem("tasks");
  if (!tasks) {
    tasks = [];
  } else {
    tasks = JSON.parse(tasks);
  }
  tasks.push(String(taskTitle)); // Convert taskTitle to a string before pushing
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// remove completed task

function removeCompletedTaskFromLocalStorage(taskTitle) {
  let completedTasks = localStorage.getItem("completedTasks");
  if (completedTasks) {
    completedTasks = JSON.parse(completedTasks);
    completedTasks = completedTasks.filter((task) => task !== taskTitle);
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  let tasks = localStorage.getItem("tasks");
  if (tasks) {
    tasks = JSON.parse(tasks);
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = ""; // Clear the todo list before loading tasks
    tasks.forEach((task) => {
      const taskItem = createTaskItem(task);
      todoList.appendChild(taskItem);
    });
  }
}

function loadCompletedTasksFromLocalStorage() {
  const completedTasks = localStorage.getItem("completedTasks");
  if (completedTasks) {
    const completedTasksList = document.getElementById("completed-tasks");
    const completedTaskItems = JSON.parse(completedTasks).map((taskTitle) =>
      createTaskItem(taskTitle)
    );
    completedTasksList.append(...completedTaskItems);
  }
}

// Function to remove a task from local storage
function removeTaskFromLocalStorage(taskTitle) {
  let tasks = localStorage.getItem("tasks");
  if (tasks) {
    tasks = JSON.parse(tasks);
    const index = tasks.indexOf(taskTitle);
    if (index !== -1) {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }
}
// function using splice
// function removeCompletedTaskFromLocalStorage(taskTitle) {
//   let completedTasks = localStorage.getItem("completedTasks");
//   if (completedTasks) {
//     completedTasks = JSON.parse(completedTasks);
//     const index = completedTasks.indexOf(taskTitle);
//     if (index !== -1) {
//       completedTasks.splice(index, 1);
//       localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
//     }
//   }
// }
// Function to clear the completed tasks

function clearCompletedTasks() {
  const completedTasks = document.querySelectorAll("#completed-tasks li");
  completedTasks.forEach((taskItem) => {
    const taskTitle = taskItem.querySelector(".task-title").textContent;
    taskItem.remove();
    removeCompletedTaskFromLocalStorage(taskTitle); // Remove the completed task from local storage
  });
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  displayDateTime();
  setInterval(displayDateTime, 1000);
  loadCompletedTasksFromLocalStorage();
  loadTasksFromLocalStorage(); // Load tasks from local storage on page load
});

const todoForm = document.getElementById("todo-form");
todoForm.addEventListener("submit", addTask);

const deleteItemsButton = document.querySelector(".delete-items");
deleteItemsButton.addEventListener("click", deleteMultipleTasks);

const deleteCompletedButton = document.getElementById("delete-multiple-btn");
deleteCompletedButton.addEventListener("click", clearCompletedTasks);
