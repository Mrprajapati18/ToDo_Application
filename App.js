const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos = getTodos();
updateToDoList();

todoForm.addEventListener('submit', function(e){
  e.preventDefault();
  addToDo();
});

function addToDo(){
  const todoText = todoInput.value.trim();
  if(todoText.length > 0){
    allTodos.push(todoText);
    updateToDoList();
    saveTodos();
    todoInput.value = "";
  }
}
function updateToDoList(){
  todoListUL.innerHTML = "";
  allTodos.forEach((todo, todoIndex)=>{
    todoItem = createTodoItem(todo, todoIndex);
    todoListUL.append(todoItem);
  })
}
function createTodoItem(todo, todoIndex){
  const todoId = "todo-"+todoIndex;
  const todoLI = document.createElement("li");
  todoLI.className = "todo";
  todoLI.innerHTML = `
  <input type="checkbox" id="${todoId}">
      <label class="custom-checkbox" for="${todoId}">
        <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
      </label>
      <label class="todo-text" for="${todoId}">
       ${todo}
      </label>

      <button class="edit-button">
        <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
      </button>

      <button class="delete-button">
        <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
      </button>
  `
  const deleteButton = todoLI.querySelector(".delete-button");
  deleteButton.addEventListener("click", ()=>{
    deleteTodoItem(todoIndex);
  })
  return todoLI;
}
function deleteTodoItem(todoIndex){
  allTodos = allTodos.filter((_, i)=> i !== todoIndex);
  saveTodos();
  updateToDoList();
}
function saveTodos(){
  const todosjson = JSON.stringify(allTodos);
  localStorage.setItem("todos", todosjson);
}
function getTodos() {
  const todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
}

