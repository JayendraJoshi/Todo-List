import "./styles.css";
import { ProjectList, handleProjects, Project } from "./project";
import { handleTasks } from "./task";
import { isToday, isAfter, isBefore, addDays, startOfDay } from 'date-fns';


export const wrapperFunctions = function(){
    const projectList = new ProjectList;
    const projectFunctions = handleProjects();
    const taskFunctions = handleTasks();

    function setContentContainerTitle(name){
        const title = document.querySelector(".contentTitleContainer h2");
        title.textContent = name;
    }
    function doesElementExistInDOM(selector){
        if(!document.querySelector(selector)){
            return false;
        }
        return true;
    }

    function clickEventOnAddTaskButton(){
        if(!doesElementExistInDOM(".taskForm")){
            taskFunctions.createAndAppendTaskFormOnContentDiv();
        }
    }
    function clickEventOnAddProjectFormButton(event){
        event.preventDefault();
        const projectForm = document.querySelector(".projectForm");
        const project = projectFunctions.createProjectBasedOnProjectFormInput();
        projectList.addProject(project);
        projectList.setActiveProject(project.id);
        projectFunctions.createAndAppendProjectDivToProjectContainer(project);
        //clickEventOnProjectDiv();
        projectForm.remove();
    }
    
    function clickEventOnCancelProjectFormButton(event){
        event.preventDefault();
            const projectForm = document.querySelector(".projectForm");
            projectForm.remove();
    }
    function clickEventOnAddProjectButton(){
        if (!doesElementExistInDOM(".projectForm")) {
                projectFunctions.createAndAppendProjectFormOnProjectContainer();
            }
    }
    function clickEventOnProjectDiv(event){
        setContentContainerTitle(projectList.getProjectByID(event.target.id).name);
        projectList.setActiveProject(event.target.id);
        const tasks = getTasksOfProject(projectList.getActiveProject());
        resetContentOfTasksList();
        appendTasksToTasksList(tasks);
        
    }
    
    function createAndAppendAddTaskButtonToContentDiv(){
        taskFunctions.createAndAppendAddTaskButtonToContentDiv();
    }
    function clickEventOnTaskFormAddButton(event){
        const taskForm = document.querySelector(".taskForm");
            event.preventDefault();
            console.log(projectList.getActiveProject());
            const activeProject = projectList.getActiveProject();
            const task = taskFunctions.createNewTaskWithInputValues();
            task.assignToProject(activeProject);
            activeProject.addTask(task);
            taskFunctions.createAndAppendTaskDivToContentDiv(task);
            taskForm.remove();
    }
    function clickEventOnTaskFormCancelButton(event){
            const taskForm = document.querySelector(".taskForm");
            event.preventDefault();
            taskForm.remove();
    }
    function clickEventOnTaskImportantCheckBox(event){
        const activeProject = projectList.getActiveProject();
        console.log(activeProject + "is there");
        const taskId = event.target.closest('div').id;
        console.log(taskId);
        const targetTask = activeProject.getTaskByID(taskId);
        if(targetTask.important=== true){
            targetTask.setToUnimportant();
        }else{
            targetTask.setToImportant();
        }
         event.target.checked = targetTask.important;
    }
    function clickEventOnEditButton(taskDiv){
        const taskEditForm= taskFunctions.createTaskForm();
        taskEditForm.classList.add("editform");
        const inputValues = getInputValuesFromTask(taskDiv.id);
        fillTaskValuesIntoTaskEditForm(taskEditForm,inputValues);
        taskFunctions.insertTaskFormBefore(taskEditForm,taskDiv);
        taskFunctions.addHiddenClass(taskDiv);
    }
    function clickEventOnEditCancelChangeButton(taskDiv){
       const editform = document.querySelector(".editform");
        editform.remove();
        taskFunctions.removeHiddenClass(taskDiv);
        console.log("removed");
    }
    function clickEventOnEditAddTaskButton(taskDiv){
        const activeProject = projectList.getActiveProject(); 
        const targetTask = activeProject.getTaskByID(taskDiv.id);
        const newValues = taskFunctions.getInputValuesOfEditForm();
        taskFunctions.updateTask(targetTask, newValues);
        taskFunctions.updateTaskDivValues(taskDiv,targetTask);
        taskFunctions.removeHiddenClass(taskDiv);
        const editform = document.querySelector(".editform");
        editform.remove();
    }
    function clickEventOnDeleteTaskButton(taskDiv){
        const activeProject = projectList.getActiveProject(); 
        activeProject.deleteTaskByID(taskDiv.id);
        const liParent = taskDiv.closest("li");
        liParent.remove();
        taskDiv.remove();
        
    }

    function getActiveProjectDiv(){
        console.log(projectList.getActiveProject());
        const activeDivID = projectList.getActiveProject().id;
       return document.querySelector(`div[id="${activeDivID}"]`);
    }
    function getTasksOfProject(project){
        return project.getTasks();
    }
    function appendTasksToTasksList(taskArray){
        for(let i=0;i < taskArray.length;i++){
            taskFunctions.createAndAppendTaskDivToContentDiv(taskArray[i]);
        }
    }
    function resetContentOfTasksList(){
       const tasksList= document.querySelector(".tasksList");
        tasksList.textContent = "";
    }
    function getInputValuesFromTask(taskID){
        const activeProject = projectList.getActiveProject();
        const targetTask = activeProject.getTaskByID(taskID);
        const taskTitle = targetTask.title;
        const taskDescription = targetTask.description;
        const taskDate = targetTask.dueDate;
        const important = targetTask.important;
        console.log(taskDate);

        return {
            taskTitle,
            taskDescription,
            taskDate,
            taskID,
            important
        }
    }
    function fillTaskValuesIntoTaskEditForm(taskEditForm,inputValues){
        for(const element of taskEditForm.elements){
            if(element.classList.contains("taskTitleInput")){
                element.value=inputValues.taskTitle;
            }else if(element.classList.contains("taskDescriptionInput")){
                element.value=inputValues.taskDescription;
            }else if(element.classList.contains("taskDateInput")){
                 if(inputValues.taskDate && inputValues.taskDate instanceof Date){
                        const day = String(inputValues.taskDate.getDate()).padStart(2, '0');
                        const month = String(inputValues.taskDate.getMonth() + 1).padStart(2, '0');
                        const year = inputValues.taskDate.getFullYear();
                        element.value = `${year}-${month}-${day}`;
                }else{
                    element.value="";
                }
                
            }else if(element.classList.contains("taskImportanceInput")){
                element.checked=inputValues.important;
            }
        }
    }
    function setDefaultProjectDiv(){
        const div = document.createElement("div");
        div.textContent="default";
        const defaultProject = new Project("default");
        div.id = defaultProject.id;
        projectList.addProject(defaultProject);
        projectList.setActiveProject(defaultProject.id);
        const projectsList = document.querySelector(".projectsList");
        projectsList.appendChild(div);
        setContentContainerTitle(defaultProject.name);
        const tasks = getTasksOfProject(defaultProject);
        appendTasksToTasksList(tasks);
    }
    function determineClickedFilter(className){
        switch(className){
            case 'allTasks':
                clickEventOnAllTasksDiv();
                break;
            case 'today':
                clickEventOnTodayTaskDiv();
                break;
            case 'unplanned':
                clickEventOnUnplannedTaskDiv();
                break;
            case 'next7Days':
                clickEventOnNext7DaysDiv();
                break;
            case 'important':
                clickEventOnImportantTaskDiv();
                break;
        }
    }
    function getAllTasks(){
        const allTasks = [];
        const allProjects = projectList.getAllProjects();
        for(let i =0; i< allProjects.length;i++){
            let tasks = allProjects[i].getTasks();
            for( let j = 0; j <tasks.length;j++){
                allTasks.push(tasks[j]);
            }
        }
        return allTasks;
    }
    function clickEventOnAllTasksDiv(){
        resetContentOfTasksList();
        appendTasksToTasksList(getAllTasks());
        setContentContainerTitle('All tasks');
    }
    function getTodaysTasks(){
        const todaysTasks = [];
        const allProjects = projectList.getAllProjects();
        for(let i =0; i< allProjects.length;i++){
            let tasks = allProjects[i].getTasks();
            for( let j = 0; j <tasks.length;j++){
                if(isToday(tasks[j].dueDate)){
                    todaysTasks.push(tasks[j]);
                }
            }
        }
        return todaysTasks;
    }
    function clickEventOnTodayTaskDiv(){
        resetContentOfTasksList();
        appendTasksToTasksList(getTodaysTasks());
        setContentContainerTitle('Today');
    }
    function getUnplannedTasks(){
        const unplannedTasks = [];
        const allProjects = projectList.getAllProjects();
        for(let i =0; i< allProjects.length;i++){
            let tasks = allProjects[i].getTasks();
            for( let j = 0; j <tasks.length;j++){
                if(tasks[j].dueDate==""){
                    unplannedTasks.push(tasks[j]);
                }
            }
        }
        return unplannedTasks;
    }
    function clickEventOnUnplannedTaskDiv(){
        resetContentOfTasksList();
        appendTasksToTasksList(getUnplannedTasks());
        setContentContainerTitle('Unplanned');
    }
    function dateIsInNext7Days(date){
        const today = startOfDay(new Date());
        const sevenDaysFromNow = addDays(today,7);
        return isAfter(date,today) && isBefore(date,sevenDaysFromNow);
    }
    function getNext7DaysTasks(){
        const next7DaysTasks = [];
        const allProjects = projectList.getAllProjects();
        for(let i =0; i< allProjects.length;i++){
            let tasks = allProjects[i].getTasks();
            for( let j = 0; j <tasks.length;j++){
                if(dateIsInNext7Days(tasks[j].dueDate)){
                    next7DaysTasks.push(tasks[j]);
                    console.log(tasks[j]);
                }
            }
        }
        return next7DaysTasks;
    }
    function clickEventOnNext7DaysDiv(){
        resetContentOfTasksList();
        appendTasksToTasksList(getNext7DaysTasks());
        setContentContainerTitle('Next 7 Days');
    }
    function getImportantTasks(){
        const importantTasks = [];
        const allProjects = projectList.getAllProjects();
        for(let i =0; i< allProjects.length;i++){
            let tasks = allProjects[i].getTasks();
            for( let j = 0; j <tasks.length;j++){
                if((tasks[j].important===true)){
                    importantTasks.push(tasks[j]);
                }
            }
        }
        return importantTasks;
    }
    function clickEventOnImportantTaskDiv(){
        resetContentOfTasksList();
        appendTasksToTasksList(getImportantTasks());
        setContentContainerTitle('Important');
    }
    return{
        clickEventOnAddProjectButton,
        clickEventOnAddProjectFormButton,
        clickEventOnCancelProjectFormButton,
        clickEventOnTaskFormAddButton,
        clickEventOnTaskFormCancelButton,
        clickEventOnProjectDiv,
        clickEventOnAddTaskButton,
        clickEventOnEditButton,
        getActiveProjectDiv,
        doesElementExistInDOM,
        createAndAppendAddTaskButtonToContentDiv,
        setDefaultProjectDiv,
        determineClickedFilter,
        clickEventOnTaskImportantCheckBox,
        clickEventOnEditAddTaskButton,
        clickEventOnEditCancelChangeButton,
        clickEventOnDeleteTaskButton
    }
}