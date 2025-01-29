import {addProjectInput, selectProject, onImportantSelected, onTodaySelected, onThisWeekSelected,displayProject} from "./projectCreator";
import { saveToLocalStorage, loadFromLocalStorage } from "./localStorage";
import { starReference } from "./editingTask";

console.log("DOM loaded");
let isLoaded = false;

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
    dom.titlePanelChange = document.querySelector(".title");
    dom.dueDate = document.querySelector("#dueDate");
    dom.important = document.getElementById("important");
    dom.upcoming = document.getElementById("upcoming");
    dom.today = document.getElementById("today");
    dom.renameProject = document.querySelector("renameProject");
    dom.projectEditContainer = document.querySelector(".projectEditContainer");
    dom.projects = loadFromLocalStorage();
    dom.importantTasks = [];
    dom.selectedProject = null;
    dom.selectedTask = -1;
    if(dom.projects != undefined) {
        isLoaded = true;
        //console.log(dom.projects);
        if(dom.projects.length == 0){
            dom.taskFormBtn.style.display = "none";
        }
    } else {
        dom.projects = [];
        
    }

    dom.important.addEventListener("click", onImportantSelected);
    dom.today.addEventListener("click", onTodaySelected);
    dom.upcoming.addEventListener("click", onThisWeekSelected);
    
    return dom;
})();


(function firstRuntimeProject() {
    if(isLoaded){
        for(let i = 0; i < dom.projects.length; i++) {
            displayProject(dom.projects[i]);
            for(let j = 0; j < dom.projects[i].tasks.length; j++){
                let currentTask = dom.projects[i].tasks[j];
                if(currentTask.star) {
                    let reference = new starReference(dom.projects[i].index, currentTask.id);
                    dom.importantTasks.push(reference);
                }
            }
        }
        selectProject(0);
        return
    }


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
    saveToLocalStorage()
})();


function setEdit() {
    projectEditValue = true;
}

let projectEditValue = false;

function buttonProjectFormSetup() {
    dom.addProjectButton.addEventListener("click", ()=> {
        
        dom.addProjectButton.style.display = "none";
        
        projectEditValue = false;
        if (dom.showprojectform.style.display === "none") {
            dom.showprojectform.style.display = "block";
        } else {
            dom.showprojectform.style.display = "block";
        };
    });
    
    dom.projectSub.addEventListener("click", ()=> {

        if(projectEditValue == true) {
            dom.showprojectform.style.display = "none";
            dom.titleProject.value = "";
            dom.addProjectButton.style.display = "flex";

            
        } else {
            addProjectInput();
            dom.showprojectform.style.display = "none";
            dom.titleProject.value = "";
            dom.addProjectButton.style.display = "flex";

        }
        event.preventDefault();
    });
    
    dom.projectCancel.addEventListener("click", ()=> {
        dom.addProjectButton.style.display = "flex";
        dom.showprojectform.style.display = "none";
        dom.titleProject.value = "";
    });
}

export {dom, projectEditValue, setEdit,};
export default buttonProjectFormSetup;