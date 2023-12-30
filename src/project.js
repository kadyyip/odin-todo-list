class Project {
    constructor (name, desc) {
        this.name = name;
        this.desc = desc;
        this.toDoList = [];
    }

    addToDoItem(toDoItem) {
        this.toDoList.push(toDoItem);
    }

    removeToDoItem(toDoItem) {
        for (let i = 0; i < this.toDoList.length; i++) {
            let toDo = toDoItem[i];
            if (toDo === toDoItem) {
                this.toDoList.splice(i, 1);
                break;
            }
        }
    }

}

export { Project }
