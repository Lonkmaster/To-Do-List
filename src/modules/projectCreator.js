import {dom, setEdit,} from "./dom";
import { displayTask } from "./creatingTask";
import { saveToLocalStorage } from "./localStorage";

function selectProject(id) {
    console.log(dom.projects);
    let project = dom.projects.find((project)=> {
        return id == project.index
    });
    dom.selectedProject = project;
    dom.taskContainer.innerHTML = "";
    if (!dom.projects || dom.selectedProject == null) {
        return
    }
    dom.taskFormBtn.style.display = "flex";

    for(let i = 0; i < dom.selectedProject.tasks.length; i++) {
        let task = dom.selectedProject.tasks[i]; 
        displayTask(task);
        
    }
    dom.titlePanelChange.textContent = dom.selectedProject.title;
}

function onThisWeekSelected() {
    dom.taskFormBtn.style.display = "none";
    dom.titlePanelChange.textContent = "This Week";
    let dateOfThisWeek = new Date();
    dom.taskContainer.innerHTML = "";
    for(let i = 0; i < dom.projects.length; i++) {
        let currentProject = dom.projects[i];
        for(let j = 0; j < currentProject.tasks.length; j++) {
            let currentTask = currentProject.tasks[j];
            let currentTaskDate = new Date(currentTask.date);

            if(currentTaskDate.getUTCDate() - dateOfThisWeek.getUTCDate() <= 7) {
                displayTask(currentTask);
            }
        }
    }
}

function onTodaySelected() {
    dom.taskFormBtn.style.display = "none";
    dom.titlePanelChange.textContent = "Today";
    let dateOfToday = new Date();
    dom.taskContainer.innerHTML = "";
    console.log(dateOfToday)
    for(let i = 0; i < dom.projects.length; i++) {
        let currentProject = dom.projects[i];
        for(let j = 0; j < currentProject.tasks.length; j++) {
            let currentTask = currentProject.tasks[j];
            let currentTaskDate = new Date(currentTask.date);

            if(currentTaskDate.getUTCDate() == dateOfToday.getUTCDate()) {
                displayTask(currentTask);

            }

        }

    }
}

function onImportantSelected() {
    let vaildTasks = [];
    dom.titlePanelChange.textContent = "Important";
    dom.taskFormBtn.style.display = "none";
    dom.taskContainer.innerHTML = "";
    for(let i = dom.importantTasks.length - 1; i >= 0; i--) {
        let reference = dom.importantTasks[i];
        let project = dom.projects.find((project) => project.index == reference.index);
        if (project == undefined) {
            dom.importantTasks.splice(i, 1);
            console.log("project was not found");
            continue;
        }
        let task = project.tasks.find((task) => task.id == reference.id);
        if (task == undefined) {
            dom.importantTasks.splice(i, 1);
            console.log("the task was not found");
            continue;
        }
        vaildTasks.push(task);
    }
    for (let i = vaildTasks.length - 1; i >= 0; i--) {
        displayTask(vaildTasks[i]);
        
        
    }
}

function onEditProject(index){

    let projectNameDiv = document.getElementById(`projects${index}`);
    let editContainer = document.createElement("div");
    editContainer.classList.add("projectEditContainer");
    editContainer.id = `projectEditContID${index}`;
    projectNameDiv.appendChild(editContainer);
    

    let inputField = document.createElement("input");
    inputField.id = "ProjectRenameInput";
    editContainer.appendChild(inputField);

    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("formButton");
    editContainer.appendChild(buttonContainer);

    let submitButton = document.createElement("button");
    submitButton.textContent = "Rename";
    submitButton.classList.add("renameSubmitBtn");
    buttonContainer.appendChild(submitButton);
    submitButton.addEventListener("click", ()=> {
        let thisProject = dom.projects.find((project)=> project.index == index);
        thisProject.title = inputField.value;
        let projectTitle =  thisProject.title;
        let getIdName = document.getElementById(`projects${index}`);
        getIdName.firstChild.textContent = projectTitle;
        editContainer.style.display = "none";
        dom.titlePanelChange.textContent = projectTitle;
        saveToLocalStorage()
        let dynamicDiv = document.getElementById(`projectEditContID${index}`);
        dynamicDiv.remove();
    })

    let cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("renameCancelBtn");
    buttonContainer.appendChild(cancelButton);

    cancelButton.addEventListener("click", () => {
        projectNameDiv.removeChild(editContainer)
    })


}

