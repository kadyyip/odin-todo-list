/* IMPORT MODULES */
import { format, isToday } from "date-fns";
import { Project } from "./project";
import { ToDoItem } from "./toDoItem";
import { LocalStorage } from "./storage";

/* IMPORT IMAGES */
import emptyCheckBox from '../icons/checkbox-blank-outline.svg';
import checkBox from '../icons/checkbox-outline.svg';
import edit from '../icons/square-edit-outline.svg';
import trash from '../icons/trash-can-outline.svg';

/* DOM SELECTORS */

const toDoContainerDiv = document.querySelector(".to-do-container");
const projectContainerDiv = document.querySelector(".projects-container");
const headingDiv = document.querySelector(".content .heading");
const descDiv = document.querySelector(".content .desc");

const toDoDialog = document.querySelector(".to-do-form-container");
const toDoDialogCloseBtn = document.querySelector(".to-do-form-container .close");
const toDoForm = document.querySelector(".to-do-form");
const titleInput = document.querySelector("#title"); 
const descInput = document.querySelector("#desc"); 
const dueDateInput = document.querySelector("#due-date"); 
const priorityInput = document.querySelector("#priority"); 
const projectInput = document.querySelector("#project"); 
const submitToDoForm = document.querySelector(".to-do-form .submit");
const toDoErrorMsg = document.querySelector(".to-do-form .error");

const projectDialog = document.querySelector(".project-form-container");
const projectDialogCloseBtn = document.querySelector(".project-form-container .close");
const projectForm = document.querySelector(".project-form");
const projectTitleInput = document.querySelector("#proj-title"); 
const projectDescInput = document.querySelector("#proj-desc"); 
const submitProjectForm = document.querySelector(".project-form .submit");
const projectErrorMsg = document.querySelector(".project-form .error");

const toDoDtlDialog = document.querySelector(".to-do-dtl");
const toDoDtlDialogCloseBtn = document.querySelector(".to-do-dtl .close");
const dtlTitle = document.querySelector(".dtl-title");
const dtlDesc = document.querySelector(".dtl-desc");
const dtlDueDate = document.querySelector(".dtl-due-date");
const dtlPriority = document.querySelector(".dtl-priority");
const dtlStatus = document.querySelector(".dtl-status");
const dtlProject = document.querySelector(".dtl-project");

const addTaskBtn = document.querySelector(".add-task");
const addProjectBtn = document.querySelector(".add-project");

const allProjects = document.querySelector(".all");
const todayDiv = document.querySelector(".today");

const localStorage = new LocalStorage();
const projectLibrary = localStorage.loadStorage(); 

/* FUNCTIONS */

function clearContent(element) {
    element.replaceChildren();
}

// sidebar

function displaySidebar() {
    const projects = projectLibrary.getProjects();
    for (let i = 0; i < projects.length; i++) {
        let project = projects[i]
        let projectDiv = document.createElement("div");
        projectDiv.textContent = project.title;
        let deleteImg = document.createElement("img");
        deleteImg.classList.add("icon", "icon-hover");
        deleteImg.src = trash;
        deleteImg.addEventListener("click", () => {
            projectLibrary.deleteProject(project);
            clearContent(projectContainerDiv);
            displaySidebar();
            renderToDos();
        })   
        projectDiv.appendChild(deleteImg);
        projectDiv.classList.add("project");
        projectDiv.dataset.projIndex = i;
        projectDiv.addEventListener("click", () => {
            headingDiv.textContent = project.title;
            descDiv.textContent = project.desc;
            renderToDos();
        });
        
        projectContainerDiv.appendChild(projectDiv);
    }
}

// to do items

