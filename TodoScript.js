let index = 0; 
let id = 1;

let createTodo = () => {
    // Get the value of the input field
    const newTodo = document.getElementById("todo-to-be-added").value;
    const todolist = document.getElementById("todolist");

    // Check if newTodo is empty
    if (!newTodo) {
        alert("Please enter a todo");
        return;
    }

    // Create a todo container
    const div = document.createElement("div");
    div.classList.add("todos");
    div.setAttribute("id", `todo-${id}`)

    /// Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn", "toggle");
    deleteBtn.setAttribute("id", `deletebtn-${id}`)
    const img = document.createElement("img")
    img.setAttribute("id", `img-${id}`)
    img.src = "bin1.png";
    deleteBtn.appendChild(img)
    // deleteBtn.addEventListener('click', deleteTodo(div.id, img.id))
    // deleteBtn.addEventListener('onmouseleave', source2(img.id))
    deleteBtn.onclick = () => deleteTodo(div.id, img.id);
    deleteBtn.onmouseleave = () => source2(img.id);
    div.appendChild(deleteBtn)

    // Create a todo list
    const ul = document.createElement("ul");
    ul.classList.add("todo-li");
    div.appendChild(ul);

    // Add a new todo item
    const li = document.createElement("li");
    ul.appendChild(li);

    const p = document.createElement("p");
    p.setAttribute("id", `todo-${id}`);
    p.classList.add("todo-p");
    p.textContent = newTodo; // Add text
    div.appendChild(p);

    // Add a checkbox
    const input = document.createElement("input");
    input.classList.add("form-check-input", "me-1", "checkbox-1");
    input.setAttribute("type", "checkbox");
    div.appendChild(input);

    // Append the todo item to the list
    todolist.appendChild(div);

    // Save to localStorage
    saveData();

    // Update the ID for the next todo
    index++;
    id++;
};

const saveData = () => {
    const todolist = document.getElementById("todolist");
    localStorage.setItem("todolist", todolist.innerHTML);
};

const showData = () => {
    const savedData = localStorage.getItem("todolist");
    if (savedData) {
        const todolist = document.getElementById("todolist");
        todolist.innerHTML = savedData;

        document.querySelectorAll(".delete-btn").forEach(button => {
            const img = button.querySelector("img");
            button.onclick = () => deleteTodo(button.parentNode.id);
            button.onmouseleave = () => source2(img.id)
        });
    }
};

const deleteTodo = (todoID, imgID) => {
    let img = document.getElementById(imgID)
    img.src = 'bin2.png'
    setTimeout(() => {
        const todo = document.getElementById(todoID)
        if(todo) {
            todo.remove();
            saveData();
        }
    }, 1500);
};

const source2 = (imgID) => {
    let img = document.getElementById(imgID)
    setTimeout(() => {
        img.src = 'bin1.png'
    }, 1500)
};

const selectDel = () => {
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.classList.toggle('toggle')
    });
};

// Load data when the page loads
showData();
