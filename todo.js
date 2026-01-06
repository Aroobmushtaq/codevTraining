let todo = JSON.parse(localStorage.getItem("todo")) || [];
function addtodo() {
    let title = document.getElementById("todoTitle").value;
    let location = document.getElementById("todoLocation").value;
    let description = document.getElementById("todoDescription").value;
    if (title == "" || location == "" || description == "") return;
    todo.push({
        title: title,
        location: location,
        description: description
    });
    saveTodo();
    displaytodo();
    document.getElementById("todoTitle").value = "";
    document.getElementById("todoLocation").value = "";
    document.getElementById("todoDescription").value = "";
}
function saveTodo() {
    localStorage.setItem("todo", JSON.stringify(todo));
}
function displaytodo() {
    let todoList = document.getElementById("todoList");
    todoList.innerHTML = "";
    
    for (let i = 0; i < todo.length; i++) {
        let li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `<strong>Title:</strong> ${todo[i].title}, <strong>Location:</strong> ${todo[i].location}, <strong>Description:</strong> ${todo[i].description}`;
        let buttonDiv = document.createElement("div");
        buttonDiv.className = "mt-2"; 
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.onclick = function () {
            deleteTodo(i);
        };
        li.appendChild(deleteButton);
        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.className = "btn btn-primary btn-sm ms-2";
        editButton.onclick = function () {
            editTodo(i);
        };
        li.appendChild(editButton);
        todoList.appendChild(li);
        buttonDiv.appendChild(deleteButton);
        buttonDiv.appendChild(editButton);
        li.appendChild(buttonDiv);
    }
}
function deleteTodo(index) {
    todo.splice(index, 1);
    saveTodo();
    displaytodo();
}

function editTodo(index) {
    let newTitle = prompt("Enter new title:", todo[index].title);
    let newLocation = prompt("Enter new location:", todo[index].location);
    let newDescription = prompt("Enter new description:", todo[index].description);
    todo[index].title = newTitle;
    todo[index].location = newLocation;
    todo[index].description = newDescription;
    saveTodo();
    displaytodo();
}
displaytodo();  
