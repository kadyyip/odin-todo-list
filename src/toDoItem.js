class ToDoItem {
    constructor(title, desc=null, dueDate=null, priority=null, notes=null, checkList=null) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checkList = checkList;
        this.status = "Not started";
    }

    changePriority(priority) {
        this.priority = priority;
    }

    updateStatus(status) {
        this.status = status;
    }
}

export { ToDoItem };
