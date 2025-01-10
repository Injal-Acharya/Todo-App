let id = 1;

let createTodo = () => {
    // Get the value of the input field
    const newTodo = document.getElementById("todo-to-be-added").value;
    const todolist = document.getElementById("todolist");

    // Check if newTodo is empty
    if (!newTodo) {
        alert("Please enter a todo");
        return;
    };

    const todoDivs = document.querySelectorAll(".todos");
    id = todoDivs. length > 0 ? parseInt(todoDivs[todoDivs.length - 1].id.split('-')[1]) + 1 : 1;

    // Create a todo container
    const div = document.createElement("div");
    div.classList.add("todos");
    div.setAttribute("id", `todo-${id}`);

    /// Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn", "toggle");
    deleteBtn.setAttribute("id", `deletebtn-${id}`)
    const img = document.createElement("img");
    img.setAttribute("id", `img-${id}`)
    deleteBtn.appendChild(img);
    img.src = "bin1.png";
    // console.log(img.id)
    deleteBtn.onmouseover = () => source1(img.id);
    deleteBtn.onclick = () => deleteTodo(div.id);
    deleteBtn.onmouseleave = () => source2(img.id);
    div.appendChild(deleteBtn);

    // Create a todo list
    const ul = document.createElement("ul");
    ul.classList.add("todo-li");
    div.appendChild(ul);

    // Add a new todo item
    const li = document.createElement("li");
    ul.appendChild(li);

    const p = document.createElement("p");
    p.setAttribute("id", `todop-${id}`);
    p.classList.add("todo-p");
    p.textContent = newTodo; // Add text
    div.appendChild(p);

    // Add a checkbox
    const selectbtn = document.createElement("button");
    selectbtn.classList.add("select-btn");
    selectbtn.onclick = () => checkmarkToggle(div.id);
    div.appendChild(selectbtn);

    const span = document.createElement("span");
    span.innerHTML = `&#10004;`;
    span.setAttribute("id", `span-${id}`);
    span.classList.add(`toggle`);
    selectbtn.appendChild(span);

    // Append the todo item to the list
    todolist.appendChild(div);

    // Save to localStorage
    saveData();

    // Update the ID for the next todo
    id++;

    empty();
};

const empty = () => {
    document.getElementById('todo-to-be-added').value = "";
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

        const todoDivs = document.querySelectorAll(".todos");
        id = todoDivs. length > 0 ? parseInt(todoDivs[todoDivs.length - 1].id.split('-')[1]) + 1 : 1;
        
        document.querySelectorAll(".delete-btn").forEach(button => {
            const img = button.querySelector("img");
            button.onmouseover = () => source1(img.id);
            button.onclick = () => deleteTodo(button.parentNode.id, img.id);
            button.onmouseleave = () => source2(img.id);
        });

        document.querySelectorAll(".select-btn").forEach(button => {
            button.onclick = () => checkmarkToggle(button.parentNode.id);
        })
    }
};

const deleteTodo = (todoID) => {

    setTimeout(() => {
        const todo = document.getElementById(todoID)
        if(todo) {
            todo.remove();
            saveData();
        }
    }, 1000);
};

const source1 = (imgID) => {
    let img = document.getElementById(imgID)
    if(img) {
        img.src = 'bin2.png'
    }   
};

const source2 = (imgID) => {
    setTimeout(() => {
        let img = document.getElementById(imgID)
        if(img) {
            img.src = 'bin1.png'
        }    
    }, 1000);
};

const selectDel = () => {
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.classList.toggle('toggle')
    });
    document.querySelectorAll(".CreateDelete").forEach(btn => {
        if(btn.id !== 'Delete') {
            btn.disabled = btn.disabled == true? false:true;
        }
        if(btn.id === 'Delete') {
            btn.classList.toggle('bgtoggle');
        }
    });
    document.querySelectorAll(".select-btn").forEach(btn => {
        btn.disabled = btn.disabled == true? false:true;
    });
};

const checkmarkToggle = (todoID) => {
    const span = document.getElementById(todoID).lastElementChild.firstElementChild;
    span.classList.toggle('toggle');
    saveData();
}

// Load data when the page loads
showData();
