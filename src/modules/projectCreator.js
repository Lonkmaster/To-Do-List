import {dom} from "./dom";
import { displayTask } from "./creatingTask";

function selectProject(id) {
    let project = dom.projects[id];
    dom.selectedProject = project;
    console.log(project.tasks);
    dom.taskContainer.innerHTML = "";
    for(let i = 0; i < dom.selectedProject.tasks.length; i++) {
        let task = dom.selectedProject.tasks[i];
        displayTask(task);
    }
}

function onImportantSelected() {
    let vaildTasks = [];
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

function addProjectInput() {
    let projectIdNum = dom.projectTitleCollection.childElementCount;
    let projectName = dom.titleProject.value;
    const newProject = new projectCreator(projectName, projectIdNum);
    dom.projects.push(newProject);
    displayProject(newProject);
}

function projectCreator(title, index) {
    this.title = title;
    this.tasks = [];
    this.index = index;
}

const displayProject = (project) => {
    let projectTitle = project.title;
    const container = document.createElement("div");

    container.classList.add("listTitle");
    container.id = `projects${project.index}`;
    container.addEventListener("click", function() {
        selectProject(this.id.slice(-1));
    });

    dom.projectTitleCollection.appendChild(container);
    container.innerHTML = projectTitle;
    
};

export {addProjectInput, selectProject, onImportantSelected,};