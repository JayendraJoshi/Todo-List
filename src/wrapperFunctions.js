import "./styles.css";
import { ProjectList, handleProjects, Project } from "./project";
import { handleTasks } from "./task";


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
        if(!doesElementExistInDOM((".taskForm"))){
            console.log("in loop");
                        taskFunctions.createAndAppendTaskFormOnContentDiv();
            console.log("taskForm created");
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
    function determineClickedFilter(className){
        switch(className){
            case 'allTasks':
                clickEventOnAllTasksDiv();
                setContentContainerTitle(className);
        }
    }
    function clickEventOnAllTasksDiv(){
        resetContentOfTasksList();
        appendTasksToTasksList(getAllTasks());
    }
    return{
        clickEventOnAddProjectButton,
        clickEventOnAddProjectFormButton,
        clickEventOnCancelProjectFormButton,
        clickEventOnTaskFormAddButton,
        clickEventOnTaskFormCancelButton,
        clickEventOnProjectDiv,
        clickEventOnAddTaskButton,
        getActiveProjectDiv,
        doesElementExistInDOM,
        createAndAppendAddTaskButtonToContentDiv,
        setDefaultProjectDiv,
        determineClickedFilter
    }
}