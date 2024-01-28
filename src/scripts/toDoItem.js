import { parse } from "date-fns";


class ToDoItem {
    constructor(title, dueDate, priority, project, desc=null, complete=false) {
        this.title = title;
        this.desc = desc;
        this.dueDate = parse(dueDate, 'yyyy-MM-dd', new Date());
        this.priority = priority;
        this.complete = complete;
        this.project = project;
    }

    updateTitle(title) {
        this.title = title;
    }

    updateDesc(desc) {
        this.desc = desc;
    }

    updateDueDate(dueDate) {
        this.dueDate = parse(dueDate, 'yyyy-MM-dd', new Date());
    }

    updatePriority(priority) {
        this.priority = priority;
    }

    updateNotes(notes) {
        this.notes = notes;
    }

    updateCheckList(checkList) {
        this.checkList = checkList;
    }

    updateStatus() {
        this.complete = !this.complete;
    }

    updateProject(project) {
        this.project = project
    }
}

export { ToDoItem };
