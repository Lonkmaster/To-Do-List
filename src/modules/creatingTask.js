import {dom} from "./dom";
import { starPressed, deleteTask, editBtn, onEdit} from "./editingTask";
import { saveToLocalStorage } from "./localStorage";

const listenerEvent = ()=> {
    dom.taskFormBtn.addEventListener("click", () =>  {
        dom.taskFormContainer.style.display = "block";
        dom.taskFormBtn.style.display = "none";
    });  
    
    dom.taskSubBtn.addEventListener("click", () => {
        event.preventDefault();

        if (isEditing == true) {
            isEditing = false;
            editBtn(dom.selectedTask);
            dom.taskFormContainer.style.display = "none";
            dom.taskFormBtn.style.display = "display";
        } else if (!addTask()) {
            return;
        }

        dom.taskFormBtn.style.display = "flex";
        dom.newTaskTitle.value = "";
        dom.newTaskDescription.value = "";
    });

    dom.taskCancelBtn.addEventListener("click", () => {
        dom.newTaskTitle.value = "";
        dom.newTaskDescription.value = "";
        dom.taskFormContainer.style.display = "none";
        isEditing = false
        dom.taskFormBtn.style.display = "flex";

    });
};

let isEditing = false;
let defaultId = loadDefaultId();

function saveDefaultId() {
    localStorage.defaultId = JSON.stringify(defaultId);
}

function loadDefaultId() {
    if (localStorage.defaultId == undefined) {
        return 1;
    }
    return JSON.parse(localStorage.defaultId);
}

function createTask(title, description, date, id) {
    this.title = title;
    this.description = description;
    this.star = false;
    this.date = date;
    this.id = id;
}

const addTask = () => {
    let title = dom.newTaskTitle.value;
    let description = dom.newTaskDescription.value;
    let dueDate = dom.dueDate.value;

    if (title == "" && description == "") {
        alert("title and description must be filled in");
        return false;
    } else {
        let currentProject = dom.selectedProject;
        let taskId = defaultId;
        defaultId++;

        let task = new createTask(title, description, dueDate, taskId);

        console.log(dom.selectedProject);
        dom.selectedProject.tasks.push(task);
        displayTask(task);
        dom.taskFormContainer.style.display = "none";
        saveToLocalStorage();
        saveDefaultId();   
        return true;
    }
};

function displayTask(task) {
    let mainTaskDiv = document.createElement("div");
    mainTaskDiv.classList.add("mainTaskDiv");
    mainTaskDiv.id = `task${task.id}`;
    dom.taskContainer.appendChild(mainTaskDiv);

    const textPackage = document.createElement("div");
    textPackage.classList.add("textPackage");
    mainTaskDiv.appendChild(textPackage)

    const taskTitle = document.createElement("div");
    taskTitle.classList.add("taskTitle");
    taskTitle.textContent = task.title;
    textPackage.appendChild(taskTitle);

    const taskDescription = document.createElement("div");
    taskDescription.classList.add("taskDescription");
    taskDescription.textContent = task.description;
    textPackage.appendChild(taskDescription);

    const iconContainer = document.createElement("div");
    iconContainer.classList.add("iconContainer")
    mainTaskDiv.appendChild(iconContainer);

    const dueDateContainer = document.createElement("div");
    dueDateContainer.classList.add("dueDateContainer");
    iconContainer.appendChild(dueDateContainer);

    const dueDateValue = document.createElement("div");
    dueDateValue.textContent = task.date;
    dueDateContainer.appendChild(dueDateValue);

    const starIcon = document.createElement("div");
    starIcon.addEventListener("click", starPressed);
    starIcon.classList.add("starIcon");
    starIcon.id = "on";
    starIcon.value = task.id;
    starIcon.style.display = "none"

    iconContainer.appendChild(starIcon);

    let starIconOff = document.createElement("div");
    starIconOff.addEventListener("click", starPressed);
    starIconOff.classList.add("starIconOff");
    starIconOff.id = "off";
    starIconOff.value = task.id;
    iconContainer.appendChild(starIconOff);

    if (task.star == true) {
        starIconOff.style.display = "none";
        starIcon.style.display = "flex";
    } else {
        starIconOff.style.display = "flex";
        starIcon.style.display = "none";
    }

    const editContainer = document.createElement("div");
    editContainer.classList.add("editContainer");
    iconContainer.appendChild(editContainer);
    
    const threeDotsIcon = document.createElement("div");
    threeDotsIcon.classList.add ("taskDots");
    threeDotsIcon.addEventListener("click", () => {
        if(editFlex == "none") {
            editOptions.style.display = "flex";
            editFlex = editOptions.style.display = "flex"
        } else {
            editOptions.style.display = "none";
            editFlex = editOptions.style.display = "none"
        }
    });
    editContainer.appendChild(threeDotsIcon);

    const editOptions = document.createElement("div");
    editOptions.classList.add("editOptions");
    let editFlex = editOptions.style.display = "none";
    editContainer.appendChild(editOptions);

    const editBtn = document.createElement("button");
    editBtn.classList.add("taskEditBtn")
    editBtn.textContent = "Edit";
    editBtn.value = task.id;
    editOptions.appendChild(editBtn);
    editBtn.addEventListener("click", onEdit);
    editBtn.addEventListener("click", () => {
        isEditing = true;
    })

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("taskDeleteBtn");
    deleteBtn.textContent = "Delete";
    deleteBtn.value = task.id;
    editOptions.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", deleteTask);


}


/// html task renderer



export {listenerEvent, displayTask, addTask};