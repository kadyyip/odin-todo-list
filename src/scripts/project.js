class Project {
    constructor (title, desc) {
        this.title = title;
        this.desc = desc;
        this.toDoList = [];
    }

    getToDos() {
        return this.toDoList;
    }

    addToDoItem(toDoItem) {
        this.toDoList.push(toDoItem);
    }

    removeToDoItem(toDoItem) {
        for (let i = 0; i < this.toDoList.length; i++) {
            let toDo = this.toDoList[i];
            if (toDo === toDoItem) {
                this.toDoList.splice(i, 1);
                break;
            }
        }
    }

    getToDoItemByIndex(index) {
        return this.toDoList[index];
    }

}

class ProjectLibrary {
    constructor () {
        this.projects = []
    }

    getProjectByTitle = (projectTitle) => {
        for (let project of this.getProjects()) {
            if (project.title === projectTitle) {
                return project;
            }
        }
        return null;
    }

    getProjects() {
        return this.projects;
    }

    addProject(project) {
        this.projects.push(project);
    }

    deleteProject(project) {
        for (let i = 0; i < this.projects.length; i++) {
            let currProject = this.projects[i];
            if (project === currProject) {
                this.projects.splice(i, 1);
                break;
            }
        }
    }

    moveToDoItem(toDoItem, srcProject, destProject) {
        destProject.addToDoItem(toDoItem);
        srcProject.removeToDoItem(toDoItem);
        toDoItem.updateProject(destProject.title);
    }
}

export { Project, ProjectLibrary }
