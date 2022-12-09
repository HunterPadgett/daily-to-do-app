const form = document.getElementById("form");
const newTask = document.getElementById("newTask");
const tasks = document.getElementById("tasks");
const submit = document.getElementById("submit");
const timeOfDay = document.getElementById("timeOfDay");
// const cb = document.getElementById("checked");
const taskInput = document.getElementById("taskInput");
const todoItem = document.getElementById("todo-item");
const editBtn = document.getElementById("edit");
const deleteBtn = document.getElementById("delete");
const taskSpan = document.getElementsByClassName("taskSpan");
const todos = JSON.parse(localStorage.getItem("todos")) || [];

window.addEventListener("load", () => {
 form.addEventListener("submit", (e) => {
  e.preventDefault();

  const todo = {
   content: e.target.elements.newTask.value,
   done: false,
   createdAt: new Date().getTime(),
  };
  
  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));

  e.target.reset();
  displayTodos();
  // growTextBox();
 });
 
 displayTodos();
//  growTextBox();
 getTime();
});

function displayTodos() {
 tasks.innerHTML = "";
  
 todos.forEach((todo, index) => {
 
  const todoIndex = todos.indexOf(todo);
  
  return (tasks.innerHTML += `
      <div id="todo-item" class="">
     <div id="todo-content" class="">
      <label class="d-flex align-items-center">
       <input type="checkbox" id="checked" />
       <span id="bubble" class=""></span>
       <input type="text" id="taskInput" class="taskInput " value="${todo.content}" readonly="" data-index="${todoIndex}" />
       
      </label>
     </div>

     <div id="todo-actions" class="m-1 p-1">
      <button id="edit" class="btn">
       <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button id="delete" class="btn" data-index="${todoIndex}">
       <i class="fa-solid fa-trash"></i>
      </button>
     </div>
    </div>
    `);
  });

  const editBtns = document.querySelectorAll("#edit");
  const deleteBtns = document.querySelectorAll("#delete");
  const check = document.querySelectorAll("#checked");
  const taskInputs = document.querySelectorAll("#taskInput");

  // eventlisteners for checkboxes, edit buttons, and delete buttons

  // This way, when the editTask and deleteTask functions are called, the correct taskInput element will be passed as an argument and used in those functions.

  editBtns.forEach((button) => {
    button.addEventListener("click", () =>
    editTask(button.parentElement.parentElement.querySelector("#taskInput")))
  });

  deleteBtns.forEach((button) => {
    button.addEventListener("click", () => 
    deleteTask(button.parentElement.parentElement.querySelector("#taskInput")))
  });

  check.forEach((button) => button.addEventListener("click", () => handleCheckboxClick(button.parentElement.parentElement.querySelector("#taskInput"), button)));

  
taskInputs.forEach((taskInput) => {
  taskInput.addEventListener("input", (e) => {
    // Use e.target instead of this to reference the input element
    const input = e.target;
    // Set the width of the #taskInput element based on its scrollWidth
    input.style.width = input.scrollWidth + "px";
    console.log(input.scrollWidth);
  });
});


}

// function growTextBox() {
//   console.log("firing")
//   // get parent element that contains the #taskInput element
//   const parent = document.querySelector("#todo-item");

//   parent.addEventListener("input", (e) => {
//     // Check if the event target is a #taskInput element
//     if (e.target && e.target.id === "taskInput") {
//       // Get the taskSpan element that is a sibling of the taskInput element
//       const taskSpan = e.target.parentElement.querySelector("#taskSpan");
//       taskSpan.innerHTML = e.target.value.replace(/\s/g, "&nbsp;");
//       // Set the width of the #taskInput element based on the width of its corresponding #taskSpan element
//       e.target.style.width = taskSpan.offsetWidth + "px";
//     }
//   });
// }

function handleCheckboxClick(taskInput, checked) {
  // Get the corresponding checked element
  
  console.log(checked)

  // check if the checkbox is checked then apply necessary style
  if (checked.checked) {
    // Add the "done" class to the taskInput element if checked
    taskInput.classList.add("done")
  } else {
    // remove the "done" class to the taskInput element if checked
    taskInput.classList.remove("done")
  }
}

function deleteTask(taskInput) {
  // console.log(taskInput)
  // Remove the to-do item from the DOM
 taskInput.parentElement.parentElement.parentElement.remove();

 // Get the index of the deleted to-do item from the dataset.index property
 const index = parseInt(taskInput.dataset.index, 10);

 // Remove the to-do item from the todos array
 todos.splice(index, 1);

 // Update the todos array in local storage
 localStorage.setItem("todos", JSON.stringify(todos));
}


function editTask(taskInput) {
 
  // make the text input editable and focus on the input
  taskInput.removeAttribute("readonly");
  taskInput.focus();

  // Add an onblur event listener to the taskInput element
  taskInput.addEventListener("blur", (e) => {
    // Find the index of the edited to-do item in the todos array
    const index = e.target.dataset.index;

    // Update the content of the to-do item in the todos array
    todos[index].content = e.target.value;

    // Update the todos array in local storage
    localStorage.setItem("todos", JSON.stringify(todos));
  });
}


// function to display morning, afternoon evening
function getTime() {
 let date = new Date();
 let time = date.getHours();
//  console.log(time);

 if (time < 12) {
  timeOfDay.innerHTML = "GOOD MORNING, ";
 } else if (time >= 12 && time < 17) {
  timeOfDay.innerHTML = "GOOD AFTERNOON, ";
 } else if (time >= 17 && time <= 24) {
  timeOfDay.innerHTML = "GOOD EVENING, ";
 }
}