function displayToDoItem(toDoItem, project, index) {
    let toDoDiv = document.createElement("div");
    let toDoLeftDiv = document.createElement("div");
    let toDoRightDiv = document.createElement("div");

    let checkBoxImg = document.createElement("img");
    checkBoxImg.classList.add("icon");
    if (toDoItem.complete) {
        checkBoxImg.src = checkBox;
    } else {
        checkBoxImg.src = emptyCheckBox;
    }
    checkBoxImg.addEventListener("click", () => {
        toDoItem.updateStatus();
        localStorage.saveProjectLibrary();
        if (toDoItem.complete) {
            checkBoxImg.src = checkBox;
            toDoDiv.classList.add("complete");
        } else {
            checkBoxImg.src = emptyCheckBox;
            toDoDiv.classList.remove("complete");
        }
    })    
    toDoLeftDiv.appendChild(checkBoxImg);

    let titleDiv = document.createElement("div");
    titleDiv.classList.add("to-do-title")
    titleDiv.textContent = toDoItem.title;
    titleDiv.title = "Click for details";
    if (toDoItem.complete) {
        toDoDiv.classList.add("complete");
    }
    titleDiv.addEventListener("click", () => {
        displayToDoDetails(toDoItem);
    })
    toDoLeftDiv.appendChild(titleDiv);

    let dueDateDiv = document.createElement("div");
    if (toDoItem.dueDate) {
        dueDateDiv.textContent = format(toDoItem.dueDate, "LLL d, yyyy");
    }
    toDoRightDiv.appendChild(dueDateDiv);
    
    let editImg = document.createElement("img");
    editImg.classList.add("icon", "icon-hover");
    editImg.src = edit;
    editImg.addEventListener("click", () => {
        toDoDialog.showModal();
        toDoForm.dataset.toDoItemIndex = index;  
        toDoForm.dataset.toDoItemProject = toDoItem.project;  
        addProjectOptionsToForm();
        fillToDoForm(toDoItem);    
        renderToDos();
    })    
    toDoRightDiv.appendChild(editImg);

    let deleteImg = document.createElement("img");
    deleteImg.classList.add("icon", "icon-hover");
    deleteImg.src = trash;
    deleteImg.addEventListener("click", () => {
        project.removeToDoItem(toDoItem);
        clearContent(toDoContainerDiv);
        renderToDos();
    })    
    toDoRightDiv.appendChild(deleteImg);

    toDoDiv.appendChild(toDoLeftDiv);
    toDoDiv.appendChild(toDoRightDiv);
    toDoLeftDiv.classList.add("to-do-left");
    toDoRightDiv.classList.add("to-do-right");
    toDoDiv.classList.add("to-do");
    if (toDoItem.priority === "High") {
        toDoDiv.classList.add("high");
    } else if (toDoItem.priority === "Medium") {
        toDoDiv.classList.add("medium");
    } else if (toDoItem.priority === "Low") {
        toDoDiv.classList.add("low");
    }
    toDoContainerDiv.appendChild(toDoDiv);
}

function displayToDos(project) {
    const toDoList = project.getToDos();
    for (let i = 0; i < toDoList.length; i++) {
        let toDoItem = toDoList[i];
        displayToDoItem(toDoItem, project, i);
    }
}

function displayAllToDos() {
    clearContent(toDoContainerDiv);
    descDiv.textContent = null;
    headingDiv.textContent = "All";
    for (let project of projectLibrary.getProjects()) {
        displayToDos(project);
    }
}

function displayTodayToDos() {
    clearContent(toDoContainerDiv);
    headingDiv.textContent = "Today";
    descDiv.textContent = null;
    for (let project of projectLibrary.getProjects()) {
        for (let toDoItem of project.getToDos()) {
            if (isToday(toDoItem.dueDate)) {
                displayToDoItem(toDoItem);
            }
        }
    }
}

function renderToDos() {
    localStorage.saveProjectLibrary();
    clearContent(toDoContainerDiv);
    if (headingDiv.textContent === "All") {
        displayAllToDos();
    } else if (headingDiv.textContent === "Today") {
        displayTodayToDos();
    } else {
        const project = projectLibrary.getProjectByTitle(headingDiv.textContent);
        if (project === null) {
            displayAllToDos();
        }
        displayToDos(project);
    }
}

// to do details

function displayToDoDetails(toDoItem) {
    toDoDtlDialog.showModal();     
    dtlTitle.textContent = toDoItem.title;
    dtlDesc.textContent = toDoItem.desc;
    if (toDoItem.dueDate) {
        dtlDueDate.textContent = `Due Date: ${format(toDoItem.dueDate, "LLLL dd, yyyy")}`;
    }
    
    dtlPriority.textContent = `Priority: ${toDoItem.priority}`;
    if (toDoItem.complete) {
        dtlStatus.textContent = "Status: Complete";
    } else {
        dtlStatus.textContent = "Status: Incomplete";
    }
    dtlProject.textContent = `Project: ${toDoItem.project}`;
}

