import { ProjectList } from "./project";
export class Task{
    constructor(title,description,dueDate,projectID){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.id = crypto.randomUUID;
        this.projectID = projectID;
    }
}
export const handleTasks = function(){
    const contentDiv = document.querySelector(".content");
    const addTaskButton = document.createElement("button");
    const taskForm = document.querySelector(".taskForm");
    const projectList = new ProjectList();
    function renderAddTaskButton(){
        addTaskButton.classList.add("addTaskButton");
        addTaskButton.textContent="+ Add Task";
        contentDiv.appendChild(addTaskButton);
    }
    function renderTaskForm(){
        const taskForm = document.createElement("form");
        taskForm.classList.add("taskForm");
        const titleLabel = document.createElement("label");
        const titleInput = document.createElement("input")
        titleInput.name = "titleInput";
        titleInput.type="text";
        titleInput.classList.add("taskTitleInput");
        titleLabel.appendChild(titleInput);

        const descriptionLabel = document.createElement("label");
        const descriptionInput = document.createElement("input");
        descriptionInput.name = "descriptionInput";
        descriptionInput.type="text";
        descriptionInput.classList.add("taskDescriptionInput");
        descriptionLabel.appendChild(descriptionInput);

        const dateLabel = document.createElement("label");
        const dateInput = document.createElement("input");
        dateInput.name = "dateInput";
        dateLabel.appendChild(dateInput);
        dateInput.classList.add("taskDateInput");
        dateInput.type="date";

        const addButton = document.createElement("button");
        addButton.textContent="Add";
        addButton.classList.add("TaskFormAddButton");
        addButton.type="submit";

        const cancelButton = document.createElement("button");
        cancelButton.textContent="Cancel";
        cancelButton.classList.add("TaskFormCancelButton");


        taskForm.appendChild(titleLabel);
        taskForm.appendChild(descriptionLabel);
        taskForm.appendChild(dateLabel);
        taskForm.appendChild(addButton);
        taskForm.appendChild(cancelButton);
        contentDiv.appendChild(taskForm);
    }
    function createDivsFromTasks(project){
        const tasks = project.getTasks();
        const divsArray = [];
        tasks.forEach(function(){
            const listItem = document.createElement("li");
            const description = document.createElement("div");
        })
    }
    function getInputValues(){
        const taskTitle = document.querySelector(".taskTitleInput").value;
        const taskDescription = document.querySelector(".taskDescriptionInput").value;
        const taskDueDate = document.querySelector(".taskDateInput").value;
        return{
            taskTitle,
            taskDescription,
            taskDueDate,
        }
        
    }
    function renderTaskDiv(task){
        const taskDiv = document.createElement("div");
        const titleDiv = document.createElement("div");
        titleDiv.textContent=task.title;
        const descriptionDiv = document.createElement("div");
        descriptionDiv.textContent = task.description;
        const dueDateDiv = document.createElement("div");
        dueDateDiv.textContent=task.dueDate;
        taskDiv.appendChild(titleDiv);
        taskDiv.appendChild(descriptionDiv);
        taskDiv.appendChild(dueDateDiv);
        const li = document.createElement("li");
        const ul = document.querySelector(".tasksList");
        li.appendChild(taskDiv);
        ul.appendChild(li);
    }
    return {
        renderAddTaskButton,
        renderTaskForm,
        createDivsFromTasks,
        getInputValues,
        renderTaskDiv,
    }
}
