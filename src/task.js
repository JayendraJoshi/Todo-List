export class Task{
    constructor(title,description,dueDate,priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}
export const handleTasks = function(){
    const contentDiv = document.querySelector(".content");
    const addTaskButton = document.createElement("button");
    function renderAddTaskButton(){
        addTaskButton.classList.add("addTaskButton");
        addTaskButton.textContent="+ Add Task";
        contentDiv.appendChild(addTaskButton);
    }
    function renderTaskForm(){
        const taskForm = document.createElement("form");
        const titleLabel = document.createElement("label");
        const titleInput = document.createElement("input")
        titleInput.type="text";
        titleLabel.appendChild(titleInput);

        const descriptionLabel = document.createElement("label");
        const descriptionInput = document.createElement("input");
        descriptionInput.type="text";
        descriptionLabel.appendChild(descriptionInput);

        const dateLabel = document.createElement("label");
        const dateInput = document.createElement("input");
        dateLabel.appendChild(dateInput);
        dateInput.type="date";

        taskForm.appendChild(titleLabel);
        taskForm.appendChild(descriptionLabel);
        taskForm.appendChild(dateLabel);
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
    return {
        renderAddTaskButton,
        renderTaskForm,
        createDivsFromTasks
        
    }
}
