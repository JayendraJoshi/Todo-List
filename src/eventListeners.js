import { wrapperFunctions } from "./wrapperFunctions";

export const setEventListeners = function () {
    const wrapFunctions = wrapperFunctions();

    function setEventOnProjectDivs(){
        const projectsList = document.querySelector(".projectsList");
        projectsList.addEventListener("click",function(event){
            if(event.target.closest("div")){
                wrapFunctions.clickEventOnProjectDiv(event);
            }
        })
    }
    function setEventOnAddTaskButton(){
        const addTaskButton = document.querySelector(".addTaskButton");
        addTaskButton.addEventListener("click",function(){
            if(!wrapFunctions.doesElementExistInDOM(".taskForm")){
                wrapFunctions.clickEventOnAddTaskButton();
                setEventsOnTaskFormButtons();
            }
            
        })
    };
    
    function setEventsOnProjectFormButtons() {
        const cancelButton = document.querySelector(".cancelButton");
        const addButton = document.querySelector(".addButton");

        addButton.addEventListener("click", function (event) {
            wrapFunctions.clickEventOnAddProjectFormButton(event);
            if(!wrapFunctions.doesElementExistInDOM(".addTaskButton")){
                wrapFunctions.createAndAppendAddTaskButtonToContentDiv();
                setEventOnAddTaskButton();
            };
        });
        cancelButton.addEventListener("click", function (event) {
            wrapFunctions.clickEventOnCancelProjectFormButton(event);
        });
    }
    
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
                if(event.target.classList.contains('importantInput')){
                    wrapFunctions.clickEventOnTaskImportantCheckBox(event);
                }
            }
        });
        tasksList.addEventListener("click",function(event){
            if(tasksList.childElementCount > 0 ){
                const taskDiv = event.target.closest(".task");
                if(event.target.classList.contains('editButton')){
                    wrapFunctions.clickEventOnEditButton(taskDiv);
                    setEventOnEditFormElements(taskDiv);
                }else if(event.target.classList.contains('deleteButton')){
                    wrapFunctions.clickEventOnDeleteTaskButton(taskDiv);
                }
            }
        })
        
    }

       
    function setEventOnEditFormElements(taskDiv){
        const editform = document.querySelector(".editform")
        editform.addEventListener("click",function(event){
            event.preventDefault();
            if(event.target.classList.contains('TaskFormAddButton')){
                wrapFunctions.clickEventOnEditAddTaskButton(taskDiv);
            }else if(event.target.classList.contains('TaskFormCancelButton')){
                wrapFunctions.clickEventOnEditCancelChangeButton(taskDiv);
            }        
        })
    }
    function setEventOnAddProjectButton() {
        const addProjectButton = document.querySelector(".addProjectButton");

        addProjectButton.addEventListener("click", function (event) {
            wrapFunctions.clickEventOnAddProjectButton();
            setEventsOnProjectFormButtons();
        })
    };
    
    function setEventOnFiltersList(){
        const filtersList = document.querySelector(".filtersList");
        filtersList.addEventListener("click",function(event){
            if(event.target.closest("div")){
                wrapFunctions.determineClickedFilter(event.target.className);
            }
        })
 
    }
    function entryPointEventListener(){
        setEventOnAddProjectButton();
        wrapFunctions.setDefaultProjectDiv();
        setEventOnProjectDivs();
        wrapFunctions.createAndAppendAddTaskButtonToContentDiv();
        setEventOnAddTaskButton();
        setEventOnFiltersList();
        setEventOnTaskElements();
    }
    return{
        entryPointEventListener,
    }
};
