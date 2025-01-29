import {dom} from "./dom";
import { selectProject } from "./projectCreator";
import { saveToLocalStorage } from "./localStorage";



function starPressed() {
    let task = dom.selectedProject.tasks.find((task)=>task.id == this.value);
    task.star = !task.star;
    let projectIndex = dom.selectedProject.index;
    let taskId = this.value;
    if (task.star == true) {
        let reference = new starReference(projectIndex, taskId);
        dom.importantTasks.push(reference);
        console.log("importantTasks ")
        console.log(reference)
        
    } else {
        let currentTask = dom.importantTasks.findIndex((task) => task.id == taskId && task.index == projectIndex);
        console.log("removed Task");
        let spliced = dom.importantTasks.splice(currentTask, 1);
        console.log(spliced);
        // delete the reference should be removed from the array
    }
    /*for(let i = 0; i < dom.selectedProject.tasks.length; i++) {
        let currentTask = dom.selectedProject.tasks[i].id;
        let currentId = this.value;
        
        if(currentTask == currentId) {
            let projectIndex = dom.selectedProject.index;
            let reference = new starReference(projectIndex, currentId);
            dom.importantTasks.push(reference);
        }
    }*/
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