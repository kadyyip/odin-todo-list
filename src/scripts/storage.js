import { Project, ProjectLibrary } from "./project";
import { ToDoItem } from "./toDoItem";
import { format, parseJSON } from "date-fns";
import { projectLibrary } from "./examples";

class LocalStorage {

    constructor () {
        this.projectLibrary = projectLibrary;
    }

    loadStorage() {
        if(localStorage.getItem('projectLibrary')) {
            this.loadProjectLibrary();
        } 
        return this.projectLibrary;
    }

    loadProjectLibrary() {
        let obj = JSON.parse(localStorage.getItem("projectLibrary"));
        this.projectLibrary = new ProjectLibrary();
        for (let projectObj of obj.projects) {
            let project = new Project(projectObj.title, projectObj.desc);
            for (let toDoObj of projectObj.toDoList) {
                const dueDate = format(parseJSON(toDoObj.dueDate), "yyyy-MM-dd");
                let toDoItem = new ToDoItem(toDoObj.title, dueDate, 
                    toDoObj.priority, toDoObj.project, toDoObj.desc, 
                    toDoObj.complete);
                project.addToDoItem(toDoItem);
            }
            this.projectLibrary.addProject(project);
        }
    }

    saveProjectLibrary() {
        localStorage.setItem("projectLibrary", JSON.stringify(this.projectLibrary));
    }
}

export { LocalStorage }