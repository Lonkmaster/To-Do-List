import { addTask } from "./creatingTask";
import {addProjectInput, selectProject, onImportantSelected,} from "./projectCreator";

console.log("DOM loaded");

let dom = (() => {;
    let dom = {};
    dom.projectContainer = document.querySelector(".projectContainer");
    dom.leftPanel = document.querySelector(".leftPanel");
    dom.addProjectButton = document.querySelector(".addProject");
    dom.showprojectform = document.querySelector(".showprojectform");
    dom.titleProject = document.querySelector("#titleProject");
    dom.projectSub = document.querySelector(".projectSub");
    dom.projectCancel = document.querySelector(".projectCancel");
    dom.projectTitleCollection = document.querySelector(".projectTitleCollection");
    dom.taskFormContainer = document.querySelector(".taskFormContainer");
    dom.taskFormBtn = document.querySelector(".taskFormBtn");
    dom.taskSubBtn = document.querySelector(".taskSubBtn");
    dom.taskCancelBtn = document.querySelector(".taskCancelBtn");
    dom.newTaskTitle = document.querySelector("#newTaskTitle");
    dom.newTaskDescription = document.querySelector("#newTaskDescription");
    dom.listTodos = document.querySelector(".listTodos");
    dom.taskContainer = document.querySelector(".taskContainer");
    dom.dueDate = document.querySelector("#dueDate");
    dom.important = document.getElementById("important");
    dom.projects = [];
    dom.importantTasks = [];
    dom.selectedProject = null;
    dom.selectedTask = -1;

    dom.important.addEventListener("click", onImportantSelected);
    
    return dom;
})();



(function firstRuntimeProject() {
    dom.titleProject.value = "Clean House";
    
    let exampleTask = {
        title: "Clean House Well",
        description: "Clean the bedroom",
        id: 0,
    };

    addProjectInput();
    dom.projects[0].tasks.push(exampleTask);
    dom.titleProject.value = "";
    selectProject(0);
})();

function buttonProjectFormSetup() {
    dom.addProjectButton.addEventListener("click", ()=> {
        if (dom.showprojectform.style.display === "none") {
            dom.showprojectform.style.display = "block";
        } else {
            dom.showprojectform.style.display = "block";
        };
    });

    dom.projectSub.addEventListener("click", ()=> {
        event.preventDefault();
        addProjectInput();
        dom.showprojectform.style.display = "none";
        dom.titleProject.value = "";
    });
    
    dom.projectCancel.addEventListener("click", ()=> {
        dom.showprojectform.style.display = "none";
        dom.titleProject.value = "";

    });
}

export {dom};
export default buttonProjectFormSetup;