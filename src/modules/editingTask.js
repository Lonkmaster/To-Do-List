import {dom} from "./dom";
import { isImportantTrue, onImportantSelected } from "./projectCreator";
import { saveToLocalStorage } from "./localStorage";



function starPressed() {

    let mainTaskDivFind = document.querySelector(`#task${this.value}`);
    let imageStyleOne = mainTaskDivFind.children[mainTaskDivFind.children.length-1].children[1];
    let imageStyleTwo = mainTaskDivFind.children[mainTaskDivFind.children.length-1].children[2];
    
    let task = dom.selectedProject.tasks.find((task)=>task.id == this.value);
    task.star = !task.star;
    let projectIndex = dom.selectedProject.index;
    let taskId = this.value;
    if (task.star == true) {
        let reference = new starReference(projectIndex, taskId);
        dom.importantTasks.push(reference);
        imageStyleOne.style.display = "flex"
        imageStyleTwo.style.display = "none"
        
    } else {
        let currentTask = dom.importantTasks.findIndex((task) => task.id == taskId && task.index == projectIndex);
        imageStyleOne.style.display = "none"
        imageStyleTwo.style.display = "flex"
        // console.log("removed Task");
        let spliced = dom.importantTasks.splice(currentTask, 1);

        if (isImportantTrue()) {
            onImportantSelected()
        }
        
    }
    saveToLocalStorage();
}

function starReference(index, id) {
    this.index = index;
    this.id = id;
}

function deleteTask() {
    let selectedchild = dom.taskContainer.children;
    for(let i = 0; i < selectedchild.length; i++) {
        let child = selectedchild[i];
        let id = `task${this.value}`
        if (child.id == id){
            let childNode = document.getElementById(id);
            dom.taskContainer.removeChild(childNode);
        }
    }
    let index = dom.selectedProject.tasks.findIndex((task) => task.id == this.value);
    dom.selectedProject.tasks.splice(index,1);
    saveToLocalStorage();

}

function applyEdit(id) {
   
    let tasks = dom.taskContainer.children;
    let taskId = `task${id}`;
    for(let i = 0;  i < tasks.length; i++) {
        let selectedTask = tasks[i];
        let taskIndex = selectedTask.id;
        console.log(taskId)
        if (taskIndex == taskId) {
            let editTask = dom.selectedProject.tasks[i];
            editTask.title = dom.newTaskTitle.value;
            editTask.description = dom.newTaskDescription.value;
            editTask.date = dom.dueDate.value;

            selectedTask.firstChild.firstChild.innerHTML = editTask.title;
            selectedTask.firstChild.lastChild.innerHTML = editTask.description;
            selectedTask.lastChild.firstChild.innerHTML = editTask.date;
            saveToLocalStorage();
        }
    }
}

function onEdit() {
    dom.selectedTask = this.value;
    dom.taskFormContainer.style.display = "block";
    console.log(dom.selectedTask)
}

export {starPressed, deleteTask, applyEdit as editBtn, onEdit, starReference,}