let projectId = loadDefaultId();

function saveProjectId(){
    localStorage.projectId = JSON.stringify(projectId);
}

function loadDefaultId() {
    if (localStorage.projectId == undefined) {
        return 0;
    }
    return JSON.parse(localStorage.projectId);
}

function addProjectInput() {
    let projectIdNum = projectId;
    projectId++;
    let projectName = dom.titleProject.value;
    const newProject = new projectCreator(projectName, projectIdNum);
    dom.projects.push(newProject);
    displayProject(newProject);
    selectProject(newProject.index);
    saveToLocalStorage();
    saveProjectId();
}

function projectCreator(title, index) {
    this.title = title;
    this.tasks = [];
    this.index = index;
}

function deleteProjectBtn(index) {
    let children = dom.projectTitleCollection.children;

    for(let i = 0; i < children.length; i++) {
        let currentChild = children[i];

        if (currentChild.id == `projects${index}`) {
            dom.projectTitleCollection.removeChild(currentChild);
            break;
        }
    }
    let arrayIndex = dom.projects.findIndex((project)=> {
        return project.index == index 
    });
    dom.projects.splice(arrayIndex, 1);
    dom.taskFormBtn.style.display = "none"
    dom.titlePanelChange.textContent = ""
    saveToLocalStorage();
}

const displayProject = (project) => {

    let projectTitle = project.title;
    const container = document.createElement("div");
    dom.titlePanelChange.textContent = project.title;

    container.classList.add("listTitle");
    container.id = `projects${project.index}`;
    container.addEventListener("click", function() {
        selectProject(this.id.slice(8));
    });
    
    dom.projectTitleCollection.appendChild(container);

    let textWrapper = document.createElement("div");
    container.appendChild(textWrapper);
    textWrapper.innerHTML = projectTitle;

    let projectOptions = document.createElement("div");
    projectOptions.classList.add("projectOptions");
    projectOptions.textContent = "dots";
    container.appendChild(projectOptions);
    projectOptions.addEventListener("click", ()=> {
        if(projEditCon.style.display == "none") {
            let dynamicDiv = document.getElementById(`projectEditContID${project.index}`);
            if(dynamicDiv == null || dynamicDiv.style.display == "none") {
                projEditCon.style.display = "flex";
                console.log(dynamicDiv)
            }
        } else {
            projEditCon.style.display = "none";
        }
        
    });
    
    let projEditCon = document.createElement("div");
    projEditCon.style.display = "none";
    projEditCon.classList.add("projEditCon");
    projectOptions.appendChild(projEditCon);

    let renameProject = document.createElement("button");
    renameProject.value = project.index;
    renameProject.classList.add("renameProject");
    renameProject.textContent = "Rename";
    renameProject.addEventListener("click", () => {
        setEdit();
        dom.selectedProject = dom.projects.find((other)=> other.index == project.index);
        onEditProject(project.index);

    }) 
    projEditCon.appendChild(renameProject);

    let deleteProject = document.createElement("button");
    deleteProject.value = project.index;
    deleteProject.classList.add("deleteProject");
    deleteProject.textContent = "Delete";
    deleteProject.addEventListener("click", ()=> {
        let deleteValue = deleteProject.value;
        deleteProjectBtn(deleteValue);
    })
    projEditCon.appendChild(deleteProject);

    
};

export {addProjectInput, selectProject, onImportantSelected, onTodaySelected, onThisWeekSelected, displayProject};