
import { format, startOfToday } from "date-fns";
import { Project, ProjectLibrary } from "./project";
import { ToDoItem } from "./toDoItem";

let projectLibrary = new ProjectLibrary();

let work = new Project("Work", "work tasks");
work.addToDoItem(new ToDoItem("Send Email", "2023-01-10", "Medium", "Work", "send to boss"));
work.addToDoItem(new ToDoItem("Attend Meeting", "2023-01-23", "High", "Work", "with clients"));

let home = new Project("Home");
home.addToDoItem(new ToDoItem("Fold Laundry", "2023-01-23", "Low", "Home"));

let coding = new Project("Coding", "trying to get better at programming!");
coding.addToDoItem(new ToDoItem("Complete Lesson", "2023-01-23", "Low", "Coding"));
coding.addToDoItem(new ToDoItem("Work on Todo List Project", format(startOfToday(), "yyyy-MM-dd"), "Medium", "Coding"));


projectLibrary.addProject(work);
projectLibrary.addProject(home);
projectLibrary.addProject(coding);

export { projectLibrary }