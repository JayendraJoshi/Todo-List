import "./styles.css";
import { ProjectList, handleProjects } from "./project";
import { Task, handleTasks } from "./task";

export const handleEventListeners = function () {
    const projectList = new ProjectList;
    const projectFunctions = handleProjects();
    const taskFunctions = handleTasks();

    function setEventOnProjectDiv(div) {
        div.addEventListener("click",function(){
            const targetProject = projectList.getProjectByID(div.id);
            const title = document.querySelector(".contentTitleContainer h2");
            title.textContent = targetProject.name;
            projectList.setActiveProject(div.id);
            taskFunctions.renderAddTaskButton();
            setEventOnAddTaskButton();
        })
    }
    function setEventOnAddTaskButton(){
        const addTaskButton = document.querySelector(".addTaskButton");
        addTaskButton.addEventListener("click",function(){
            if(!document.querySelector(".taskForm")){
                taskFunctions.renderTaskForm();
                setEventsOnTaskFormButtons();
            }
        })
    };
    function setEventsOnProjectFormButtons() {
        const cancelButton = document.querySelector(".cancelButton");
        const addButton = document.querySelector(".addButton");

        addButton.addEventListener("click", function (event) {
            event.preventDefault();
            const projectForm = document.querySelector(".projectForm");
            const newProject = projectFunctions.createNewProject(projectFunctions.getInputValue());
            projectFunctions.addToProjectsList(newProject);
            const newProjectDiv = projectFunctions.createProjectDiv(newProject.name, newProject.id);
            projectFunctions.appendProjectDivToDOM(newProjectDiv);
            projectForm.remove();
            setEventOnProjectDiv(newProjectDiv);
        });
        cancelButton.addEventListener("click", function (event) {
            event.preventDefault();
            const projectForm = document.querySelector(".projectForm");
            projectForm.remove();
        });
    }
    function setEventsOnTaskFormButtons(){
        const taskFormCancelButton = document.querySelector(".TaskFormCancelButton");
        const taskFormAddButton = document.querySelector(".TaskFormAddButton");

        taskFormAddButton.addEventListener("click",function(event){
            const taskForm = document.querySelector(".taskForm");
            event.preventDefault();
            const values = taskFunctions.getInputValues();
            const activeProject = projectList.getActiveProject();
            const task = new Task(values.taskTitle,values.taskDescription,values.taskDueDate,activeProject.id);
            activeProject.addTask(task);
            taskFunctions.renderTaskDiv(task);
            taskForm.remove();
        })
         taskFormCancelButton.addEventListener("click",function(event){
            const taskForm = document.querySelector(".taskForm");
            event.preventDefault();
            taskForm.remove();
        }) 
    }
    function setEventOnAddProjectButton() {
        const addProjectButton = document.querySelector(".addProjectButton");
        addProjectButton.addEventListener("click", function (event) {
            if (!document.querySelector(".projectForm")) {
                projectFunctions.addProjectFormToDOM(projectFunctions.createProjectForm());
                setEventsOnProjectFormButtons();
            }
        })
    };
    function entryPointEventListener(){
        setEventOnAddProjectButton();
    }
    return{
        entryPointEventListener,
    }
};
