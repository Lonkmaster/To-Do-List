import { dom } from "./dom";

function saveToLocalStorage(){
    localStorage.projects = JSON.stringify(dom.projects);
}

function loadFromLocalStorage() {
    if (localStorage.projects == undefined) {
        return undefined;
    }
    return JSON.parse(localStorage.projects);
}


export {saveToLocalStorage, loadFromLocalStorage,}