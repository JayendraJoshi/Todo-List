export class Task{
    constructor(title,description,dueDate){
        this.title = title;
        this.description = description;
        this.dueDate = new Date(dueDate);
        this.id = crypto.randomUUID;
        this.projectID = null;
    }
    assignToProject(id){
        this.projectID = id;
    }
}
export const handleTasks = function(){
    const contentDiv = document.querySelector(".content");
    const taskUtilFunctions = function(){
    function createButton(){
        return document.createElement("button");    
    }
    function addAttributesForAddTaskButton(addTaskButton){
        addTaskButton.classList.add("addTaskButton");
        addTaskButton.textContent="+ Add Task";
        return addTaskButton;
    }
    function appendButtonOnContentDiv(button){
        contentDiv.appendChild(button);
    }
    function createTaskForm(){
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
        return taskForm;
    }
    function appendTaskFormOnContentDiv(taskForm){
        const addTaskButton = document.querySelector(".addTAskButton");
        contentDiv.insertBefore(taskForm,addTaskButton);
    }
    function getInputValuesOfTaskForm(){
        const taskTitle = document.querySelector(".taskTitleInput").value;
        const taskDescription = document.querySelector(".taskDescriptionInput").value;
        const taskDueDate = document.querySelector(".taskDateInput").value;
        return{
            taskTitle,
            taskDescription,
            taskDueDate,
        }
    }
    function createTaskDiv(task){
        const taskDiv = document.createElement("div");
        const titleDiv = document.createElement("div");
        titleDiv.textContent=task.title;
        const descriptionDiv = document.createElement("div");
        descriptionDiv.textContent = task.description;
        const dueDateDiv = document.createElement("div");
        const day = task.dueDate.getDate();
        const month = task.dueDate.getMonth() + 1;
        const year = task.dueDate.getFullYear();
        dueDateDiv.textContent= (`${day}-${month}-${year}`);
        taskDiv.appendChild(titleDiv);
        taskDiv.appendChild(descriptionDiv);
        taskDiv.appendChild(dueDateDiv);
        return taskDiv;    
    }
    function appendTaskDivOnDOM(taskDiv){
        const li = document.createElement("li");
        const ul = document.querySelector(".tasksList");
        li.appendChild(taskDiv);
        ul.appendChild(li);
    }
    return{
        createButton,
        addAttributesForAddTaskButton,
        appendButtonOnContentDiv,
        createTaskForm,
        appendTaskFormOnContentDiv,
        getInputValuesOfTaskForm,
        createTaskDiv,
        appendTaskDivOnDOM
    }
    }
    const utilFunctions = taskUtilFunctions();

    function createNewTaskWithInputValues(){
        const values = utilFunctions.getInputValuesOfTaskForm();
        return new Task(values.taskTitle,values.taskDescription,values.taskDueDate);
    }
    function createAndAppendAddTaskButtonToContentDiv(){
        const button = utilFunctions.createButton();
        utilFunctions.appendButtonOnContentDiv(utilFunctions.addAttributesForAddTaskButton(button));
    }
    function createAndAppendTaskDivToContentDiv(task){
        utilFunctions.appendTaskDivOnDOM(utilFunctions.createTaskDiv(task));
    }
    function createAndAppendTaskFormOnContentDiv(){
        utilFunctions.appendTaskFormOnContentDiv(utilFunctions.createTaskForm());
    }
    
    return {
        createAndAppendAddTaskButtonToContentDiv,
        createAndAppendTaskDivToContentDiv,
        createAndAppendTaskFormOnContentDiv,
        createNewTaskWithInputValues,
    }    
}
