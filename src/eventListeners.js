import { wrapperFunctions } from "./wrapperFunctions";
import Sortable from 'sortablejs';

export const setEventListeners = function () {
    const wrapFunctions = wrapperFunctions()

    // filter events
    function setEventOnFiltersList(){
        const filtersList = document.querySelector(".filtersList");
        filtersList.addEventListener("click",function(event){
            if(event.target.closest("div")){
                wrapFunctions.clickEventOnFilter(event.target);
            }
        })
    }
    // project events
    function setEventOnAddProjectButton() {
        const addProjectButton = document.querySelector(".addProjectButton");
        addProjectButton.addEventListener("click", function (event) {
            wrapFunctions.closeOpenTaskForm();
            wrapFunctions.closeOpenProjectForm();
            wrapFunctions.clickEventOnAddProjectButton();
            setEventOnProjectForm();
        })
    }
    function setEventOnProjectForm(projectDiv){
        const projectForm = document.querySelector(".projectForm");
        if(projectDiv){
            projectForm.addEventListener("click",function(event){
                if(event.target.classList.contains('projectFormAddButton')){
                    event.preventDefault();
                    wrapFunctions.clickEventOnProjectEditFormAddButton(projectDiv);
                }else if(event.target.classList.contains('projectFormCancelButton')){
                    event.preventDefault();
                    wrapFunctions.closeOpenProjectForm();
                }
            })
        }else{
            projectForm.addEventListener("click",function(event){
                if(event.target.classList.contains('projectFormAddButton')){
                    wrapFunctions.clickEventOnAddProjectFormButton(event);
                    if(!document.querySelector(".addTaskButton")){
                        event.preventDefault();
                        wrapFunctions.createAndAppendAddTaskButtonToContentDiv();
                        setEventOnAddTaskButton();
                    };
                }else if(event.target.classList.contains('projectFormCancelButton')){
                    event.preventDefault();
                    wrapFunctions.closeOpenProjectForm();         
                }
            })
        }
    }
    function setEventOnProjectElements(){
    const projectsList = document.querySelector(".projectsList");
        projectsList.addEventListener("click", function(event){
            if (event.target.closest(".projectForm")) {
            return;
            }
            const targetProjectDiv = event.target.closest('.project');
            if (targetProjectDiv) {
                if (event.target.classList.contains("renameButton")) {
                wrapFunctions.closeOpenTaskForm();
                wrapFunctions.closeOpenProjectForm();
                wrapFunctions.clickEventOnProjectButtonToRename(targetProjectDiv);
                setEventOnProjectForm(targetProjectDiv);
                }else if(event.target.classList.contains("deleteButton")){
                    wrapFunctions.clickEventOnDeleteProjectButton(targetProjectDiv);
                }else if(event.target.classList.contains('optionsSpan')){
                    console.log("optionsSpan clicked");
                    wrapFunctions.clickEventOnProjectOptionIcon(targetProjectDiv);
                }else {
                    wrapFunctions.clickEventOnProjectDiv(targetProjectDiv)    
                }
            }
        });
    }  
    function makeProjectsListItemsDraggalble(){
        const projectsList = document.querySelector(".projectsList");
        if(projectsList){
            new Sortable(projectsList,{
                draggable:".project",
                 handle:".dragSpan",
                onUpdate:function(event){
                    wrapFunctions.adjustProjectList(); 
                }
            })
        }
    }
    // task events
    function setEventOnAddTaskButton(){
        const addTaskButton = document.querySelector(".addTaskButton");
        if(addTaskButton){
            addTaskButton.addEventListener("click",function(){
            wrapFunctions.closeOpenProjectForm();
            wrapFunctions.closeOpenTaskForm();
            wrapFunctions.clickEventOnAddTaskButton();
            setEventOnTaskForm();           
        })
    }
        }
        
    function setEventOnTaskForm(taskDiv){
        const taskForm = document.querySelector(".taskForm")
        if(taskDiv){
            taskForm.addEventListener("click",function(event){
                if (event.target.classList.contains('isTaskImportantInput')) {
                    event.stopPropagation(); 
                    return;
                }
                else if(event.target.classList.contains('taskFormCancelButton')){
                    event.preventDefault();
                    wrapFunctions.closeOpenTaskForm();
                }
            })
            taskForm.addEventListener("submit",function(event){
                wrapFunctions.clickEventOnEditAddTaskButton(taskDiv);
                event.preventDefault();
            })
            taskForm.addEventListener("change",function(event){
                if (event.target.classList.contains('isTaskImportantInput')) {
                    event.stopPropagation(); 
                    return; 
                }
            })
        }else{
            taskForm.addEventListener("click",function(event){
                if(event.target.classList.contains('taskFormCancelButton')){
                    wrapFunctions.closeOpenTaskForm();
                }
            })
            taskForm.addEventListener("submit",function(event){
                wrapFunctions.clickEventOnTaskFormAddButton(event);
                event.preventDefault();
            })
        }
    }
    function setEventOnTaskElements(){
        const tasksList = document.querySelector(".tasksList");
        tasksList.addEventListener("change",function(event){
            if(tasksList.childElementCount > 0 ){
                if(event.target.classList.contains('isTaskImportantInput')){
                    wrapFunctions.clickEventOnTaskImportantCheckBox(event);
                }
            }
        });
        tasksList.addEventListener("click",function(event){
            if(tasksList.childElementCount > 0 ){
                const taskDiv = event.target.closest(".task");
                if(event.target.classList.contains('editButton')){
                    wrapFunctions.closeOpenProjectForm();
                    wrapFunctions.closeOpenTaskForm();
                    wrapFunctions.clickEventOnEditButton(taskDiv);
                    setEventOnTaskForm(taskDiv);
                }else if(event.target.classList.contains('deleteButton')){
                    wrapFunctions.clickEventOnDeleteTaskButton(taskDiv);
                }
                else if(event.target.classList.contains('optionsSpan')){
                    console.log("optionsSpan clicked");
                    wrapFunctions.clickEventOnTaskOptionIcon(taskDiv);
                }
        }
        })
    }
    function makeTasksListItemsDraggable(){
    const tasksList = document.querySelector(".tasksList");
        if(tasksList){
            new Sortable(tasksList,{
                draggable:".liItem",
                handle:".dragSpan",
                onUpdate:function(event){
                    wrapFunctions.adjustTaskList(); 
                }
            })
        }
    }
    // project & task common events
    function setEventOnAllObjectButtonContainer(){
        document.addEventListener("click",function(event){
            const isClickedInsideOptionsContainer = event.target.closest(".optionsContainer");
            if(!isClickedInsideOptionsContainer){
                wrapFunctions.removeActiveClassFromOptionsButtonsContainer();
            }
        })
    }
    // menu icon event
    function setEventOnMenuSpan(){
        const menuSpan = document.querySelector(".menuSpan");
        menuSpan.addEventListener("click",function(){
            wrapFunctions.clickEventOnMenuSpan();
        })
    }
    // entry
    function entryPointEventListener(){
        setEventOnAllObjectButtonContainer();
        setEventOnMenuSpan();
        setEventOnAddProjectButton();
        wrapFunctions.startUpFunctions();
        setEventOnAddTaskButton();
        setEventOnFiltersList();
        setEventOnTaskElements();
        setEventOnProjectElements();
        makeProjectsListItemsDraggalble();
        makeTasksListItemsDraggable();
    }
    return{
        entryPointEventListener,
    }
}


