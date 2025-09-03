import "./styles.css";
import { ProjectList } from "./project";
import { Project } from "./project";
import { handleProjects } from "./project";
import { handleTasks } from "./task";

const projects = handleProjects();
const tasks = handleTasks();

(function addEventListeners(){
    const addProjectButton = document.querySelector(".addProjectButton");
     (function addEventListenerToAddProjectButton(){
            addProjectButton.addEventListener("click",function(event){
            if(!document.querySelector(".projectForm")){
            projects.addProjectFormToDOM(projects.createProjectForm());
            addEventListenersForAddAndCancelFormButtons();
            }
        })
    }());
    function addEventListenersForAddAndCancelFormButtons(){
        const projectForm = document.querySelector(".projectForm");
        const cancelButton = document.querySelector(".cancelButton");
        const addButton = document.querySelector(".addButton");
            
        addButton.addEventListener("click",function(event){
            event.preventDefault();
            const newProject = projects.createNewProject(projects.getInputValue());
            projects.addToProjectsList(newProject);
            const newProjectDiv = projects.createProjectDiv(newProject.name,newProject.id);
            projects.appendProjectDivToDOM(newProjectDiv);
            addEventListenerToProjectDiv(newProjectDiv);
            projectForm.remove(); 
        })
        cancelButton.addEventListener("click",function(event){
            event.preventDefault();
            projectForm.remove();
        })
    }
    function addEventListenerToProjectDiv(div){
        div.addEventListener("click",function(){
            const title = document.querySelector(".contentTitleContainer h2");
            title.textContent = div.textContent;
            title.id = div.id;
            tasks.renderAddTaskButton();
            addEventListenerOnTaskButton();
        })
    }
    function addEventListenerOnTaskButton(){
        const addTaskButton = document.querySelector(".addTaskButton");
        addTaskButton.addEventListener("click",function(){
            tasks.renderTaskForm();
        })
    }

}());
