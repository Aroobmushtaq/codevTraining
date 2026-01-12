
let todo = JSON.parse(localStorage.getItem("todo")) || [];
let editIndex = -1; 

// Add or Update Todo
function addtodo() {
    let titleInput = document.getElementById("todoTitle");
    let locationInput = document.getElementById("todoLocation");
    let descriptionInput = document.getElementById("todoDescription");

    let title = titleInput.value;
    let location = locationInput.value;
    let description = descriptionInput.value;

    if (title === "" || location === "" || description === "") return;

    if (editIndex !== -1) {
        todo[editIndex].title = title;
        todo[editIndex].location = location;
        todo[editIndex].description = description;
        editIndex = -1;
        document.getElementById("addBtn").innerText = "Add Todo";
    } else {
        todo.push({ title, location, description });
    }

    saveTodo();
    displaytodo();

    titleInput.value = "";
    locationInput.value = "";
    descriptionInput.value = "";
}

// Save todos 
function saveTodo() {
    localStorage.setItem("todo", JSON.stringify(todo));
}


function displaytodo() {
    let tbody = document.getElementById("todoList");
    tbody.innerHTML = ""; // clear table first
    if (todo.length === 0) {
        // Show a single row saying "No todos"
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.colSpan = 4; // span across all table columns
        td.className = "text-center";
        td.innerText = "No todos added yet";
        tr.appendChild(td);
        tbody.appendChild(tr);
        return; // stop here, no more rows
    }

    for (let i = 0; i < todo.length; i++) {
        let tr = document.createElement("tr");

        // Title
        let tdTitle = document.createElement("td");
        tdTitle.innerText = todo[i].title;
        tr.appendChild(tdTitle);

        // Location
        let tdLocation = document.createElement("td");
        tdLocation.innerText = todo[i].location;
        tr.appendChild(tdLocation);

        // Description
        let tdDescription = document.createElement("td");
        tdDescription.innerText = todo[i].description;
        tr.appendChild(tdDescription);

        // Actions
        let tdActions = document.createElement("td");

        // Edit button
        let editButton = document.createElement("button");
        editButton.className = "btn btn-primary btn-sm me-2";
        editButton.innerText = "Edit";
        editButton.onclick = function () {
            editTodo(i);
        };

        // Delete button
        let deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.innerText = "Delete";
        deleteButton.onclick = function () {
            deleteTodo(i);
        };

        tdActions.appendChild(editButton);
        tdActions.appendChild(deleteButton);
        tr.appendChild(tdActions);

        tbody.appendChild(tr);
    }
}

// Edit Todo: fill inputs with selected todo
function editTodo(index) {
    document.getElementById("todoTitle").value = todo[index].title;
    document.getElementById("todoLocation").value = todo[index].location;
    document.getElementById("todoDescription").value = todo[index].description;

    editIndex = index;
    document.getElementById("addBtn").innerText = "Update Todo";
}

// Delete Todo
function deleteTodo(index) {
    todo.splice(index, 1);
    saveTodo();
    displaytodo();
}

// Show todos on page load
displaytodo();