// to do form

function addProjectOptionsToForm() {
    clearContent(projectInput);
    for (let project of projectLibrary.getProjects()) {
        let option = document.createElement("option");
        option.text = project.title;
        projectInput.appendChild(option);
    }
}

function fillToDoForm(toDoItem) {
    titleInput.value = toDoItem.title;
    descInput.value = toDoItem.desc;
    dueDateInput.value = format(toDoItem.dueDate, "yyyy-MM-dd");
    priorityInput.value = toDoItem.priority;
    projectInput.value = toDoItem.project;
}


function updateToDoItem(toDoItemIndex, projectTitle) {
    const currProject = projectLibrary.getProjectByTitle(projectTitle);
    const destProject = projectLibrary.getProjectByTitle(projectInput.value);
    const toDoItem = currProject.getToDoItemByIndex(toDoItemIndex);
    toDoItem.updateTitle(titleInput.value);
    toDoItem.updateDesc(descInput.value);
    toDoItem.updateDueDate(dueDateInput.value);
    toDoItem.updatePriority(priorityInput.value);
    if (projectInput.value !== projectTitle) {
        projectLibrary.moveToDoItem(toDoItem, currProject, destProject);
    } 
}

// initial load 

function loadPage() {
    displaySidebar(projectLibrary.projects);
    displayAllToDos();
}

/* ADD EVENT LISTENERS */

addTaskBtn.addEventListener("click", () => {
    toDoForm.dataset.toDoItemIndex = -1;
    addProjectOptionsToForm();
    toDoForm.reset();
    if (headingDiv.textContent != "All" && headingDiv.textContent != "Today") {
        projectInput.value = headingDiv.textContent;
    }
    toDoDialog.showModal();
});

addProjectBtn.addEventListener("click", () => {
    projectDialog.showModal();
});

allProjects.addEventListener("click", displayAllToDos);

todayDiv.addEventListener("click", displayTodayToDos);

toDoDialogCloseBtn.addEventListener("click", () => {
    toDoDialog.close();
});

toDoDtlDialogCloseBtn.addEventListener("click", () => {
    toDoDtlDialog.close();
});

projectDialogCloseBtn.addEventListener("click", () => {
    projectDialog.close();
});

submitProjectForm.addEventListener("click", (event) => {
    event.preventDefault();
    if (!(projectTitleInput.value)) {
        if (projectErrorMsg.textContent === "") {
            projectErrorMsg.textContent = "Please fill in required fields!";
        }
    }
    else {
        if (projectErrorMsg !== null) {
            projectErrorMsg.textContent = "";
        }
        projectLibrary.addProject(
            new Project(projectTitleInput.value, projectDescInput.value)
        );
        projectForm.reset();
        projectDialog.close();
        clearContent(projectContainerDiv);
        displaySidebar();
        localStorage.saveProjectLibrary();
    }
});

submitToDoForm.addEventListener("click", (event) => {
    event.preventDefault();
    if (!(titleInput.value && dueDateInput.value && priorityInput.value && 
        projectInput.value)) {
        if (toDoErrorMsg.textContent === "") {
            toDoErrorMsg.textContent = "Please fill in required fields!";
        }
    }
    else {
        if (toDoErrorMsg !== null) {
            toDoErrorMsg.textContent = "";
        }
        if (toDoForm.dataset.toDoItemIndex !== "-1") {
            updateToDoItem(toDoForm.dataset.toDoItemIndex, 
                toDoForm.dataset.toDoItemProject);
        } else {
            const project = projectLibrary.getProjectByTitle(projectInput.value);
            project.addToDoItem(new ToDoItem(titleInput.value, dueDateInput.value, 
                priorityInput.value, projectInput.value, descInput.value));
        toDoForm.reset();
        }
        toDoDialog.close();
        renderToDos();
    }
});

export { loadPage }