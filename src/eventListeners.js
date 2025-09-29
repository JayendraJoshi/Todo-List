import { wrapperFunctions } from "./wrapperFunctions";

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
   function setEventOnProjectElements(){
    const projectsList = document.querySelector(".projectsList");

    projectsList.addEventListener("click", function(event){
        const target = event.target;

        if (target.closest(".projectForm")) {
            return;
        }
        const targetProjectDiv = target.closest(".project");
        if (!targetProjectDiv) {
            return;
        }
        if (target.classList.contains("renameButton")) {
            wrapFunctions.clickEventOnProjectRenameButton(targetProjectDiv);
            setEventOnProjectRenameForm(targetProjectDiv);
        }else if(target.classList.contains("deleteButton")){
            wrapFunctions.clickEventOnDeleteProjectButton(targetProjectDiv);
        }else {
            wrapFunctions.clickEventOnProjectDiv(targetProjectDiv);
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
    }
    return{
        entryPointEventListener,
    }
};

