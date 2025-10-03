import { wrapperFunctions } from "./wrapperFunctions";
import Sortable from 'sortablejs';

export const setEventListeners = function () {
    const wrapFunctions = wrapperFunctions();

    function setEventOnAddProjectButton() {
        const addProjectButton = document.querySelector(".addProjectButton");

        addProjectButton.addEventListener("click", function (event) {
            wrapFunctions.clickEventOnAddProjectButton();
            setEventsOnProjectFormButtons();
        })
    };
    function setEventsOnProjectFormButtons() {
        const cancelButton = document.querySelector(".cancelButton");
        const addButton = document.querySelector(".addButton");

        addButton.addEventListener("click", function (event) {
            wrapFunctions.clickEventOnAddProjectFormButton(event);
            if(!document.querySelector(".addTaskButton")){
                wrapFunctions.createAndAppendAddTaskButtonToContentDiv();
                setEventOnAddTaskButton();
            };
        });
        cancelButton.addEventListener("click", function (event) {
            wrapFunctions.clickEventOnCancelProjectFormButton(event);
        });
    }
    function makeProjectsListItemsDraggalble(){
        const projectsList = document.querySelector(".projectsList");
        if(projectsList){
            new Sortable(projectsList,{
                draggable:".project",
                onUpdate:function(event){
                    wrapFunctions.adjustProjectList(); 
                }
            })
        }
    }
    function makeTasksListItemsDraggable(){
    const tasksList = document.querySelector(".tasksList");
        if(tasksList){
            new Sortable(tasksList,{
                draggable:".liItem",
                onUpdate:function(event){
                    wrapFunctions.adjustTaskList(); 
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
                wrapFunctions.clickEventOnProjectRenameButton(targetProjectDiv);
                setEventOnProjectRenameForm(targetProjectDiv);
                }else if(event.target.classList.contains("deleteButton")){
                    wrapFunctions.clickEventOnDeleteProjectButton(targetProjectDiv);
                }else if(event.target.classList.contains('optionsSpan')){
                    console.log("optionsSpan clicked");
                    wrapFunctions.clickEventOnProjectOptionIcon(targetProjectDiv);
                }else {
                wrapFunctions.clickEventOnProjectDiv(targetProjectDiv);
                
                }
            } 
        });

    }
    function setEventOnProjectRenameForm(projectDiv){
        const projectForm = document.querySelector(".projectForm");
        projectForm.addEventListener("click",function(event){
            if(event.target.classList.contains('addButton')){
                 event.preventDefault();
                wrapFunctions.clickEventOnProjectRenameAddButton(projectDiv);
            }else if(event.target.classList.contains('cancelButton')){
                event.preventDefault();
                wrapFunctions.clickEventOnProjectRenameCancelButton(projectDiv);
            }
        })
    }
    function setEventOnAddTaskButton(){
        const addTaskButton = document.querySelector(".addTaskButton");
        addTaskButton.addEventListener("click",function(){
            if(!document.querySelector(".taskForm")){
                wrapFunctions.clickEventOnAddTaskButton();
                setEventsOnTaskFormButtons();
            }
            
        })
    };
    function setEventsOnTaskFormButtons(){
        const taskFormCancelButton = document.querySelector(".TaskFormCancelButton");
        const taskFormAddButton = document.querySelector(".TaskFormAddButton");

        taskFormAddButton.addEventListener("click",function(event){
            wrapFunctions.clickEventOnTaskFormAddButton(event);
        })
         taskFormCancelButton.addEventListener("click",function(event){
            wrapFunctions.clickEventOnTaskFormCancelButton(event);
        }) 
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
                    wrapFunctions.clickEventOnEditButton(taskDiv);
                    setEventOnEditForm(taskDiv);
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
    function setEventOnEditForm(taskDiv){
        const editform = document.querySelector(".editform")
        editform.addEventListener("click",function(event){
            if (event.target.classList.contains('isTaskImportantInput')) {
                event.stopPropagation(); 
                return;
            }
            else if(event.target.classList.contains('TaskFormAddButton')){
                event.preventDefault();
                wrapFunctions.clickEventOnEditAddTaskButton(taskDiv);

            }else if(event.target.classList.contains('TaskFormCancelButton')){
                event.preventDefault();
                wrapFunctions.clickEventOnEditCancelChangeButton(taskDiv);
            }
        })
        editform.addEventListener("change",function(event){
            if (event.target.classList.contains('isTaskImportantInput')) {
                event.stopPropagation(); 
                return; 
            }
        })
    }
    function setEventOnFiltersList(){
        const filtersList = document.querySelector(".filtersList");
        filtersList.addEventListener("click",function(event){
            if(event.target.closest("div")){
                wrapFunctions.clickEventOnFilter(event.target.className);
            }
        })
 
    }
    function entryPointEventListener(){
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


