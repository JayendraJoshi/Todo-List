export class Task{
    constructor(title,description,important){
        this.title = title;
        this.description = description;
        this.dueDate = "";
        this.id = crypto.randomUUID();
        this.projectID = null;
        this.important = important;
    }
    assignToProject(id){
        this.projectID = id;
    }
    setDueDate(dueDate){
        this.dueDate = new Date(dueDate);
    }
    setToImportant(){
        this.important = true;
    }
    setToUnimportant(){
        this.important = false;
    }
}
export const handleTasks = function(){
    const contentDiv = document.querySelector(".content");
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

        const importantInput = document.createElement("input");
        importantInput.type="checkbox";
        const importantLabel = document.createElement("label");
        importantLabel.textContent="Important";
        importantInput.classList.add("taskImportanceInput");

        importantLabel.appendChild(importantInput);
        

        taskForm.appendChild(titleLabel);
        taskForm.appendChild(descriptionLabel);
        taskForm.appendChild(dateLabel);
        taskForm.appendChild(importantLabel);
        taskForm.appendChild(addButton);
        taskForm.appendChild(cancelButton);
        return taskForm;
    }
    function appendTaskFormOnContentDiv(taskForm){
        const addTaskButton = document.querySelector(".addTaskButton");
        contentDiv.insertBefore(taskForm,addTaskButton);
    }
    function insertTaskFormBefore(taskForm,referenceElement){
        const li = document.querySelector(".tasksList li");
        li.insertBefore(taskForm,referenceElement);
    }
    function getInputValuesOfTaskForm(){
        const taskTitle = document.querySelector(".taskTitleInput").value;
        const taskDescription = document.querySelector(".taskDescriptionInput").value;
        const taskDueDate = document.querySelector(".taskDateInput").value;
        const taskImportance = document.querySelector(".taskImportanceInput").checked;
        return{
            taskTitle,
            taskDescription,
            taskDueDate,
            taskImportance
        }
    }
    function getInputValuesOfEditForm(){
        const title = document.querySelector(".taskTitleInput").value;
        const description = document.querySelector(".taskDescriptionInput").value;
        const dueDate = document.querySelector(".taskDateInput").value;
        const importance = document.querySelector(".taskImportanceInput").checked;
        return{
            title,
            description,
            dueDate,
            importance
        }
    }
    function createTaskDiv(task){
        const taskDiv = document.createElement("div");
        const titleDiv = document.createElement("div");
        titleDiv.textContent=task.title;
        titleDiv.classList.add("title");
        const descriptionDiv = document.createElement("div");
        descriptionDiv.textContent = task.description;
        descriptionDiv.classList.add("description");
        const dueDateDiv = document.createElement("div");
        dueDateDiv.classList.add("date");
        const importantInput = document.createElement("input");
        importantInput.type="checkbox";
        const importantLabel = document.createElement("label");
        importantLabel.textContent="Important";
        importantLabel.appendChild(importantInput);
        if(task.important===true){
            importantInput.checked = true;
        }else{
            importantInput.checked = false;
        }
        importantInput.classList.add("importantInput");
        if(task.dueDate instanceof Date) {
        const day = String(task.dueDate.getDate()).padStart(2, '0');
        const month = String(task.dueDate.getMonth() + 1).padStart(2, '0');
        const year = task.dueDate.getFullYear();
        dueDateDiv.textContent = `${day}-${month}-${year}`;
        } else {
        dueDateDiv.textContent = "";
        }
        const optionButton = document.createElement("button");
        const editSpan1 = document.createElement("span");
        const editSpan2 = document.createElement("span");
        const editSpan3 = document.createElement("span");
        optionButton.appendChild(editSpan1);
        optionButton.appendChild(editSpan2);
        optionButton.appendChild(editSpan3);
        optionButton.classList.add("optionButton");
        const editDiv = document.createElement("div");
        editDiv.appendChild(optionButton);
        const optionDiv = document.createElement("div");
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("editButton");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("deleteButton");
        optionDiv.appendChild(optionButton);
        optionDiv.appendChild(editButton);
        optionDiv.appendChild(deleteButton);
        taskDiv.classList.add("task");
        taskDiv.id =task.id;
        taskDiv.appendChild(titleDiv);
        taskDiv.appendChild(descriptionDiv);
        taskDiv.appendChild(dueDateDiv);
        taskDiv.appendChild(importantLabel);
        taskDiv.appendChild(optionDiv);
        return taskDiv;    
    }
    function updateTaskDivValues(taskDiv, task){
        
        const taskTitle = taskDiv.querySelector(".title");
        const taskDescription = taskDiv.querySelector(".description");
        const taskDate = taskDiv.querySelector(".date");
        const taskImportance = taskDiv.querySelector(".importantInput");

        taskTitle.textContent = task.title;
        taskDescription.textContent = task.description;

        if(task.dueDate instanceof Date) {
        const day = String(task.dueDate.getDate()).padStart(2, '0');
        const month = String(task.dueDate.getMonth() + 1).padStart(2, '0');
        const year = task.dueDate.getFullYear();
        taskDate.textContent = `${day}-${month}-${year}`;
        } else {
        taskDate.textContent = "";
        }

        taskImportance.checked = task.important;
    }
    
     function updateTask(task,newValues){
        task.title = newValues.title;
        task.description = newValues.description;
        if(newValues.dueDate){
            task.setDueDate = newValues.dueDate;
        }else{
            task.setDueDate="";
        }
        task.important = newValues.importance;
        }   
    function appendTaskDivOnDOM(taskDiv){
        const li = document.createElement("li");
        const ul = document.querySelector(".tasksList");
        li.appendChild(taskDiv);
        ul.appendChild(li);
    }
    function createNewTaskWithInputValues(){
        const values = getInputValuesOfTaskForm();
        console.log(values.taskDueDate);
        if(values.taskDueDate ==""){
            return new Task(values.taskTitle,values.taskDescription,values.taskImportance);
        }else {
            const newTask = new Task(values.taskTitle,values.taskDescription,values.taskImportance);
            newTask.setDueDate(values.taskDueDate);
            return newTask;
        }
    }
    function createAndAppendAddTaskButtonToContentDiv(){
        const button = createButton();
        appendButtonOnContentDiv(addAttributesForAddTaskButton(button));
    }
    function createAndAppendTaskDivToContentDiv(task){
        appendTaskDivOnDOM(createTaskDiv(task));
    }
    function createAndAppendTaskFormOnContentDiv(){
        appendTaskFormOnContentDiv(createTaskForm());
    }
    
    return {
        createAndAppendAddTaskButtonToContentDiv,
        createAndAppendTaskDivToContentDiv,
        createAndAppendTaskFormOnContentDiv,
        createNewTaskWithInputValues,
        createTaskForm,
        createButton,
        addAttributesForAddTaskButton,
        appendButtonOnContentDiv,
        createTaskForm,
        appendTaskFormOnContentDiv,
        getInputValuesOfTaskForm,
        createTaskDiv,
        appendTaskDivOnDOM,
        insertTaskFormBefore,
        updateTaskDivValues,
        getInputValuesOfEditForm,
        updateTask,
    }    
}
