const radioCategory = document.querySelectorAll("input[type='radio']"),
    inputWriteTodo = document.querySelector(".write-todo-list input"),
    buttonAddTask = document.querySelector(".btn-add-tasks"),
    containerAddTasks = document.querySelector(".add-tasks");

let arrayOfTasks = [],
    category = null;

inputWriteTodo.addEventListener("input", () => {
    document.querySelector(".write-todo-list img").setAttribute("src", "images/list-solid.svg");
    if (inputWriteTodo.value == "") {
        document.querySelector(".write-todo-list img").setAttribute("src", "images/pen-solid.svg");
    };

    if (window.innerWidth <= 550) {
        inputWriteTodo.maxLength = "25";
    } else {
        inputWriteTodo.maxLength = "45";
    };
});

// categorys radio
function categoryschoseRadio(schoscategorys) {
    schoscategorys.addEventListener("change", () => {
        category = schoscategorys.value;
        business.setAttribute("data-checked", "");
        buttonAddTask.addEventListener("click", todoListInput);
    });
};

radioCategory.forEach((schoscategorys) => categoryschoseRadio(schoscategorys));

// create error input field
const createError = document.querySelector(".write-todo-list");
let errorAddTask = document.createElement("span");
function addErrorToInputTask() {
    if (inputWriteTodo.value == "") {
        errorAddTask.className = "error-add-task";
        errorAddTask.textContent = "write a task";
        errorAddTask.classList.add("error-add-task-act");

        createError.appendChild(errorAddTask);

        setTimeout(() => {
            errorAddTask.classList.remove("error-add-task-act")
        }, 3000);
    } else if (inputWriteTodo.value !== "") {
        errorAddTask.className = "error-add-task";
        errorAddTask.textContent = "chose category";
        errorAddTask.classList.add("error-add-task-act");

        createError.appendChild(errorAddTask);

        setTimeout(() => {
            errorAddTask.classList.remove("error-add-task-act")
        }, 3000);
    };
};

buttonAddTask.addEventListener("click", addErrorToInputTask);

// add task to input field
function todoListInput() {
    if (inputWriteTodo.value != "") {
        addTasksToArray(inputWriteTodo.value);
        inputWriteTodo.value = "";
        errorAddTask.classList.remove("error-add-task-act");
    };
};

// add task to array
function addTasksToArray(taskText, index = -1) {
    const task = {
        categorys: category,
        id: Date.now(),
        title: taskText,
        copleted: false,
    };

    // push tasks to array
    if (index === -1) {
        arrayOfTasks.unshift(task);
    } else arrayOfTasks[index] = task;

    createTodoTask(arrayOfTasks);
    addDataToLocalStorageFrom(arrayOfTasks);
};

function createTodoTask(arrayOfTasks) {
    containerAddTasks.innerHTML = "";
    arrayOfTasks.forEach((task, index) => {
        // create main div
        let myDiv = document.createElement("div");
        myDiv.className = "add-item";
        myDiv.setAttribute("data-id", task.id);
        myDiv.setAttribute("data-indextask", index);
        myDiv.setAttribute("data-category", task.categorys);
        // create input checkbox
        let labelCheckBox = document.createElement("label");
        let inputCheckBox = document.createElement("input");
        inputCheckBox.type = "checkbox";
        let inputCheckBoxSpan = document.createElement("span")
        inputCheckBoxSpan.className = "radius3PX";
        labelCheckBox.append(inputCheckBox, inputCheckBoxSpan);
        // create input text todo list
        let myInputText = document.createElement("input");
        myInputText.setAttribute("type", "text");
        myInputText.className = "input-text";
        myInputText.setAttribute("value", task.title);
        myInputText.setAttribute("readonly", "");
        // create button edit and delete
        let btnsContainer = document.createElement("div");
        btnsContainer.className = "buttons-container";
        let editButton = document.createElement("span");
        editButton.innerHTML = "<img src='images/file-pen-solid.svg'></img>";
        editButton.className = "edit-button";
        let deletetButton = document.createElement("span");
        deletetButton.innerHTML = "<img src='images/trash-w.svg'></img>";
        deletetButton.className = "delete-button";
        btnsContainer.append(editButton, deletetButton);
        // task timing
        let taskTiming = document.createElement("div");
        taskTiming.className = "task-timing"
        dateTiming = new Date(task.id);
        let t = "0"
        taskTiming.textContent
            = `${dateTiming.getMonth() + 1} /
                ${dateTiming.getDate() <= 10 ? t + dateTiming.getDate() : dateTiming.getDate()} /
                ${dateTiming.getHours() <= 10 ? t + dateTiming.getHours() : dateTiming.getHours()} :
                ${dateTiming.getMinutes() < 10 ? t + dateTiming.getMinutes() : dateTiming.getMinutes()}
            `;
        // append element to the main div
        containerAddTasks.appendChild(myDiv);
        myDiv.prepend(labelCheckBox, myInputText, btnsContainer, taskTiming);
        // check if the task done
        if (task.copleted) {
            inputCheckBox.setAttribute("checked", true);
            myInputText.classList.add("done");
        }
        labelCheckBox.onchange = () => {
            myInputText.classList.toggle("done");
            task.copleted = !task.copleted
            addDataToLocalStorageFrom(arrayOfTasks);
        };
        // push input value in edit to arrayTasks
        myInputText.onblur = (e) => {
            category = task.categorys;
            let index = e.target.closest(".add-item").dataset.indextask;
            if (myInputText.value == "") {
                myInputText.value = task.title;
            } else {
                addTasksToArray(e.target.value, index);
            };
        };

        // button edit tasks
        editButton.onclick = () => {
            const end = myInputText.value.length;
            myInputText.setSelectionRange(end, end);
//             myInputText.maxLength = inputWriteTodo.maxLength;
            myInputText.removeAttribute("readonly");
            myInputText.focus();
        };

        // button delet task from page
        deletetButton.onclick = () => {
            myDiv.remove()
            if (containerAddTasks.innerHTML == "") {
                document.documentElement.style.setProperty("--mess", "")
                containerAddTasks.style.background = "var(--white-clr)";
                containerAddTasks.className = "add-tasks radius shadow";
            };
            deletTasksFromLocalStorage(myDiv.getAttribute("data-id"));
        };
        // fade animatio tasks
        if (myDiv.hasAttribute("indextask") == 0) {
            myDiv.className = "add-item show-task";
        };
        window.addEventListener("scroll", () => {
            let a = window.innerHeight / 5 * 4.6;
            let b = myDiv.getBoundingClientRect().top;
            if (b < a) {
                myDiv.classList.add("show-task");
            } else {
                myDiv.classList.remove("show-task");
            };
        });

        if (containerAddTasks != "") {
            document.documentElement.style.setProperty("--mess", " ");
            containerAddTasks.style.background = "transparent";
            containerAddTasks.className = "add-tasks";
        }

    });
};

// function delet data tasks from local storage
function deletTasksFromLocalStorage(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
};

// add data tasks to local storage
function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("data-array", JSON.stringify(arrayOfTasks));
};

// get data tasks from local storage
if (localStorage.getItem("data-array")) {
    arrayOfTasks = JSON.parse(localStorage["data-array"]);
    createTodoTask(arrayOfTasks);
};
